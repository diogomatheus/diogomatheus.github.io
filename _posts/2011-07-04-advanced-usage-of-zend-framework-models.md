---
image: "assets/images/posts/shared-image/2011-07-04-advanced-usage-of-zend-framework-models.jpg"
i18n: "Advanced usage of Zend Framework models"
title: "Uso avançado de modelos do Zend Framework"
slug: "uso-avancado-de-modelos-do-zend-framework"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/uso-avancado-de-modelos-no-zend-framework/"
---
Neste artigo iremos abordar o uso avançado de modelos no zend framework, que consiste em trabalhar com um conjunto de classes, Models, Mappers e DbTables. Essas classes quando utilizadas, dividem entre si as responsabilidades de um modelo, melhorando na organização e entendimento do mesmo.

## Estrutura utilizada nos tópicos anteriores

Nos tópicos anteriores foi utilizado uma classe Zend_Db_Table como responsável pelos modelos, mas esse uso por mais que funcione não é o recomendado, confira a estrutura utilizada nos tópicos anteriores:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-07-04-directory-models.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do diretório modelos (anterior)</figcaption>
</figure>

## Estrutura para uso avançado de modelos

O uso recomendado da classe Zend_Db_Table(DbTable) consiste na representação de uma tabela do banco de dados, manipulação de registros, mapeamento de relacionamentos e etc, para adicionar nossa lógica de negócio é recomendado a utilização de classes Mapper além do Model para definição de atributos, confira a estrutura para o uso avançado de modelos:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-07-04-advanced-directory-models.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do diretório modelos (avançada)</figcaption>
</figure>

## Conhecendo as classes envolvidas

**Model** – Classe responsável pela definição dos atributos e métodos get e set de cada atributo.

**Mappers** – Classe intermediária, responsável por mapear a classe de acesso ao banco de dados(DbTable) e o modelo, é na classe mapper que definimos nossas regras de negócio.

**DbTables** – Classe responsável pelo acesso ao banco de dados, onde mapeamos os relacionamentos das tabelas, definimos qual a tabela responsável por determinado modelo, rowClass, rowsetClass e etc.

## Você define como irá utilizar seus modelos

O zend framework em sua documentação de quickstart apresenta está estrutura para o uso de modelos, mas nada impede de você adotar a maneira que achar melhor para o seu projeto, não existe um padrão para utilizar modelos no zend framework, apenas recomendações.

## Uso de rowClass e rowsetClass

Para utilizar uma classe Zend_Db_Table_Row e Zend_Db_Table_Rowset, apresentadas no tópico Customizando modelos no zend framework, basta escolher o local ideal para guardar as classes e configurar na classe Zend_Db_Table(DbTable) do modelo.

## Projeto usando Model, Mapper e DbTable

Agora que vimos um pouco sobre as classes envolvidas no uso avançado de modelos, vamos criar um projeto para trabalhar, baseado na estrutura apresentada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, crie um projeto com nome de example-advanced-models.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-07-04-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

No exemplo que será visto agora, iremos utilizar o banco apresentado no artigo Entendendo modelos no zend framework, confira o script do banco abaixo:

{% highlight plaintext %}
CREATE TABLE user (
    user_id bigint(20) NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    email varchar(100) NOT NULL,
    PRIMARY KEY(user_id)
);
{% endhighlight %}

Acesse o phpmyadmin, http://localhost/phpmyadmin, crie uma base de dados com o nome de “zf-models” e adicione o script acima para criar a tabela “user”. Caso você já tenha esse banco e tabela porque realizou o outro tópico também, apenas certifique-se de que a tabela está vazia.

## Criando os arquivos do modelo

Para criar os arquivos do nosso modelo, iremos utilizar a estrutura apresentada no início do artigo, que consta com dois sub-diretórios na pasta “models” da nossa aplicação, DbTable e Mapper, confira novamente como deve ser nossa organização.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-07-04-advanced-directory-models.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do diretório modelos (avançada)</figcaption>
</figure>

Agora vamos criar os arquivos do modelo, crie os arquivos das abas abaixo.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="model-user-code-tab" data-toggle="tab" data-target="#model-user-code-tabpanel" type="button" role="tab" aria-controls="model-user-code-tabpanel" aria-selected="true">Model User.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="mapper-user-code-tab" data-toggle="tab" data-target="#mapper-user-code-tabpanel" type="button" role="tab" aria-controls="mapper-user-code-tabpanel" aria-selected="false">Mapper User.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="dbtable-user-code-tab" data-toggle="tab" data-target="#dbtable-user-code-tabpanel" type="button" role="tab" aria-controls="dbtable-user-code-tabpanel" aria-selected="false">DbTable User.php</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="model-user-code-tabpanel" role="tabpanel" aria-labelledby="model-user-code-tab">
    <p>Nossa classe model User está seguindo os atributos da tabela “user” do banco de dados, mas como podemos perceber estamos personalizando um atributo, na tabela “user” temos o campo “user_id”, chave primária da tabela, na classe model para simplificar chamamos apenas de “id”. Poderiamos utilizar os métodos mágicos do php para personalizar os métodos get e set dos atributos, mas optei por deixar nosso exemplo o mais simples possível, passando apenas o conceito necessário para o uso avançado de modelos.</p>
    <p>models/User.php</p>

{% highlight php %}
<?php
class User {
  private $_id;
  private $_name;
  private $_email;

  public function getId(){
    return $this->_id;
  }

  public function setId($id){
    $this->_id = $id;
    return $this;
  }

  public function getName(){
    return $this->_name;
  }

  public function setName($name){
    $this->_name = $name;
    return $this;
  }

  public function getEmail(){
    return $this->_email;
  }

  public function setEmail($email){
    $this->_email = $email;
    return $this;
  }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="mapper-user-code-tabpanel" role="tabpanel" aria-labelledby="mapper-user-code-tab">
    <p>A classe mapper User possui como atributo interno uma instância da classe DbTable User, e na maioria de seus métodos recebe e/ou retorna um objeto da classe model User, também podemos visualizar um mapeamento usando array no método saveOrUpdate(), no qual dizemos que o atritubo “id” da classe Model user, corresponde ao campo “user_id” do banco de dados(DbTable). No método fetchAll montamos um array de resposta, personalizando o resultado em formato de Zend_Db_Table_Rowset da classe DbTable, nesse ponto vale lembrar que cada iteração corresponde a um objeto do tipo Zend_Db_Table_Row, em caso de customização dos modelos, apresentado no tópico Customizando modelos no zend framework, poderiamos montar facilmente determinado modelo usando os métodos criados na classe row customizada em casos de dependência e referência de outros modelos.</p>
    <p>models/Mapper/User.php</p>

{% highlight php %}
<?php
class Mapper_User
{
    private $_dbTable;
 
    public function saveOrUpdate(User $user)
    {
        // build array with user info
        $data = array(
            'user_id' => $user->getId(),
            'name' => $user->getName(),
            'email' => $user->getEmail()
        );
 
        // id == null -> insert
        if (null === ($id = $user->getId())){
            unset($data['user_id']);
 
            // is unique name?
            if($this->isUniqueName($user->getName())){
                $this->getDbTable()->insert($data);
            }
            else {
                throw new Exception('This name is already being used.');
            }
        }
        // id != null -> update
        else {
            $this->getDbTable()->update($data, array('user_id = ?' => $id));
        }
    }
 
    public function fetchAll()
    {
        $resultSet = $this->getDbTable()->fetchAll();
 
        // custom return
        $result = array();
        foreach($resultSet as $row){
            $user = new User();
            $user->setId($row->user_id)
                 ->setName($row->name)
                 ->setEmail($row->email);
            $result[] = $user;
        }
 
        return $result;
    }
 
    public function isUniqueName($name)
    {
        $where = $this->getDbTable()
                      ->getDefaultAdapter()
                      ->quoteInto('name = ?', $name);
 
        return (count($this->getDbTable()->fetchAll($where)) == 0) ? true : false;
    }
 
    public function getDbTable()
    {
        if (null === $this->_dbTable) {
            $this->_dbTable = new DbTable_User();
        }
        return $this->_dbTable;
    }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="dbtable-user-code-tabpanel" role="tabpanel" aria-labelledby="dbtable-user-code-tab">
    <p>Nossa classe DbTable é bem simples, nesse caso apenas definimos qual tabela corresponde ao modelo User.</p>
    <p>models/DbTable/User.php</p>

{% highlight php %}
<?php
class DbTable_User extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'user';
}
?>
{% endhighlight %}

  </div>
</div>

## Trabalhando com nosso modelo

Com os arquivos do modelo criado, vamos explorar seus recursos, para isso vamos utilizar o IndexController.php e sua view, index.phtml.

IndexController.php

{% highlight php %}
<?php
class IndexController extends Zend_Controller_Action
{
    public function indexAction()
    {
        // model
        $diogo = new User();
        $diogo->setName('Diogo Matheus')
              ->setEmail('dm.matheus@gmail.com');
 
        // mapper
        $userMapper = new Mapper_User();
        try{
            // insert user
            $userMapper->saveOrUpdate($diogo);
        }
        catch(Exception $e){
            $this->view->assign('message', $e->getMessage());
        }
 
        // get all users
        $this->view->assign('users', $userMapper->fetchAll());
    }
}
?>
{% endhighlight %}

index.phtml

{% highlight php %}
<?php if($this->message): ?>
<h4><?php echo $this->message; ?></h4>
<?php endif; ?>
 
<h3>Lista de usuários</h3>
<?php foreach($this->users as $user): ?>
<p><?php echo $user->getName(); ?> - <?php echo $user->getEmail(); ?></p>
<?php endforeach; ?>
{% endhighlight %}

Estrutura final do nosso projeto:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-07-04-final-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Resultado

Ao executar nossa aplicação iremos obter o seguinte resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-07-04-example-first-execution.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução, primeira requisição</figcaption>
</figure>

Agora com o usuário “Diogo Matheus” já inserido no banco de dados, se você executar novamente nossa aplicação iremos obter uma mensagem dizendo que esse nome já está sendo utilizado.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-07-04-example-second-execution.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução, segunda requisição</figcaption>
</figure>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-advanced-models).