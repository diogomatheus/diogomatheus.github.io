---
image: "assets/images/posts/shared-image/2011-05-16-mapping-zend-framework-models-relationships.jpg"
i18n: "Mapping Zend Framework models relationships"
title: "Mapeando relacionamentos de modelos do Zend Framework"
slug: "mapeando-relacionamentos-de-modelos-do-zend-framework"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/mapeando-relacionamentos-os-modelos/"
---
Continuando o tópico Entendendo modelos no zend framework, que fizemos uma introdução sobre o uso de modelos, vamos falar agora sobre o mapeamento de relacionamentos das tabelas do banco de dados nos modelos baseados na classe Zend_Db_Table.

## Banco de dados relacional

Um banco de dados relacional é um conjunto de tabelas relacionadas entre si gerenciadas por um SGBD (Sistema Gerenciador de Banco de Dados), que utiliza, por padrão, a linguagem SQL (Structured Query Language – linguagem de Consulta estruturada). Além de possibilitar a criação de tabelas, em um banco de dados relacional é possível criar relacionamentos entre as tabelas, o que garante a integridade dos dados que essas irão receber.

## Tipos de relacionamentos de um banco de dados relacional

- **1 para 1** – Este tipo de relacionamento se dá, de forma direta entre duas tabelas, quando a chave primária do registro de uma determinada tabela pode ser utilizada uma única vez em um dos registros da outra tabela.
- **1 para N** – Também acontece de forma direta entre duas tabelas sempre que a chave primária do registro de uma determinada tabela é utilizada várias vezes em outra tabela, sendo este, o tipo de relacionamento mais comum entre tabelas de um banco de dados relacional.
- **N para N** – Esse tipo de relacionamento que acontece de forma indireta entre duas tabelas, pois para que ele possa ser concebido é necessário a geração de uma terceira tabela. Na prática o relacionamento vários para vários não existe de fato, o que existe são dois ou mais relacionamentos um para vários, que ganha o sentido de vários para vários. Ocorre sempre que surge a necessidade de se relacionar duas chaves primárias de registros de diferentes tabelas em vários registros de uma terceira tabela.

## Mapeamento usando Zend_Db_Table

Para que os relacionamentos funcionem nos modelos baseados na classe Zend_Db_Table, basta informar quais modelos são dependentes e quais os modelos são referênciados, ou seja, indicamos quais modelos dependem do modelo que está sendo mapeado e quais modelos são necessários para ele.

## Tipos de mapeamentos usando Zend_Db_Table

- **$_dependentTables** – Responsável por mapear os modelos dependentes, sendo necessário informar o nome de cada modelo dependente.
- **$_referenceMap** – Responsável pelo mapeamento dos modelos referênciados, nele informamos as colunas equivalentes e o nome do modelo necessário.

Confira mais sobre mapeamento na documentação sobre relacionamentos com Zend_Db_Table.

## Projeto usando relacionamento nos modelos

Agora que vimos um pouco sobre banco de dados relacional e mapeamento usando Zend_Db_Table, vamos criar um projeto para trabalhar com relacionamentos, baseado na estrutura apresentada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, crie um projeto com nome de example-relationship.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-16-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

No exemplo que será visto agora, iremos colocar em prática os dois tipos de mapeamento para que o relacionamento entre as tabelas aconteça, confira o diagrama do nosso banco de dados:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-16-mer.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Modelo de entidade relacionamento</figcaption>
</figure>

Detalhando o diagrama:

- Usuário cadastra vários produtos / Produto é cadastrado por um usuário
- Usuário faz vários pedidos / Pedido é realizado por um usuário
- Pedido possui vários itens / Item pertence a um pedido
- Item tem um produto / Produto pode estar em vários itens

Obs: Na prática um relacionamento N para N não existe, no diagrama acima representamos o relacionamento N para N usando dois relacionamentos 1 para N, o relacionamento Order – Product é um relacionamento N para N, um produto pode estar em vários pedidos e um pedido pode ter vários produtos, para isso criamos a tabela order_item, que fica responsável por esse relacionamento, armazenando as chaves primárias das tabelas Order e Product, como vimos no diagrama, esse tipo de tabela também pode ter colunas extras, no caso adicionamos uma coluna para guardar a quantidade de cada item do pedido.

[Visualize ou efetue o download do script sql](https://gist.github.com/diogomatheus/967767), no script além dos comandos de criação das tabelas, contém comandos para inserir valores nas tabelas para que o exemplo no final do artigo funcione corretamente.

Acesse o phpmyadmin, crie o banco “zf-order” e execute o script sql acima para criar e preencher as tabelas do banco. Após criar o banco edite o arquivo application.ini com as informações do banco de dados, caso tenha dúvida, visualize o artigo Entendendo modelos no zend framework.

## Mapeando os relacionamentos

Agora que conheçemos os tipos de relacionamentos, tipos de mapeamentos e o banco de dados que iremos trabalhar, vamos mapear os relacionamentos das tabelas nos modelos, para isso crie os arquivos das abas abaixo na pasta “application/models”.

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
    <p>No modelo User mapeamos os modelos Product e Order como dependentes, já que o usuário cadastra produto e faz pedido, logo usuário é referênciado pelos modelos Product e Order que são dependentes do modelo User.</p>

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
    <p>No modelo Product além de mapear o modelo OrderItem(que representa a tabela de junção do relacionamento N para N), como dependente, informamos que o modelo Product faz referência ao modelo User, perceba que nesse tipo de mapeamento precisamos informar o nome do modelo(refTableClass), coluna de referência(refColumns) e a coluna do modelo produto que corresponde a coluna de referência(columns).</p>

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
    <p>No modelo Order é feito um mapeamento semelhante ao do produto, informando que o modelo OrderItem é dependente e o modelo User é referênciado para saber quem realizou o pedido.</p>

{% highlight php %}
<?php
class Order extends Zend_Db_Table_Abstract {
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
    <p>Para finalizar no modelo OrderItem, mapeamos a referência aos modelos Order e Produto, que são os dois modelos que fazem o relacionamento N para N.</p>

{% highlight php %}
<?php
class OrderItem extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'order_item';

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
}
?>
{% endhighlight %}

  </div>
</div>

## Trabalhando com os relacionamentos

Com os nossos modelos criados e devidamente mapeados, vamos explorar alguns métodos que utilizam os relacionamentos e facilita o resgate dos registros, para isso vamos utilizar o IndexController.php e sua view, index.phtml.

IndexController.php

{% highlight php %}
<?php
class IndexController extends Zend_Controller_Action {
  public function indexAction() {
    // modelos
    $user = new User();
    $product = new Product();
    $order = new Order();

    // lista de usuários
    $users = $user->fetchAll();
    $this->view->assign('users', $users);

    // lista de produtos
    $products = $product->fetchAll();
    $this->view->assign('products', $products);

    // resgatando o usuário "Diogo Matheus"
    $diogo = $user->find(1)->current();
    // quais produtos foram cadastrados por ele?
    $diogo_products = $diogo->findDependentRowset('Product');
    $this->view->assign('diogo_products', $diogo_products);

    // resgatando o produto "Casaco"
    $casaco = $product->find(4)->current();
    // quem cadastrou esse produto?
    $casaco_user = $casaco->findParentRow('User');
    $this->view->assign('casaco_user', $casaco_user);

    // resgata um pedido, usuário que realizou e produtos que comprou
    $pedido = $order->find(1)->current();
    $pedido_user = $pedido->findParentRow('User');
    $pedido_produtos = $pedido->findManyToManyRowset('Product', 'OrderItem');
    $this->view->assign('pedido', $pedido);
    $this->view->assign('pedido_user', $pedido_user);
    $this->view->assign('pedido_produtos', $pedido_produtos);
  }
}
?>
{% endhighlight %}

index.phtml

{% highlight php %}
<h3>Lista de usuários</h3>
<?php foreach($this->users as $user): ?>
<p><?php echo $user->name; ?></p>
<?php endforeach; ?>
 
<h3>Lista de produtos</h3>
<?php foreach($this->products as $product): ?>
<p><?php echo $product->name; ?></p>
<?php endforeach; ?>
 
<h3>Produtos adicionados por "Diogo Matheus"</h3>
<?php foreach($this->diogo_products as $product): ?>
<p><?php echo $product->name; ?></p>
<?php endforeach; ?>
 
<h3>Quem cadastrou o produto "Casaco"?</h3>
<p><?php echo $this->casaco_user->name; ?></p>
 
<h3>Detalhando um pedido</h3>
<p>Usuário: <?php echo $this->pedido_user->name; ?>, Data do pedido: <?php echo $this->pedido->create_date; ?></p>
<?php foreach($this->pedido_produtos as $produto): ?>
<p>Produto: <?php echo $produto->name; ?></p>
<?php endforeach; ?>
{% endhighlight %}

Estrutura final do nosso projeto:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-16-final-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Resultado

Ao executar nossa aplicação iremos obter o seguinte resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-16-example.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução</figcaption>
</figure>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-relationship).

E a quantidade de cada item do pedido? isso veremos em outro artigo, já que o método findManyToManyRowset() parou de retornar as colunas da tabela de junção, iremos estudar outras maneiras de realizar essa tarefa.