---
image: "assets/images/posts/shared-image/2011-05-09-understanding-zend-framework-models.jpg"
i18n: "Understanding Zend Framework models"
title: "Entendendo os modelos do Zend Framework"
slug: "entendendo-os-modelos-do-zend-framework"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/entendendo-modelos-no-zend-framework/"
---
Os modelos são responsáveis pela definição das regras de negócio da aplicação, por exemplo, se na sua aplicação não é permitido que dois usuários tenham o mesmo nome, é no modelo que você define essa regra, implementando para esse caso um método “isUniqueName($name)”, para verificar se o nome já está sendo usado. Além disso os modelos são responsáveis por acessar o banco de dados, inserindo, resgatando registros, etc.

Neste tópico vamos analisar a estrutura de um modelo usando zend_db_table, como configurar nossa aplicação para ter acesso ao banco de dados e como otimizar a chamada dos modelos, além de criar uma aplicação simples usando modelos.

## Entendendo a classe Zend_Db_Table

A classe Zend_Db_Table é uma interface orientada a objetos para as tabelas do banco de dados que fornece métodos para muitas operações comuns. A classe base é extensível, portanto, você pode adicionar lógica personalizada, ou seja, criar métodos para representar a sua lógica de negócio. Ao extender a classe Zend_Db_Table_Abstract nossos modelos poderão chamar todos os métodos implementados pela classe como find(),  fetchRow(), fetchAll(), insert(), update(), delete() entre outros métodos.

Recomendo a leitura da documentação sobre Zend_Db_Table, que conta com os seus recursos, alguns desses recursos veremos aqui, mas é sempre bom verificar todos os recursos disponíveis.

## Trabalhando com modelo no zend framework

Agora que vimos o que é um modelo e conheçemos um pouco sobre a classe Zend_Db_Table, vamos criar um projeto usando modelos, baseado na estrutura criada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, utilizando a url http://zf.example, apresentada no tópico Personalizando urls locais no wamp server, para testar nossa aplicação, crie um projeto com nome de example-models.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-09-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

## Criando nossa base de dados

Para realizar esse exemplo vamos precisar criar uma base de dados(bem simples), para trabalhar usando modelo no zend framework, nossa base contém apenas uma tabela(user), com dois campos além da chave primária, name e email.

{% highlight plaintext %}
CREATE TABLE user (
  user_id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY(user_id)
);
{% endhighlight %}

Acesse o phpmyadmin, http://localhost/phpmyadmin, crie uma base de dados com o nome de “zf-models” e adicione o script acima para criar a tabela “user”.

## Configurando nossa aplicação para trabalhar com modelos

Agora que nosso banco de dados foi criado vamos configurar nosso projeto, para isso vamos editar dois arquivos, application.ini e Bootstrap.php.

application.ini

{% highlight plaintext %}
[production]
phpSettings.display_startup_errors = 0
phpSettings.display_errors = 0
includePaths.library = APPLICATION_PATH "/../library"
includePaths.models = APPLICATION_PATH "/models"
bootstrap.path = APPLICATION_PATH "/Bootstrap.php"
bootstrap.class = "Bootstrap"
appnamespace = "Application"
resources.frontController.controllerDirectory = APPLICATION_PATH "/controllers"
resources.frontController.params.displayExceptions = 0
 
resources.db.adapter = PDO_MYSQL
resources.db.isDefaultTableAdapter = true
resources.db.params.host = "localhost"
resources.db.params.username = "seu usuário"
resources.db.params.password = "sua senha"
resources.db.params.dbname = "zf-models"
resources.db.params.persistence = true
resources.db.params.charset = "utf8"
 
[staging : production]
 
[testing : production]
phpSettings.display_startup_errors = 1
phpSettings.display_errors = 1
 
[development : production]
phpSettings.display_startup_errors = 1
phpSettings.display_errors = 1
resources.frontController.params.displayExceptions = 1
{% endhighlight %}

Para trabalhar com modelos precisamos indicar o caminho onde estão armazenados, para isso adicionamos a linha 5 que adiciona a pasta “application/models” no includePaths. Além disso precisamos configurar o resource db para que a aplicação se conecte ao banco de dados, confira essa configuração na linha 12 a 19.

Bootstrap.php

{% highlight php %}
<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {
  /**
  * Init Autoloader
  */
  protected function _initAutoload() {
    $loader = Zend_Loader_Autoloader::getInstance();
    $loader->setFallbackAutoloader(true);
  }
}
?>
{% endhighlight %}

No Bootstrap.php configuramos o autoloader para carregar nossas classes automáticamente, com essa configuração nossa aplicação está preparada para acessar nosso banco de dados e trabalhar com modelos através de chamadas simples, está não é a melhor maneira de configurar nossa aplicação para o uso de modelos, mas é a maneira ideal para iniciar os estudos sobre modelos, veremos outras configurações em outros tópicos.

## Criando o modelo User

Crie o arquivo User.php na pasta “application/models” e adicione o seguinte conteúdo.

{% highlight php %}
<?php
class User extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'user';

  /**
  * isUniqueName
  *
  * @desc check if is unique name
  * @param <string> $name
  */
  public function isUniqueName($name) {
    $where = $this->getDefaultAdapter()->quoteInto('name = ?', $name);
    return (count($this->fetchAll($where)) == 0) ? true : false;
  }
}
?>
{% endhighlight %}

O que fazemos aqui é simples, definimos o nome da tabela($_name = ‘user’) como um atributo protected, isso basta para que nosso modelo usando zend_db_table represente a tabela “user” do banco de dados e criamos o método isUniqueName para verificar se o nome passado por parâmetro já existe na tabela “user”, lembrando que agora que extendemos a classe Zend_Db_Table_Abstract temos todos os seus métodos implementados disponíveis.

## Simulando um crud básico de usuários

Crie o arquivo “UserController.php” na pasta “application/controllers” e adicione o conteúdo abaixo:

UserController.php

{% highlight php %}
<?php
class UserController extends Zend_Controller_Action
{
 
    /**
    * default model
    *
    * @var <User> $_model
    */
    private $_model;
 
    /**
    * init Controller
    */
    public function init()
    {
        $this->_model = new User();
    }
 
    /**
    * user list
    */
    public function indexAction()
    {
        // retorna todos os registros da tabela users
        $users = $this->_model->fetchAll();
        // envia o resultado para view
        $this->view->assign('users', $users);
    }
 
    /**
    * add user
    */
    public function addAction()
    {
        // simulando uma entrada de dados
        $user = array (
            'name'=>'Diogo Matheus',
            'email'=>'dm.matheus@gmail.com'
        );
 
        // verificando se existe registro usando esse nome
        if($this->_model->isUniqueName($user['name']))
        {
            // caso não tenha registro usando esse nome vamos inserir
            $this->_model->insert($user);
        }
 
        // redirecionando para lista de usuários
        $this->_helper->redirector('index', 'user');
    }
 
    /**
    * update user
    */
    public function editAction()
    {
        // simulando uma entrada de dados
        $data = array (
            'email'=>'diogo.matheus@msn.com'
        );
 
        // atualizando o email do usuário Diogo Matheus
        $where = $this->_model
                      ->getDefaultAdapter()
                      ->quoteInto('name = ?', 'Diogo Matheus');
        $this->_model->update($data, $where);
 
        // redirecionando para lista de usuários
        $this->_helper->redirector('index', 'user');
    }
 
    /**
    * delete user
    */
    public function removeAction()
    {
        // removendo o usuário Diogo Matheus
        $where = $this->_model
                      ->getDefaultAdapter()
                      ->quoteInto('name = ?', 'Diogo Matheus');
        $this->_model->delete($where);
 
        // redirecionando para lista de usuários
        $this->_helper->redirector('index', 'user');
    }
}
?>
{% endhighlight %}

Começamos a configuração do controller adicionando o atributo “$_model”, que representa o modelo principal daquele controller, afinal no controller UserController é esperado que o modelo User seja o mais utilizado.

Depois o que fazemos nesse controller é criar uma estrutura de actions visando as operações básicas de um modelo, visualizar as informações da tabela, adicionar, editar e remover. Na action add, antes de adicionar o registro na tabela, verificamos se o nome já existe, caso exista o usuário não é adicionado, lógico que em uma aplicação real isso seria contornado, por exemplo com uma mensagem, mas como essa aplicação só visa passar o conhecimento sobre os modelos é melhor deixar o mais simples e funcional possível.

Agora vamos preparar uma view de listagem de usuários, crie a pasta “user” em “application/views/scripts” e depois adicione o arquivo index.phtml com o seguinte conteúdo:

index.phtml

{% highlight php %}
<?php if(count($this->users)): ?>
<ul>
    <?php foreach($this->users as $user): ?>
    <li><?php echo $user->name; ?> - <?php echo $user->email; ?></li>
    <?php endforeach; ?>
</ul>
<?php else: ?>
    <?php echo 'Nenhum registro foi encontrado.'; ?>
<?php endif; ?>
{% endhighlight %}

Pronto, nossa view está preparada para listar os usuários e se precisar exibir uma mensagem caso não tenha registros.

Confira a estrutura final do nosso projeto:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-09-final-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Testando nossa aplicação

Com nossa aplicação finalizada, vamos realizar alguns testes, siga o fluxo das tabelas abaixo e verifique se os resultados serão os mesmos.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="list-tab" data-toggle="tab" data-target="#list-tabpanel" type="button" role="tab" aria-controls="list-tabpanel" aria-selected="true">Listagem</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="first-add-tab" data-toggle="tab" data-target="#first-add-tabpanel" type="button" role="tab" aria-controls="first-add-tabpanel" aria-selected="false">1º Adição</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="second-add-tab" data-toggle="tab" data-target="#second-add-tabpanel" type="button" role="tab" aria-controls="second-add-tabpanel" aria-selected="false">2º Adição</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="edition-tab" data-toggle="tab" data-target="#edition-tabpanel" type="button" role="tab" aria-controls="edition-tabpanel" aria-selected="false">Edição</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="removal-tab" data-toggle="tab" data-target="#removal-tabpanel" type="button" role="tab" aria-controls="removal-tabpanel" aria-selected="false">Remoção</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="list-tabpanel" role="tabpanel" aria-labelledby="list-tab">
    <p>Acesse http://zf.example/user para visualizar a página de listagem de usuários.</p>
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2011-05-09-no-record.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Listagem, sem registro</figcaption>
    </figure>
    <p>O resultado será uma mensagem de que nenhum registro foi encontrado.</p>
  </div>
  <div class="tab-pane" id="first-add-tabpanel" role="tabpanel" aria-labelledby="first-add-tab">
    <p>Acesse http://zf.example/user/add para adicionar um usuário (simulado no controller).</p>
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2011-05-09-one-record.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Listagem, um registro</figcaption>
    </figure>
    <p>O resultado será um registro na lista de usuários, porque no final da action somos redirecionados para página de listagem.</p>
  </div>
  <div class="tab-pane" id="second-add-tabpanel" role="tabpanel" aria-labelledby="second-add-tab">
    <p>Acesse http://zf.example/user/add para tentar adicionar o mesmo usuário novamente.</p>
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2011-05-09-one-record.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Listagem, um registro</figcaption>
    </figure>
    <p>O resultado será a listagem ainda com apenas um registro, porque o nome “Diogo Matheus” já existe na tabela “users” fazendo o método isUniqueName retornar false.</p>
  </div>
  <div class="tab-pane" id="edition-tabpanel" role="tabpanel" aria-labelledby="edition-tab">
    <p>Acesse http://zf.example/user/edit para editar o email do usuário.</p>
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2011-05-09-modified-record.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Listagem, registro editado</figcaption>
    </figure>
    <p>O resultado será a listagem com apenas um registro, mas com o email diferente.</p>
  </div>
  <div class="tab-pane" id="removal-tabpanel" role="tabpanel" aria-labelledby="removal-tab">
    <p>Acesse http://zf.example/user/remove para remover o usuário.</p>
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2011-05-09-no-record.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Listagem, sem registro</figcaption>
    </figure>
    <p>O resultado será uma mensagem de que nenhum registro foi encontrado, porque acabamos de remover o único registro.</p>
  </div>
</div>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-models).