---
image: "assets/images/posts/shared-image/2011-06-06-sql-joins-with-zend-db-select.jpg"
i18n: "SQL joins with Zend_Db_Select"
title: "SQL joins com Zend_Db_Select"
slug: "sql-joins-com-zend-db-select"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/realizando-joins-no-zend-framework/"
---
Neste artigo iremos abordar o uso de joins com a classe Zend_Db_Select. Muitas consultas utilizam de joins para combinar tabelas e montar os resultados esperados, você pode adicionar tabelas ao seu select usando o método join() que é semelhante ao from(), exceto que ao usar o método join() você além de especificar a tabela e colunas de retorno, precisará especificar a condição de junção das tabelas. O método recebe dois parâmetros obrigatórios, o nome da tabela e a condição de junção, respectivamente, por último, caso seja necessário, as colunas de retorno.

{% highlight php %}
$select = $db->select()
             ->from($table1)
             ->join($table2, $condition, $columns);
{% endhighlight %}

## Tipos de join e seus respectivos métodos da classe Zend_Db_Select

Agora vamos dar uma olhada nos tipos de joins disponíveis, quais métodos correspondem aos tipos e uma descrição simples do que é feito, acho que não é necessário nesse momento exemplificar cada tipo, pois são parecidos, o que vale nesse momento é conhecer a funcionalidade de cada um, mas caso você queira ver exemplos, de uma olhada no post, Zend Framework SQL Joins Examples.

**Inner join** – join(table, condition, [columns]) ou joinInner(table, condition, [columns])

Este é o tipo mais comum de join, onde as linhas de cada tabela são comparadas através de uma condição de junção, retornando apenas as linhas que satisfazem essa condição.

**Left join** – joinLeft(table, condition, [columns])

Ao utilizar left join, todas as linhas da tabela esquerda estarão incluídas nos resultados, caso a tabela esquerda não tenha correspondente na tabela direita, as colunas da tabela direita serão retornadas como NULL.

**Right join** – joinRight(table, condition, [columns])

Semelhante ao left join, no right join, todas as linhas da tabela da direta estarão incluídas nos resultados e caso a tabela da direita não tenha correspondente na tabela esquerda, as colunas da tabela da esquerda serão retornadas como NULL.

**Full join** – joinFull(table, condition, [columns])

Este tipo de join é uma combinação entre o left join e right join, todas as linhas de ambas as tabelas estarão incluídas nos resultados, desde que preencham a condição de junção, caso não tenha correspondente as linhas serão complementadas como NULL.

**Cross join** – joinCross(table, [columns])

Neste tipo de join, o resultado é um produto cartesiano, cada linha da tabela da esquerda é correspondente a cada linha da tabela da direita, para este tipo de join não é necessário definir uma condição de junção. Você pode filtrar esse tipo de join utilizando o método where.

**Natural join** – joinNatural(table, [columns])

Este tipo de join, faz uma comparação natural entre as tabelas, ele compara todas colunas que tenham nomes iguais em ambas as tabelas.

## Métodos auxiliares da classe Zend_Db_Select

No último artigo, falamos sobre Consultas personalizadas com Zend_Db_Select e apresentamos alguns métodos da classe Zend_Db_Select, agora vamos conferir mais alguns métodos utilizados para criar nossas consultas.

**distinct** – Método utilizado para filtrar os resultados, selecionando apenas resultados distintos.

{% highlight php %}
$select = $db->select()
             ->distinct()
             ->from(array('p' => 'product'), 'name');
{% endhighlight %}

**group** – Método utilizado para organizar os resultados em grupos, sendo necessário informar o campo responsável pela organização.

{% highlight php %}
$select = $db->select()
             ->from('user')
             ->joinInner('product', 'user.user_id=product.user_id', array('product_per_user'=>'COUNT(*)'))
             ->group('user.user_id');
{% endhighlight %}

**having** – Método utilizado para filtrar os resultados através de uma comparação sobre grupos, semelhante ao método where, sendo que o método having é usado após a definição de um grupo.

{% highlight php %}
$select = $db->select()
             ->from('user')
             ->joinInner('product', 'user.user_id=product.user_id',
                         array('product_per_user'=>'COUNT(*)'))
             ->group('user.user_id')
             ->having('product_per_user >= ?', 5);
{% endhighlight %}

**limit** – Método utilizado para limitar o número de resultados de uma query, você também pode especificar quantas linhas pular antes de iniciar a contagem.

{% highlight php %}
$select = $db->select()
             ->from(array('p' => 'product'),
                    array('product_id', 'name'))
             ->limit(20, 10);
{% endhighlight %}

**limitPage** – Semelhante ao método limit que permite controlar os resultados, o método limitPage, facilita esse controle em casos de paginação, sendo necessário apenas informar a página e a quantidade de resultados exibidos por página.

{% highlight php %}
$select = $db->select()
             ->from(array('p' => 'product'),
                    array('product_id', 'name'))
             ->limitPage(2, 10);
{% endhighlight %}

**union** – Método utilizado para unir o resultado de duas querys, vale lembrar que não é permitido unir duas querys com campos de retorno diferente, caso tenha uma pequena diferença utilize alias para padronizar o retorno.

{% highlight php %}
$select = $db->select()
             ->union(array($sql1, $sql2))
             ->order("id");
{% endhighlight %}

**reset** – Método utilizado para limpar todas as configurações que já tenham sido realizadas até então, para começar a criação do zero.

{% highlight php %}
// Limpa apenas a ordenação do select
$select->reset( Zend_Db_Select::ORDER );
 
// Limpa o comando select por inteiro
$select->reset();
{% endhighlight %}

## Usando setIntegrityCheck(false) para retornar dados da tabela match

O método setIntegrityCheck(false) é utilizado para colocar a tabela match em modo de leitura, possibilitando retornar campos dessa tabela, ou seja, ao usar o método setIntegrityCheck podemos retornar colunas da tabela match, na documentação atual não adicionaram nada sobre o método, que é muito útil na hora de criar nossas consultas usando join.

## Projeto usando joins

Agora que vimos um pouco sobre join usando a classe Zend_Db_Select, vamos criar um projeto para trabalhar com join, baseado na estrutura apresentada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, crie um projeto com nome de example-join.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-06-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

No exemplo que será visto agora, iremos utilizar o banco apresentado no artigo Mapeando relacionamentos nos modelos, para criar nossos métodos usando join, confira o diagrama do nosso banco de dados:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-06-mer.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Modelo de entidade relacionamento</figcaption>
</figure>

[Visualize ou efetue o download do script sql](https://gist.github.com/967767), no script além dos comandos de criação das tabelas, contém comandos para inserir valores nas tabelas para que o exemplo no final do artigo funcione corretamente.

Acesse o phpmyadmin, crie o banco “zf-order” e execute o script sql acima para criar e preencher as tabelas do banco. Após criar o banco edite o arquivo application.ini com as informações do banco de dados, caso tenha dúvida, visualize o artigo Entendendo modelos no zend framework.

## Criando modelos e métodos usando Join

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
    <p>No modelo User, além de realizar as configurações básicas, criamos um método, findByQtdProduct($quantity), para selecionar usuários que tenham cadastrado um número igual ou acima da quantidade que é passada como parâmetro para o método, que realiza um Inner join entre as tabelas user e product e conta o numero de produtos cadastrados por cada usuário e filtra os resultados comparando com a quantidade.</p>

  {% highlight php %}
<?php
class User extends Zend_Db_Table_Abstract
{
    /**
    * The default table name
    */
    protected $_name = 'user';
 
    /**
    * Dependent tables
    */
    protected $_dependentTables = array('Product', 'Order');
 
    /**
    * findByQtdProduct
    *
    * @param <int> $quantity
    */
    public function findByQtdProduct($quantity)
    {
        $select = $this->select()
                       ->setIntegrityCheck(false)
                       ->from('user')
                       ->joinInner('product', 'user.user_id = product.user_id',
                                   array('product_per_user'=>'COUNT(*)'))
                       ->group('user.user_id')
                       ->having('product_per_user >= ?', $quantity);
 
        return $this->fetchAll($select);
    }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="product-code-tabpanel" role="tabpanel" aria-labelledby="product-code-tab">
    <p>No modelo Product, realizamos a configuração e o mapeamento do modelo.</p>

  {% highlight php %}
<?php
class Product extends Zend_Db_Table_Abstract
{
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
    protected $_referenceMap = array
    (
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
    <p>No modelo Order, realizamos a configuração e o mapeamento do modelo.</p>

  {% highlight php %}
<?php
class Order extends Zend_Db_Table_Abstract
{
    /**
    * The default table name
    */
    protected $_name = 'order';
 
    /**
    * Dependent tables
    */
    protected $_dependentTables = array('OrderItem');
 
    /**
    * Reference map
    */
    protected $_referenceMap = array
    (
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
    <p>No modelo OrderItem, além de realizar as configurações básicas, criamos um método, findByOrder($order), para selecionar os produtos/itens que estão relacionados a um determinado pedido, o método recebe como parâmetro o id do pedido e realiza Inner join nas tabelas order, order_item e product, retornando todos os itens do pedido com suas quantidades.</p>

  {% highlight php %}
<?php
class OrderItem extends Zend_Db_Table_Abstract
{
    /**
    * The default table name
    */
    protected $_name = 'order_item';
 
    /**
    * Reference map
    */
    protected $_referenceMap = array
    (
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
    *
    * @param <int> $order
    */
    public function findByOrder($order)
    {
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

## Trabalhando com joins

Com os nossos modelos criados e nossos métodos com select usando join prontos, vamos trabalhar com esses métodos, para isso vamos utilizar o IndexController.php e sua view, index.phtml.

IndexController.php

{% highlight php %}
<?php
class IndexController extends Zend_Controller_Action
{
    public function indexAction()
    {
        // modelos
        $user = new User();
        $order = new Order();
        $orderItem = new OrderItem();
 
        // resgata usuários que tenham cadastrado 2 ou mais produtos
        $usersByQtdProduct = $user->findByQtdProduct(2);
        $this->view->assign('usersByQtdProduct', $usersByQtdProduct);
 
        // resgata um pedido, usuário que realizou e produtos com a quantidade
        $pedido = $order->find(1)->current();
        $pedido_user = $pedido->findParentRow('User');
        $pedido_itens = $orderItem->findByOrder($pedido->order_id);
        $this->view->assign('pedido', $pedido);
        $this->view->assign('pedido_user', $pedido_user);
        $this->view->assign('pedido_itens', $pedido_itens);
    }
}
?>
{% endhighlight %}

index.phtml

{% highlight php %}
<h3>Usuários que cadastraram 2 ou mais produtos</h3>
<?php foreach($this->usersByQtdProduct as $user): ?>
<p><?php echo $user->name; ?> cadastrou <?php echo $user->product_per_user; ?> produtos</p>
<?php endforeach; ?>
 
<h3>Detalhando um pedido com quantidade de itens</h3>
<p>Usuário: <?php echo $this->pedido_user->name; ?>, Data do pedido: <?php echo $this->pedido->create_date; ?></p>
<?php foreach($this->pedido_itens as $item): ?>
<p>Produto: <?php echo $item->name; ?> - Quantidade: <?php echo $item->amount; ?></p>
<?php endforeach; ?>
{% endhighlight %}

Estrutura final do nosso projeto:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-06-final-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Resultado

Ao executar nossa aplicação iremos obter o seguinte resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-06-06-example.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução</figcaption>
</figure>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-join).