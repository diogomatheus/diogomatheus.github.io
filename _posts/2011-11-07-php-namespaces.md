---
image: "assets/images/posts/shared-image/2011-11-07-php-namespaces.jpg"
i18n: "PHP - Namespaces"
title: "PHP - Namespaces"
slug: "php-namespaces"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/entendendo-namespaces-no-php/"
---
Namespaces possibilitam o agrupamento de classes, interfaces, funções e constantes, visando evitar o conflito entre seus nomes, atuando como um encapsulador para estes itens, seu funcionamento é equivalente ao de diretórios em sistemas operacionais, onde dois arquivos de mesmo nome não podem existir em um único diretório, mas nada impede a existência de dois arquivos de mesmo nome localizados em diretórios distintos, este mesmo princípio é aplicado no PHP através de namespaces, ao utilizar este recurso temos mais liberdade na hora de criar classes, funções e etc, não sendo mais necessário utilizar prefixo para diferenciar seus nomes.

Este recurso está disponível a partir da versão 5.3 do PHP.

## Definindo namespaces

Namespaces são declarados utilizando a palavra-chave namespace. Um arquivo que contenha namespace deve realizar a declaração do mesmo logo no inicio, antes de qualquer código, com exceção de comentários, espaços em branco e [declare](https://www.php.net/manual/en/control-structures.declare.php).

{% highlight php %}
<?php
namespace Project;
// ...
?>
{% endhighlight %}

Seguindo o pensamento dos diretórios utilizado na introdução deste artigo, o recurso de namespaces também permite adicionar nomes com estrutura hierárquica, ou seja, sub-namespaces.

{% highlight php %}
<?php
namespace Project\Model;
// ...
?>
{% endhighlight %}

## Declarando diversos namespaces em um arquivo

Embora não seja uma prática recomendada, podemos declarar mais de um namespace no mesmo arquivo, confira:

(1) Combinação de sintaxe

{% highlight php %}
<?php
namespace Project;
class User {}
 
namespace AnotherProject;
class User {}
?>
{% endhighlight %}

(2) Sintaxe entre colchetes

{% highlight php %}
<?php
namespace Project {
class User {}
}
 
namespace AnotherProject {
class User {}
}
?>
{% endhighlight %}

(3) Namespace indefinido

{% highlight php %}
<?php
namespace Project {
class User {}
}
 
// Global scope
namespace {
class User {}
}
?>
{% endhighlight %}

## Utilizando namespaces

Antes de utilizar namespaces no PHP, é importante entender como o PHP identifica o contexto do qual o elemento será solicitado. Para isso vamos realizar uma analogia de como os sistemas operacionais acessam arquivos.

Há três maneiras de acessar um arquivo em sistemas operacionais:

- Nome de arquivo relativo, por exemplo: foo.txt, resultado: diretorioatual/foo.txt
- Nome de caminho relativo, por exemplo: subdiretorio/foo.txt, resultado: diretorioatual/subdiretorio/foo.txt
- Nome de caminho absoluto, por exemplo: /main/foo.txt, resultado: /main/foo.txt

O mesmo princípio pode ser aplicado a elementos utilizando namespace no PHP, por exemplo, uma classe pode ser solicitada de três maneiras.

(1) Nome não qualificado, ex: $var = new User;

Caso o namespace atual seja Project\Model, será solicitado Project\Model\User. Se o código for global, ou seja, sem namespace definido, irá solicitar User.

{% highlight php %}
<?php
// Example - Namespace scope
namespace Project\Model;
class User {}
$var = new User;
// Resultado: Project\Model\User
 
// Example - Global scope
class User {}
$var = new User;
// Resultado: User
?>
{% endhighlight %}

(2) Nome qualificado, ex: $var = new Model\User();

Caso o namespace atual seja Project, será solicitado Project\Model\User. Se o código for global, ou seja, sem namespace definido, irá solicitar Model\User.

{% highlight php %}
<?php
// Example - Namespace scope
namespace Project;
$var = new Model\User;
// Resultado: Project\Model\User
 
// Example - Global scope
$var = new Model\User;
// Resultado: Model\User
?>
{% endhighlight %}

(3) Nome absoluto, ex: $var = new \Project\Model\User();

Este tipo sempre irá solicitar pelo nome absoluto \Project\Model\User.

{% highlight php %}
<?php
// Example - Namespace scope
namespace Project;
$var = new \Project\Model\User;
// Resultado: Project\Model\User
 
// Example - Global scope
$var = new \Project\Model\User;
// Resultado: Project\Model\User
?>
{% endhighlight %}

## Aliasing / Importing

Uma caracteristica importante ao trabalhar com namespaces é a possibilidade de importar e atribuir apelidos. A palavra-chave use é utilizada para importar classes, interfaces ou namespaces através de seus nomes, não é possível importar funções ou constantes. Para adicionar apelidos, utilizamos a palavra-chave as, escolhendo um nome mais acessível, ou seja, um apelido, existem duas maneiras de realizar importações:

(1) Importação simples

{% highlight php %}
<?php
use Project\Model\User;
// É o mesmo que: use Project\Model\User as User;
 
$var = new User;
// Resultado: Project\Model\User
?>
{% endhighlight %}

(2) Múltiplas importações

O PHP oferece um atalho para realizar múltiplas importações na mesma linha, onde cada importação é separada através de uma virgula.

{% highlight php %}
<?php
use Project\Model\User, Project\Model\Post as Article;
 
$var = new Article;
// Resultado: Project\Model\Post
?>
{% endhighlight %}

A importação não afeta nomes dinâmicos de funções, classes ou constantes.

{% highlight php %}
<?php
use Project\Model\Post;
 
$var = new Post;
// Resultado: Project\Model\Post
 
$name = 'Post';
$var = new $name;
// Resultado: Post
?>
{% endhighlight %}

Além disso, a importação só afeta nomes não qualificados e qualificados, nomes absolutos não são afetados por importações.

{% highlight php %}
<?php
use Project\Model\Post;
 
$var = new Post;
// Resultado: Project\Model\Post
 
$var = new \Post;
// Resultado: Post
?>
{% endhighlight %}

A palavra-chave use deve ser declarada em escopo global ou dentro de declarações de namespace.

## Constante __NAMESPACES__

A constante mágica __NAMESPACE__ é uma constante dinâmica que possui seu valor baseado no namespace corrente, ou seja, seu valor irá variar de acordo com o escopo/namespace no qual for utilizada.

{% highlight php %}
<?php
namespace Project\Model;
 
echo __NAMESPACE__;
// Resultado: Project\Model
?>
{% endhighlight %}

A palavra-chave namespace também pode ser utilizada para solicitar um elemento do namespace atual ou de um sub-namespace.

{% highlight php %}
<?php
namespace Project
 
$var = new namespace\Model\User;
// Resultado: Project\Model\User
?>
{% endhighlight %}

Caso o arquivo não tenha namespace, ou seja, um arquivo global, o valor da constante __NAMESPACE__ será uma string vazia.

## Global space

Sem a definição de um namespace, todas as definições de classes, interfaces, funções e constantes são colocadas no escopo global, como era no PHP antes dos namespaces serem suportados.

{% highlight php %}
<?php
// file User.php
class User {}
 
// Example - Namespace scope
namespace Project\Model;
 
require_once("User.php");
$var = new User;
// Resultado: Project\Model\User
 
// Example - Global scope
require_once("User.php");
$var = new User;
// Resultado: User
?>
{% endhighlight %}

Prefixando o nome do elemento com \ especificará que o elemento é requerido do escopo global até mesmo no contexto de namespace.

{% highlight php %}
<?php
// file User.php
class User {}
 
// Example - Namespace scope
namespace Project\Model;
 
require_once("User.php");
$var = new \User;
// Resultado: User
 
// Example - Global scope
require_once("User.php");
$var = new \User;
// Resultado: User
?>
{% endhighlight %}

## Utilizando autoload para carregar arquivos

Utilizar autoload nunca foi tão fácil, principalmente se você estruturar seus arquivos em diretórios nomeados de acordo com seus namespaces, por exemplo, no namespace “Project\Model” existe uma classe nomeada User, se estruturarmos os arquivos de maneira que User.php fique no diretório “Project/Model”, ou seja, “Project/Model/User.php”, a única coisa que precisamos fazer é registrar o autoloader padrão:

{% highlight php %}
<?php
spl_autoload_extensions(".php");
spl_autoload_register();
?>
{% endhighlight %}

Mas como nada é perfeito, a solução acima não funciona em servidores linux, embora algumas pessoas já tenham solicitado reparo, parece que o problema ocorre por causa do path separator, o autoloader padrão tenta importar arquivos utilizando o path separator \ utilizado nos namespaces, o que é inválido para sistemas Linux/Unix, mas no windows funciona, enfim, enquanto esperamos essa correção precisamos definir um callback(função) que contorne essa situação e funcione em qualquer servidor, confira:

{% highlight php %}
<?php
spl_autoload_register(function ($class) {
  require_once(str_replace('\\', '/', $class . '.php'));
});
?>
{% endhighlight %}

Caso seu projeto tenha uma estrutura de arquivos personalizada, podemos alterar a função conforme for necessário, por exemplo, projetos que utilizam classes com extensão “.class.php”:

{% highlight php %}
<?php
spl_autoload_register(function ($class) {
  require_once(str_replace('\\', '/', $class . '.class.php'));
});
?>
{% endhighlight %}

No stackoverflow existe um tópico sobre, [Namespace Autoload works under windows](https://stackoverflow.com/questions/2862133/namespace-autoload-works-under-windows-but-not-on-linux), but not on Linux, onde podemos ler um pouco sobre essa situação, inclusive foi compartilhada uma solução mais robusta.

Diferente do método mágico [__autoload()](http://php.net/manual/en/language.oop5.autoload.php), [spl_autoload_register()](http://php.net/manual/pt_BR/function.spl-autoload-register.php) permite a definição de várias funções autoload, formando uma fila de funções, percorrendo cada uma das funções seguindo a ordem de definição.

Antes de começar a utilizar namespaces, de uma olhada nas [regras utilizadas para identificar de qual escopo/namespace](http://www.php.net/manual/en/language.namespaces.rules.php) deverá ser solicitada sua classe, interface, função ou constante.

## Trabalhando com namespaces no PHP

Baseado em alguns dos exemplos acima, criei um exemplo completo para demonstrar o funcionamento de namespaces no php, visualize ou efetue download do exemplo.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-11-07-namespace-example.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução</figcaption>
</figure>

## Referência(s)

- [Documentação oficial, namespaces](http://www.php.net/manual/en/language.namespaces.php)
- [Documentação oficial, autoloading classes](http://php.net/manual/en/language.oop5.autoload.php)
- [Documentação oficial, spl_autoload_register](http://php.net/manual/pt_BR/function.spl-autoload-register.php)