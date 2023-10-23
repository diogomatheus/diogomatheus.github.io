---
image: "assets/images/posts/shared-image/2011-05-30-sql-queries-with-zend-db-select.jpg"
i18n: "SQL queries with Zend_Db_Select"
title: "SQL queries com Zend_Db_Select"
slug: "sql-queries-com-zend-db-select"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/consultas-personalizadas-com-zend_db_select/"
---
Neste artigo iremos introduzir o uso da classe Zend_Db_Select, que é utilizada para abstrair a criação de select query. A classe oferece métodos adicionais que permitem compor o comando select por partes, deixando que a classe fique responsável por montar a query corretamente, após terminar a construção, basta trabalhar como se fosse uma string.

{% highlight php %}
echo $db->select()
        ->from('product');
 
// resultado: select 'product'.* from 'product'
{% endhighlight %}

## Vantagens de usar Zend_Db_Select

- Métodos orientados a objeto para construir consultas pedaço por pedaço
- Abstração do banco de dados independente de algumas partes da consulta
- Quoting automático, reduzindo o risco de ataques por SQL injection

## Criando uma instância da classe Zend_Db_Select

Para começar a construir seu comando select é preciso ter seu banco de dados configurado, confira abaixo algumas alternativas para criar uma instância da classe Zend_Db_Select.

{% highlight php %}
// criando objeto da classe Zend_Db_Select
$db = Zend_Db::factory( ...options... );
$select = $db->select();
 
// Instância direta da classe Zend_Db_Table
$db = Zend_Db::factory( ...options... );
$select = new Zend_Db_Select($db);
 
// Usando método estático da classe Zend_Db_Table
$db = Zend_Db_Table::getDefaultAdapter();
$select = $db->select();
 
// Zend_Db_Select na classe Zend_Db_Table
public function metodo() {
    $select = $this->select();
}
{% endhighlight %}

## Principais métodos da classe Zend_Db_Select

**select()** – Método utilizado para inicializar a construção do comando select.

**from([array] $table, array $columns)** – Método utilizado para informar a tabela no qual o select será realizado, passando o nome da tabela e caso seja necessário os campos de retorno, você pode usar alias(apelido, para renomear o campo) tanto para o nome da tabela quanto para os campos de retorno usando array(chave=>valor), onde a chave será o alias e o valor a tabela/campo.

{% highlight php %}
// resgata todos os produtos, retornando o campo name
$select = $db->select()
             ->from(array('p'=>'product'), array('name'));
{% endhighlight %}

**columns(array $columns, $table)** – Método utilizado para adicionar campos de retorno, caso você não queira especificar ou não tenha especificado seus campos de retorno no método from.

{% highlight php %}
// resgata todos os produtos, retornando os campos id, name e value
$select = $db->select()
             ->from(array('p'=>'product'), array('id'=>'product_id', 'name'));
$select->columns(array('value'), 'p');
{% endhighlight %}

**where($condition)** – Método utilizado para adicionar condições ao comando select, caso você use mais de uma vez na mesma query a classe irá adicionar os seguintes usando o operador AND.

{% highlight php %}
// resgata todos os produtos com valor maior que R$50,00
$select = $db->select()
             ->from('product')
             ->where('value > ?', 50.00);
{% endhighlight %}

**orWhere($condition)** – Parecido com o método where, mas nesse método o operador utilizado será OR.

{% highlight php %}
// resgata todos os produtos
// com valor menor que R$20,00 ou maior que R$50,00
$select = $db->select()
             ->from('product')
             ->where('value < ?', 20.00)
             ->orWhere('value > ?', 50,00);
{% endhighlight %}

**order($order)** – Método utilizado para especificar um tipo de ordenação para os resultados, onde deve ser informado o campo e o tipo de ordenação.

{% highlight php %}
// resgata todos os produtos
// ordenados pelo campo name em ordem decrescente
$select = $db->select()
             ->from('product')
             ->order('name desc');
{% endhighlight %}

Para esse artigo, os métodos apresentados acima são suficientes, no próximo artigo no qual iremos falar sobre o uso de join no zend framework, veremos outros métodos da classe Zend_Db_Select.

## Estrutura para criar um select simples

{% highlight php %}
// inicializa a criação do comando select
$select = $db->select();
 
// especifica a tabela e as colunas que deseja de retorno
$select->from('product', array('product_id', 'name'));
 
// adiciona uma condição
$price = 50.00;
$select->where('value > ?', $price);
 
// especifica um tipo de ordenação para os resultados
$select->order('product_id desc');
{% endhighlight %}

## Projeto Usando Zend_Db_Select

Agora que vimos um pouco sobre a classe Zend_Db_Select e suas vantagens, vamos criar um projeto para trabalhar com métodos usando Zend_Db_Select, baseado na estrutura apresentada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, crie um projeto com nome de example-select.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-30-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

No exemplo que será visto agora, iremos utilizar o banco apresentado no artigo Mapeando relacionamentos nos modelos, para criar nossos métodos usando Zend_Db_Select, confira o diagrama do nosso banco de dados:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-30-mer.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Modelo de entidade relacionamento</figcaption>
</figure>

[Visualize ou efetue o download do script sql](https://gist.github.com/967767), no script além dos comandos de criação das tabelas, contém comandos para inserir valores nas tabelas para que o exemplo no final do artigo funcione corretamente.

Acesse o phpmyadmin, crie o banco “zf-order” e execute o script sql acima para criar e preencher as tabelas do banco. Após criar o banco edite o arquivo application.ini com as informações do banco de dados, caso tenha dúvida, visualize o artigo Entendendo modelos no zend framework.

## Criando modelos e métodos usando Zend_Db_Select

Com o banco devidamente criado, crie os arquivos das abas abaixo na pasta “application/models”, para configurar nossos modelos e criar métodos usando Zend_Db_Select.

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
    <p>No modelo User, além das configurações padrões e de mapeamento, criamos dois métodos, o método findByPartialName($name), no qual criamos uma consulta personalizada para selecionar os usuários pelo nome e o método findByEmail($email), no qual criamos uma consulta para selecionar um usuário através do seu email de cadastro.</p>

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

  /**
  * findByPartialName
  *
  * @param string $name
  */
  public function findByPartialName($name) {
    $select = $this->select()
                  ->from($this->_name)
                  ->where('name like ?', "%{$name}%")
                  ->order('name ASC');

    return $this->fetchAll($select);
  }

  /**
  * findByEmail
  *
  * @param string $email
  */
  public function findByEmail($email) {
    $select = $this->select()
                    ->from($this->_name)
                    ->where('email = ?', $email);

    return $this->fetchRow($select);
  }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="product-code-tabpanel" role="tabpanel" aria-labelledby="product-code-tab">
    <p>No modelo Product, além das configurações padrões e do mapeamento, criamos dois métodos, o primeiro findByPriceRange($minimumPrice, $maximumPrice), utilizamos uma consulta personalizada para selecionar os produtos entre dois valores, ambos passados por parâmetro, no segundo método, getLatest($limit), criamos uma consulta personalizada para selecionar os últimos produtos adicionados, ordenando pelo id em decrescente e limitando o numero de resultado, o limite é passado por parametro.</p>

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

  /**
  * findByPriceRange
  *
  * @param float $minimumPrice
  * @param float $maximumPrice
  */
  public function findByPriceRange($minimumPrice, $maximumPrice) {
    $select = $this->select()
                    ->from($this->_name)
                    ->where('value > ?', $minimumPrice)
                    ->where('value < ?', $maximumPrice)
                    ->order('value ASC');

    return $this->fetchAll($select);
  }

  /**
  * getLatest
  *
  * @param int $limit
  */
  public function getLatest($limit) {
    $select = $this->select()
                    ->from($this->_name)
                    ->order('product_id DESC')
                    ->limit($limit);

    return $this->fetchAll($select);
  }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="order-code-tabpanel" role="tabpanel" aria-labelledby="order-code-tab">
    <p>No modelo Order, realizamos a configuração e o mapeamento do modelo, apenas para representar o diagrama apresentado, pois não iremos utilizar no exemplo.</p>

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
    <p>No modelo OrderItem, realizamos a configuração e o mapeamento do modelo, apenas para representar o diagrama apresentado, pois não iremos utilizar no exemplo.</p>

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

## Trabalhando com Zend_Db_Select

Com os nossos modelos criados e nossos métodos usando Zend_Db_Select prontos, vamos trabalhar com esses métodos, para isso vamos utilizar o IndexController.php e sua view, index.phtml.

IndexController.php

{% highlight php %}
<?php
class IndexController extends Zend_Controller_Action {
  public function indexAction() {
    // modelos
    $user = new User();
    $product = new Product();

    // restaga os 3 últimos produtos cadastrados
    $latestProducts = $product->getLatest(3);
    $this->view->assign('latestProducts', $latestProducts);

    // restaga os produtos de R$20,00 até R$50,00
    $productsByPrice = $product->findByPriceRange(20.00, 50.00);
    $this->view->assign('productsByPrice', $productsByPrice);

    // resgata usuários que contenha 'Diogo' no nome
    $usersByName = $user->findByPartialName('Diogo');
    $this->view->assign('usersByName', $usersByName);

    // resgata um usuário pelo email
    $userByEmail = $user->findByEmail('thiago@gmail.com');
    $this->view->assign('userByEmail', $userByEmail);
  }
}
?>
{% endhighlight %}

index.phtml

{% highlight php %}
<h3>Últimos 3 produtos adicionados</h3>
<?php foreach($this->latestProducts as $product): ?>
<p><?php echo $product->name; ?></p>
<?php endforeach; ?>
 
<h3>Produtos com valor maior que R$20,00 e menor que R$50,00</h3>
<?php foreach($this->productsByPrice as $product): ?>
<p><?php echo $product->name; ?></p>
<?php endforeach; ?>
 
<h3>Procurar usuários pelo nome</h3>
<?php foreach($this->usersByName as $user): ?>
<p><?php echo $user->name; ?></p>
<?php endforeach; ?>
 
<h3>Procurar usuário pelo email</h3>
<p><?php echo $this->userByEmail->name; ?></p>
{% endhighlight %}

Estrutura final do nosso projeto:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-30-final-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Resultado

Ao executar nossa aplicação iremos obter o seguinte resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-30-example.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução</figcaption>
</figure>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-select).