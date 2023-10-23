---
image: "assets/images/posts/shared-image/2012-04-02-php-abstracting-database-interactions-using-pdo.jpg"
i18n: "PHP - Abstracting database interactions using PDO"
title: "PHP - Abstraindo interações de banco de dados usando PDO"
slug: "php-abstraindo-interacoes-de-banco-de-dados-usando-pdo"
categories: [ "Programação" ]
tags: [ "featured" ]
redirect_from:
  - "/blog/php/trabalhando-com-pdo-no-php/"
---
PDO (PHP Data Objects) é uma extensão que fornece uma interface padronizada para trabalhar com bancos de dados, cuja finalidade é abstrair a conexão e interações com os bancos, ou seja, independente do banco de dados que estiver sendo utilizado os métodos executados serão os mesmos, mas isso não significa que seu sistema será portável entre diversos bancos de dados, por mais que o uso do PDO facilite a portabilidade, esta interface significa apenas que você se comunicará com qualquer banco de dados através de um determinado conjunto de métodos e classes.

Não é possível executar funções de interação com o banco de dados utilizando somente a extensão PDO, é preciso utilizar um driver específico do PDO para acessar um determinado banco de dados. Cada banco de dados pode prover um driver para PDO, porém nem todos os recursos são suportados em todos os bancos, por exemplo, no MySQL, tabelas do tipo MyISAM não suportam transações, impossibilitando o funcionamento dos métodos PDO::beginTransaction(), PDO::commit() e PDO::rollBack().

PDO não é uma abstração de banco de dados e não reescreve SQL.

## Banco de dados, SQL e SQL Joins

Não irei abordar nesse texto os aspectos iniciais relacionados com banco de dados, SQL, SQL Joins, etc. Se você está interessado nesses conceitos, ou está estudando para certificação ZCE PHP não deixe de conferir os links a seguir, além de pesquisar e estudar sobre.

- [Banco de dados](http://pt.wikipedia.org/wiki/Banco_de_dados)
- [SQL](http://pt.wikipedia.org/wiki/SQL#DDL_-_Linguagem_de_Defini.C3.A7.C3.A3o_de_Dados)
- [SQL Joins](http://en.wikipedia.org/wiki/Join_(SQL))

## Vantagens de utilizar PDO

- Abstração de conexão e interação com banco de dados
- Segurança
- Suporte a diversos drivers

Ainda hoje muitas pessoas consideram o uso do PDO uma opção, analisando a possibilidade de um determinado projeto mudar de banco, utilizando o PDO somente se essa possibilidade existir. O grande perigo nessa análise superficial é que nem sempre no início de um projeto temos essa visão e se tiver que mudar não adianta lamentar, então em cima disso particularmente recomendo a utilização deste recurso, principalmente se o projeto necessitar trabalhar com mais de um tipo de banco.

Confira todos os [drivers suportados pelo PDO](http://www.php.net/manual/en/pdo.drivers.php).

## Manipulando conexões

Toda conexão com banco de dados é realizada ao criar uma instância da classe PDO, ou seja, independente do driver utilizado sempre iremos instanciar a classe PDO.

O construtor da classe PDO recebe as informações do banco como parâmetro obrigatório, conhecido como dsn(Data Source Name), além dos parâmetros opcionais username, password e driver_options.

{% highlight plaintext %}
__construct ( string $dsn [, string $username [, string $password [, array $driver_options ]]] )
{% endhighlight %}

No exemplo abaixo realizamos uma conexão com o banco de dados mysql.

{% highlight php %}
<?php
$conn = new PDO('mysql:host=localhost;dbname=example-pdo', 'user', 'password');
?>
{% endhighlight %}

Também podemos configurar nossa conexão através do parâmetro driver_options.

{% highlight php %}
<?php
$conn = new PDO(
  'mysql:host=localhost;dbname=example-pdo', 'user', 'password',
  array(PDO::ATTR_PERSISTENT => true)
);
?>
{% endhighlight %}

No exemplo acima, configuramos nossa conexão como persistente. Uma conexão persistente não é fechada no final do script, e sim armazenada em cache sendo reutilizada quando outro script solicitar uma conexão usando as mesmas credenciais.

Após abrir uma conexão podemos interagir com o banco utilizando 3 métodos da classe PDO:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Método</th>
        <th scope="col">Retorno</th>
        <th scope="col">Objetivo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>exec</td>
        <td>int</td>
        <td>Utilizado para insert, update e delete.</td>
      </tr>
      <tr>
        <td>query</td>
        <td>PDOStatement</td>
        <td>Utilizado para resultados tabulares, comando select.</td>
      </tr>
      <tr>
        <td>prepare</td>
        <td>PDOStatement</td>
        <td>Cria um prepared statement, utilizado para dados variáveis.</td>
      </tr>
    </tbody>
  </table>
</div>

Normalmente para fechar uma conexão é preciso destruir o objeto, assim como suas referências, para isso atribuimos o valor NULL a variável que contém o objeto. Se isso não for feito o PHP irá fechar automáticamente a conexão quando o script terminar, caso não seja uma conexão persistente.

Prepared statements

Os prepared statements oferecem dois ótimos benefícios:

- A query só precisa ser preparada uma vez, mas pode ser executada várias vezes.
- Os parâmetros não precisam ser escapados, pois o driver cuida disso automaticamente.

Esses benefícios significam duas coisas, agilidade e segurança, confira a criação de um prepared statement.

{% highlight php %}
<?php
$stmt = $conn->prepare('INSERT INTO posts (title, content) VALUES (:title, :content)');
?>
{% endhighlight %}

Com nosso prepared statement criado, precisamos informar os valores para compor a query, confira os métodos que podem ser utilizados.

- bindValue()
- bindParam()

{% highlight php %}
<?php
$stmt = $conn->prepare('INSERT INTO posts (title, content) VALUES (:title, :content)');
 
$title = 'Titulo do post';
$content = 'Conteudo do post';
$stmt->bindValue(':title', $title);
$stmt->bindValue(':content', $content);
?>
{% endhighlight %}

Após informar os dados necessários para o prepared statement, precisamos executar o método execute() para realizar a query no banco.

Para resgatar resultados de um comando select temos algumas alternativas.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Método</th>
        <th scope="col">Objetivo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>fetch()</td>
        <td>Retorna a próxima linha do resultado.</td>
      </tr>
      <tr>
        <td>fetchAll()</td>
        <td>Retorna um array com todos os resultados.</td>
      </tr>
      <tr>
        <td>fetchObject()</td>
        <td>Retorna a próxima linha do resultado como objeto.</td>
      </tr>
      <tr>
        <td>fetchColumn()</td>
        <td>Retorna uma coluna da próxima linha do resultado.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight php %}
<?php
$stmt = $conn->prepare("SELECT * FROM posts");
while($row = $stmt->fetch()) {
  print_r($row);
}
?>
{% endhighlight %}

Um recurso interessante na hora de resgatar valores é o método bindColumn(), que tem a função de vincular o valor de uma coluna do resultado do prepared statment à uma variável.

## Diferença entre bindParam() e bindValue()

A grande diferença entre esses métodos é que o bindParam() recebe o valor do parâmetro por referência, sendo este realmente setado no momento em que o método execute() do prepared statment for chamado, o que pode gerar problemas em alguns casos, mas também pode facilitar em outros, sendo assim dê preferência ao bindValue() para os casos básicos.

## Transações

Uma transação é um conjunto de procedimentos executados no banco de dados como uma única operação. Na prática, indicamos o início de uma transação utilizando o comando start transaction ou begin no MySQL, em seguida realizamos algumas tarefas, inserção, alteração ou remoção de registro(s), no termino desses procedimentos caso tudo ocorra bem, informamos através do comando commit que as mudanças podem ser aplicadas de fato no banco, mas caso ocorra algo de errado em algum dos procedimentos podemos utilizar o comando rollback, garantindo que todos os procedimentos realizados desde o início da transação sejam desfeitos.

A integridade de uma transação depende de quatro propriedades, conhecidas como ACID.

(1) Atomicidade

Uma transação deve ser uma unidade atômica de trabalho; ou todas as suas modificações de dados são executadas ou nenhuma delas é executada.

(2) Consistência

Regras de integridade dos dados são asseguradas, ou seja, as transações não podem quebrar as regras do banco de dados.

(3) Isolamento

O resultado de uma transação executada concorrentemente a outra deve ser o mesmo que o de sua execução de forma isolada. Operações exteriores a uma dada transação jamais verão esta transação em estados intermediários.

(4) Durabilidade

Depois que uma transação tiver sido concluída, seus efeitos ficam permanentemente no sistema.

No PDO utilizamos três métodos para trabalhar com transações, beginTransaction() para iniciar uma transação, commit() para que as tarefas realizadas sejam mantidas e rollback() para desfazer caso ocorra algum problema.

Alguns bancos de dados não oferecem este recurso, trabalhando apenas em modo autocommit.
http://en.wikipedia.org/wiki/Autocommit

## Tratamento de erros no PDO

O PDO oferece 3 alternativas para manipulação de erros.

PDO::ERRMODE_SILENT

Esse é o tipo padrão utilizado pelo PDO, basicamente o PDO seta internamente o código de um determinado erro, podendo ser resgatado através dos métodos PDO::errorCode() e PDO::errorInfo().

PDO::ERRMODE_WARNING

Além de armazenar o código do erro, este tipo de manipulação de erro irá enviar uma mensagem E_WARNING, sendo este muito utilizado durante a depuração e/ou teste da aplicação.

PDO::ERRMODE_EXCEPTION

Além de armazenar o código de erro, este tipo de manipulação de erro irá lançar uma exceção PDOException, esta alternativa é recomendada, principalmente por deixar o código mais limpo e legível.

{% highlight php %}
<?php
try {
  $dsn = 'mysql:host=localhost;dbname=example-pdo';
  $conn = new PDO($dsn, 'user', 'password');
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo $e->getMessage();
}
?>
{% endhighlight %}

## Trabalhando com PDO

Agora que conhecemos um pouco sobre PDO, vamos praticar, neste exemplo iremos utilizar um banco de dados chamado de “example-pdo”, contendo apenas uma tabela, nomeada de “posts”, [confira o script de criação da tabela](https://gist.github.com/2270229).

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="index-code-tab" data-toggle="tab" data-target="#index-code-tabpanel" type="button" role="tab" aria-controls="index-code-tabpanel" aria-selected="true">index.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="registry-code-tab" data-toggle="tab" data-target="#registry-code-tabpanel" type="button" role="tab" aria-controls="registry-code-tabpanel" aria-selected="false">Registry.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="postdao-code-tab" data-toggle="tab" data-target="#postdao-code-tabpanel" type="button" role="tab" aria-controls="postdao-code-tabpanel" aria-selected="false">dao/PostDAO.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="post-code-tab" data-toggle="tab" data-target="#post-code-tabpanel" type="button" role="tab" aria-controls="post-code-tabpanel" aria-selected="false">model/Post.php</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="index-code-tabpanel" role="tabpanel" aria-labelledby="index-code-tab">

{% highlight php %}
<?php
include_once('Registry.php');
include_once('dao/PostDAO.php');
include_once('model/Post.php');
 
// Instanciar uma conexão com PDO
$conn = new PDO('mysql:host=localhost;port=3306;dbname=example-pdo', 'user', 'password');
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
// Armazenar essa instância no Registry
$registry = Registry::getInstance();
$registry->set('Connection', $conn);
 
// Instanciar um novo Post e setar informações
$primeiroPost = new Post();
$primeiroPost->setTitle('Primeiro post');
$primeiroPost->setContent('Conteudo!');
 
// Instanciar um novo Post e setar informações
$segundoPost = new Post();
$segundoPost->setTitle('Segundo post');
$segundoPost->setContent('Conteudo!');
 
// Instanciar o DAO e trabalhar com os métodos
$postDAO = new PostDAO();
$postDAO->insert($primeiroPost);
$postDAO->insert($segundoPost);
 
// Resgatar todos os registros e iterar
$results = $postDAO->getAll();
foreach($results as $post) {
  echo $post->getTitle() . '<br />';
  echo $post->getContent() . '<br />';
  echo '<br />';
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="registry-code-tabpanel" role="tabpanel" aria-labelledby="registry-code-tab">

{% highlight php %}
<?php
/**
 * @author João Batista Neto
 */
 
class Registry {
 
    private static $instance;
    private $storage;
 
    protected function __construct() {
        $this->storage = new ArrayObject();
    }
 
    public function get( $key ) {
        if ( $this->storage->offsetExists( $key ) ) {
            return $this->storage->offsetGet( $key );
        } else {
            throw new RuntimeException( sprintf( 'Não existe um registro para a chave "%s".' , $key ) );
        }
    }
 
    public static function getInstance() {
        if ( !self::$instance )
            self::$instance = new Registry();
 
        return self::$instance;
    }
 
    public function set( $key , $value ) {
        if ( !$this->storage->offsetExists( $key ) ) {
            $this->storage->offsetSet( $key , $value );
        } else {
            throw new LogicException( sprintf( 'Já existe um registro para a chave "%s".' , $key ) );
        }
    }
 
    public function unregister( $key ) {
        if ( $this->storage->offsetExists( $key ) ) {
            $this->storage->offsetUnset( $key );
        } else {
            throw new RuntimeException( sprintf( 'Não existe um registro para a chave "%s".' , $key ) );
        }
    }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="postdao-code-tabpanel" role="tabpanel" aria-labelledby="postdao-code-tab">

{% highlight php %}
<?php
include_once('model/Post.php');
 
class PostDAO {
 
    private $conn;
 
    public function __construct() {
        $registry = Registry::getInstance();
        $this->conn = $registry->get('Connection');
    }
 
    public function insert(Post $post) {
        $this->conn->beginTransaction();
 
        try {
            $stmt = $this->conn->prepare(
                'INSERT INTO posts (title, content) VALUES (:title, :content)'
            );
 
            $stmt->bindValue(':title', $post->getTitle());
            $stmt->bindValue(':content', $post->getContent());
            $stmt->execute();
 
            $this->conn->commit();
        }
        catch(Exception $e) {
            $this->conn->rollback();
        }
    }
 
    public function getAll() {
        $statement = $this->conn->query(
            'SELECT * FROM posts'
        );
 
        return $this->processResults($statement);
    }
 
    private function processResults($statement) {
        $results = array();
 
        if($statement) {
            while($row = $statement->fetch(PDO::FETCH_OBJ)) {
                $post = new Post();
 
                $post->setId($row->post_id);
                $post->setTitle($row->title);
                $post->setContent($row->content);
 
                $results[] = $post;
            }
        }
 
        return $results;
    }
 
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="post-code-tabpanel" role="tabpanel" aria-labelledby="post-code-tab">

{% highlight php %}
<?php
class Post {
 
    private $id;
    private $title;
    private $content;
 
    public function getId() {
        return $this->id;
    }
 
    public function setId($id) {
        $this->id = $id;
        return $this;
    }
 
    public function getTitle() {
        return $this->title;
    }
 
    public function setTitle($title) {
        $this->title = $title;
        return $this;
    }
 
    public function getContent() {
        return $this->content;
    }
 
    public function setContent($content) {
        $this->content = $content;
        return $this;
    }
 
}
?>
{% endhighlight %}

  </div>
</div>

Ao executar este exemplo iremos obter o seguinte resultado:

{% highlight plaintext %}
Primeiro post
Conteudo!

Segundo post
Conteudo!
{% endhighlight %}

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/php-pdo).

## Referência(s)

- [Documentação oficial, PHP Data Objects](http://php.net/manual/pt_BR/book.pdo.php)
- [Documentação oficial, PDO Drivers](http://www.php.net/manual/pt_BR/pdo.drivers.php)
- [PHP Data Objects](http://www.slideshare.net/wezfurlong/php-data-objects)