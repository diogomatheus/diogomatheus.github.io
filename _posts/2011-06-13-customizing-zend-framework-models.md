---
image: "assets/images/posts/shared-image/2011-06-13-customizing-zend-framework-models.jpg"
i18n: "Customizing Zend Framework models"
title: "Customizando os modelos do Zend Framework"
slug: "customizando-os-modelos-do-zend-framework"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/customizando-modelos-no-zend-framework/"
---
Neste artigo iremos aprender a customizar nossos modelos, o zend framework oferece uma hierarquia de classes para abstrair cada nível do banco de dados, desde uma tabela até um resgistro dessa tabela, dando flexibilidade aos modelos.

## Camadas de abstração para banco de dados no zend framework

Confira abaixo as classes que o zend framework oferece para abstrair o banco de dados.

- **Zend_Db_Table** – Está classe representa uma tabela do nosso banco de dados e oferece métodos para funcionalidades básicas de manipulação, inserir, editar, remover registros, etc.
- **Zend_Db_Table_Row** – Quando trabalhamos com modelos no zend framework, cada registro de uma tabela é representado por um objeto e a classe responsável por isso é a classe Zend_Db_Table_Row.
- **Zend_Db_Table_Rowset** – Está classe representa um conjunto de registros, ou seja, um conjunto de objetos do tipo Zend_Db_Table_Row.

Então para mastigar de vez, a classe Zend_Db_Table representa uma tabela, Zend_Db_Table_Row representa um registro da tabela e Zend_Db_Table_Rowset representa um conjunto de registros de uma tabela.

## Resgatando um objeto do tipo Zend_Db_Table_Row

A classe Zend_Db_Table oferece o método fetchRow(), que retorna um objeto do tipo Zend_Db_Table_Row representando um registro da tabela. O zend framework permite a criação de classes customizadas para representar registros de determinadas tabelas, para isso, precisamos criar uma classe extendendo Zend_Db_Table_Row_Abstract e configurar o modelo informando qual classe representará os seus registros, veremos mais detalhes dessa configuração no final do artigo.

## Resgatando um objeto do tipo Zend_Db_Table_Rowset

A classe Zend_Db_Table oferece os métodos find() e fetchAll(), ambos os métodos retornam um objeto do tipo Zend_Db_Table_Rowset representando um conjunto de registros, o zend framework também permite a criação de classes customizadas para representar esses conjuntos, para isso, precisamos criar uma classe extendendo Zend_Db_Table_Rowset_Abstract e configurar o modelo informando qual classe representará os seus conjuntos de registros.

Vale lembrar que ao iterar um objeto do tipo Zend_Db_Table_Rowset, cada item da iteração será um objeto Zend_Db_Table_Row.

{% highlight php %}
// fetchAll retornando um objeto Zend_Db_Table_Rowset
$rowset = $db->fetchAll();
 
// realizamos um loop
foreach($rowset as $row){
    // cada item é um objeto Zend_Db_Table_Row
    echo $row->name;
}
{% endhighlight %}

Normalmente o método find() é utilizado para resgatar um registro pelo seu ID, mas o método aceita varios ID´s, motivo pelo qual retorna um objeto do tipo Zend_Db_Table_Rowset e não Zend_Db_Table_Row, para transformar o resultado obtido pelo método find() para um objeto Zend_Db_Table_Row, utilizamos o método [current()](http://php.net/manual/en/function.current.php), utilizado para retornar o item atual.

{% highlight php %}
// retorna um objeto do tipo Zend_Db_Table_Rowset
$rowset = $db->find(1);
// current() para acessar o item
$row = $rowset->current();
// imprimindo uma coluna
echo $row->name;
{% endhighlight %}

## Projeto usando modelos customizados

Agora que vimos um pouco sobre as classes responsáveis pela customização dos modelos, vamos criar um projeto para trabalhar, baseado na estrutura apresentada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, crie um projeto com nome de example-custom-models.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-13-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

No exemplo que será visto agora, iremos utilizar o banco apresentado no artigo Mapeando relacionamentos nos modelos, para criar nossos modelos customizados, confira o diagrama do nosso banco de dados:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-13-mer.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Modelo de entidade relacionamento</figcaption>
</figure>

[Visualize ou efetue o download do script sql](https://gist.github.com/diogomatheus/967767), no script além dos comandos de criação das tabelas, contém comandos para inserir valores nas tabelas para que o exemplo no final do artigo funcione corretamente.

Acesse o phpmyadmin, crie o banco “zf-order” e execute o script sql acima para criar e preencher as tabelas do banco. Após criar o banco edite o arquivo application.ini com as informações do banco de dados, caso tenha dúvida, visualize o artigo Entendendo modelos no zend framework.

## Criando modelos e seus métodos

Com o banco devidamente criado, crie os arquivos das abas abaixo na pasta “application/models”.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="user-code-tab" data-toggle="tab" data-target="#user-code-tabpanel" type="button" role="tab" aria-controls="user-code-tabpanel" aria-selected="true">User.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="product-code-tab" data-toggle="tab" data-target="#product-code-tabpanel" type="button" role="tab" aria-controls="product-code-tabpanel" aria-selected="false">Product.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="order-code-tab" data-toggle="tab" data-target="#order-code-tabpanel" type="button" role="tab" aria-controls="order-code-tabpanel" aria-selected="false">Order.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="order-item-code-tab" data-toggle="tab" data-target="#order-item-code-tabpanel" type="button" role="tab" aria-controls="order-item-code-tabpanel" aria-selected="false">OrderItem.php</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="user-code-tabpanel" role="tabpanel" aria-labelledby="user-code-tab">
    <p>No modelo User, realizamos a configuração e o mapeamento do modelo.</p>

{% highlight php %}
<?php
class User extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'user';

  /**
  * Dependent tables
  */
  protected $_dependentTables = array('Product', 'Order');
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="product-code-tabpanel" role="tabpanel" aria-labelledby="product-code-tab">
    <p>No modelo Product, realizamos a configuração e o mapeamento do modelo.</p>

{% highlight php %}
<?php
class Product extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'product';

  /**
  * Dependent tables
  */
  protected $_dependentTables = array('OrderItem');

  /**
  * Reference map
  */
  protected $_referenceMap = array(
    array(
      'refTableClass' => 'User',
      'refColumns' => 'user_id',
      'columns' => 'user_id',
    )
  );
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="order-code-tabpanel" role="tabpanel" aria-labelledby="order-code-tab">
    <p>No modelo Order, além de realizar a configuração e o mapeamento do modelo, informamos ao modelo Order qual será sua classe Row através do atributo $_rowClass, ou seja, informamos qual classe será responsável por representar um registro do modelo Order.</p>

{% highlight php %}
<?php
class Order extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'order';

  /**
  * The default row class
  */
  protected $_rowClass = 'Row_Order';

  /**
  * Dependent tables
  */
  protected $_dependentTables = array('OrderItem');

  /**
  * Reference map
  */
  protected $_referenceMap = array(
    array(
      'refTableClass' => 'User',
      'refColumns' => 'user_id',
      'columns' => 'user_id',
    )
  );
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="order-item-code-tabpanel" role="tabpanel" aria-labelledby="order-item-code-tab">
    <p>No modelo OrderItem, além de realizar a configuração e o mapeamento do modelo, nós informamos ao modelo OrderItem qual será sua classe Rowset através do atributo $_rowsetClass, ou seja, informamos qual classe será responsável por representar um conjunto de registros do modelo OrderItem, também criamos um método, findByOrder($order), que lista todos os produtos e quantidade de um determinado pedido, que será passado por parâmetro.</p>

{% highlight php %}
<?php
class OrderItem extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'order_item';

  /**
  * The default Rowset Class
  */
  protected $_rowsetClass = 'Rowset_OrderItem';

  /**
  * Reference map
  */
  protected $_referenceMap = array(
    array(
      'refTableClass' => 'Order',
      'refColumns' => 'order_id',
      'columns' => 'order_id',
    ),
    array(
      'refTableClass' => 'Product',
      'refColumns' => 'product_id',
      'columns' => 'product_id',
    )
  );

  /**
  * findByOrder
  * @param <int> $order
  */
  public function findByOrder($order) {
    $select = $this->select()
                    ->setIntegrityCheck(false)
                    ->from(array('o'=>'order'), array())
                    ->joinInner(array('i'=>'order_item'), 'o.order_id = i.order_id',
                                array('amount'))
                    ->joinInner(array('p'=>'product'), 'i.product_id = p.product_id')
                    ->where('o.order_id = ?', $order);

    return $this->fetchAll($select);
  }
}
?>
{% endhighlight %}

  </div>
</div>

## Criando as classes Order Row e OrderItem Rowset

Para manter nosso projeto organizado, crie duas pastas, Row e Rowset, dentro da pasta “application/models”, agora crie um arquivo chamado Order.php na pasta Row e outro arquivo chamado OrderItem.php na pasta Rowset, confira o conteúdo desses arquivos a seguir.

Row/Order.php

{% highlight php %}
<?php
class Row_Order extends Zend_Db_Table_Row_Abstract
{
    private $user = null;
    private $itens = null;
 
    /**
    * getUser
    *
    * @return <User Row> $user
    */
    public function getUser()
    {
        if(!$this->user)
        {
            $this->user = $this->findParentRow('User');
        }
 
        return $this->user;
    }
 
    /**
    * getItens
    *
    * @return <Itens Rowset> $itens
    */
    public function getItens()
    {
        if(!$this->itens)
        {
            // modelo OrderItem
            $orderItem = new OrderItem();
 
            // resgata itens com quantidade
            $this->itens = $orderItem->findByOrder($this->order_id);
        }
 
        return $this->itens;
    }
}
?>
{% endhighlight %}

Como vimos anteriormente, para criar uma classe Row personalizada, precisamos extender a classe Zend_Db_Table_Row_Abstract, a finalidade dessa classe row é dar flexibilidade ao manipular um registro do modelo Order, adicionamos dois métodos, getUser(), que retorna o registro do usuário que realizou o pedido e getItens(), que retorna os itens do pedido.

Rowset/OrderItem.php

{% highlight php %}
<?php
class Rowset_OrderItem extends Zend_Db_Table_Rowset_Abstract
{
    /**
    * getAsArray
    *
    * @return <array> $itens
    */
    public function getAsArray()
    {
        $itens = array();
        foreach($this as $item)
        {
            $itens[] = array('name'=>$item->name, 'amount'=>$item->amount);
        }
        return $itens;
    }
}
?>
{% endhighlight %}

Para criar uma classe Rowset personalizada precisamos extender a classe Zend_Db_Table_Rowset_Abstract, a finalidade dessa classe rowset é manipular um conjunto de registros do modelo OrderItem, nesse caso criamos o método getAsArray(), que personaliza os resultados em um array, adicionando apenas as colunas name e amount.

Estrutura da pasta models, após a criação das classes Row e Rowset:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-13-models-directory.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do diretório models</figcaption>
</figure>

## Trabalhando com os modelos customizados

Com os nossos modelos criados, nosso Row e Rowset configurado, vamos trabalhar com os modelos customizados, para isso vamos utilizar o IndexController.php e sua view, index.phtml.

IndexController.php

{% highlight php %}
<?php
class IndexController extends Zend_Controller_Action
{
    public function indexAction()
    {
        // modelo
        $order = new Order();
 
        // resgata um pedido
        $pedido = $order->find(1)->current();
        $this->view->assign('pedido', $pedido);
    }
}
?>
{% endhighlight %}

index.phtml

{% highlight php %}
<h3>Detalhes do pedido</h3>
<p><?php echo $this->pedido->getUser()->name; ?> - <?php echo $this->pedido->create_date; ?></p>
 
<h4>Imprimindo de um Rowset acessando a classe Row_Order</h4>
<?php foreach($this->pedido->getItens() as $item): ?>
<p>Produto: <?php echo $item->name; ?> - Quantidade: <?php echo $item->amount; ?></p>
<?php endforeach; ?>
 
<h4>Imprimindo de um Array acessando a classe Rowset_OrderItem</h4>
<?php foreach($this->pedido->getItens()->getAsArray() as $item): ?>
<p>Produto: <?php echo $item['name']; ?> - Quantidade: <?php echo $item['amount']; ?></p>
<?php endforeach; ?>
{% endhighlight %}

Estrutura final do nosso projeto:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-13-final-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Resultado

Ao executar nossa aplicação iremos obter o seguinte resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-13-example.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução</figcaption>
</figure>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-custom-models).