---
image: "assets/images/posts/shared-image/2011-09-26-php-variables-and-constants.jpg"
i18n: "PHP - Variables and constants"
title: "PHP - Variáveis e constantes"
slug: "php-variaveis-e-constantes"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/variaveis-e-constantes-no-php/"
---
Variáveis são containers temporários de dados, que ficam alocados na memória, no PHP uma variável pode conter diversos tipos de dados, strings, inteiros, números ponto flutuante, objetos, etc. PHP é uma linguagem de tipagem fraca, significa que o PHP fica encarregado de alterar o tipo da variável quando for necessário, dependendo da operação que for realizada no valor da variável, o que torna a tipagem dinâminca, sem necessidade de informar um tipo fixo, diferente de linguagens como C e Java que possuem tipagem forte, ou seja, uma vez que você defina o tipo de uma variável em sua declaração, ela só poderá conter esse tipo de valor.

Confira um exemplo de como funciona a tipagem dinâmica de variáveis no PHP:

{% highlight php %}
<?php
$var = 'texto';
echo gettype($var);
// Resultado: string
 
$var = 123;
echo gettype($var);
// Resultado: integer
?>
{% endhighlight %}

As variáveis no PHP são identificadas pelo simbolo do dólar($), seguido por um nome identificador, este nome identificador deve seguir algumas regras, confira:

- Deve conter apenas letras( a-z, A-Z ), números e underscore/sublinhado( _ )
- Precisa iniciar com uma letra ou underscore/sublinhado
- Case-sensitive, ou seja, $var é diferente de $VAR

{% highlight php %}
<?php
$var = 'válido';
$_var = 'válido';
$1var = 'inválido'; // Erro de sintaxe
?>
{% endhighlight %}

Para toda regra, existe uma exceção, confira:

{% highlight php %}
<?php
${'123'} = 456;
echo ${'123'};
// Resultado: 456
?>
{% endhighlight %}

Desta forma podemos utilizar qualquer nome identificador, passando uma string envolvida por chaves { }, o que faz o PHP interpretar o identificador como uma string, sem se preocupar com a real nomenclatura da variável.

## Função isset($variavel)

Está função verifica se uma variável já foi inicializada, retonando true caso o valor da variável seja diferente de null.

{% highlight php %}
<?php
$foo = 'bar';
$baz;
 
isset($foo);
// Resultado: true
isset($baz);
// Resultado: false
?>
{% endhighlight %}

Utilizar uma variável que não foi inicializada gera um erro, “Undefined variable $var”, mesmo que seu ambiente não esteja configurado para mostrar este tipo de erro é recomendado verificar com a função isset($var) se a variável que será utilizada está realmente inicializada.

## Função empty($variavel)

Está função verifica se o conteúdo de uma variável está vazio.

{% highlight php %}
<?php
$foo = 'bar';
$baz = null;
 
empty($foo);
// Resultado: false
empty($baz);
// Resultado: true
?>
{% endhighlight %}

Confira os valores que a função empty($variavel) considera vazio:

- $var = ""; ( string vazia )
- $var = 0;  ( valor inteiro zero )
- $var = "0"; ( string com valor zero )
- $var = NULL; ( variável com valor null )
- $var = FALSE; ( variável com valor boolean false )
- $var = array(); ( array vazio )
- var $var; ( variável declarada sem valor, dentro de uma classe )

## Variáveis por referência

O recurso de variáveis por referência no PHP permite que duas ou mais variáveis se refiram ao mesmo conteúdo armazenado em um bloco de memória, veja um exemplo abaixo:

{% highlight php %}
<?php
$a = 2;
$b = $a;
$c = &$a;
// ou $c =& $a;
$c = 4;
 
echo $a;
// Resultado: 4
?>
{% endhighlight %}

No exemplo acima iniciamos uma variável $a com o valor de tipo inteiro 2, logo em seguida iniciamos a variável $b recebendo como valor uma cópia da variável $a, depois iniciamos a variável $c recebendo a referência( & ) da variável $a, nesse momento nós temos duas variáveis apontando para o mesmo espaço de memória, ou seja, ambas variáveis($a e $c) fazem referência ao mesmo espaço de memória, que nesse caso guarda o valor inteiro 2, em seguida definimos que a variável $c irá receber o valor de tipo inteiro 4, ao realizar essa operação estamos alterando indiretamente o valor da variável $a, que faz referência ao mesmo espaço de memória, por isso que quando imprimirmos a variável $a o resultado será 4.

Confira a sequência realizada na ilustração abaixo:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-09-26-reference-variable.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Valor de variável por referência</figcaption>
</figure>

## Variáveis variáveis

No PHP é possível criar o que chamamos de variáveis variáveis, que nada mais é do que uma variável utilizar o conteúdo de outra variável para formar seu identificador.

{% highlight php %}
<?php
$var = 'hello';
$$var = 'world';
 
echo $var;
// Resultado: hello
 
// Imprimindo variáveis variáveis
echo $hello;
// Resultado: world
echo $$var;
// Resultado: world
echo ${'hello'};
// Resultado: world
echo ${$var};
// Resultado: world
?>
{% endhighlight %}

Como podemos observar no exemplo acima, criamos uma variável $var com uma string ‘hello’, em seguida utilizando o recurso de variáveis variáveis, iniciamos outra variável utilizando duas vezes o símbolo do dólar($$), o que faz o PHP identificar esse recurso, nesse momento o PHP interpreta o valor da variável $var como sendo o identificador da nova variável.

Ao utilizar variáveis variáveis pode ocorrer casos em que o valor da variável que se tornará um identificador não seja um identificador válido, limitando nossa maneira de recuperar essa variável, confira:

{% highlight php %}
<?php
$teste = 123;
$$teste = 456;
 
echo ${'teste'};
// Resultado: 123
echo $123; // Erro de sintaxe
 
// Para esses casos utilizamos a exceção da regra
echo ${$teste};
// Resultado: 456
echo ${'123'};
// Resultado: 456
echo $$teste;
// Resultado: 456
?>
{% endhighlight %}

Neste caso não podemos resgatar o valor chamando a variável $123, pois se trata de uma variável com nome identificador inválido.

## Funções variáveis

Um recurso parecido com variáveis variáveis, mas ao invés de gerar uma nova variável a partir do conteúdo de outra, este permite que seja executado uma função utilizando o conteúdo de uma variável, observe no exemplo abaixo.

{% highlight php %}
<?php
function hello(){
  echo 'Hello World';
}
 
$var = 'hello';
$var();
// Resultado: Hello World
?>
{% endhighlight %}

Por mais que os recursos variáveis variáveis e funções variáveis aparetam ser legais, tente limitar seu uso, pois além de deixar o código difícil de entender, pode causar falhas na segurança do seu script dependendo da forma em que for utilizado.

## Constantes

Ao contrário das variáveis, as constantes são definidas como valores imutáveis, ou seja, uma vez definida, uma constante não pode mudar de valor. Constantes podem ser acessadas de qualquer lugar do script, ou seja, são globais, entretanto só podem conter valores escalares. Assim como as variáveis, são case-sensitive e também seguem as mesmas regras para o nome de seus identificadores, com exceção do símbolo do dólar($). É recomendado que sempre se declare constantes com nomes  identificadores em uppercase, letras maiúsculas, para facilitar sua identificação.

Para criar uma constante no PHP, precisamos utilizar a função nativa define($identificador, $valor), passando dois parâmetros, o nome identificador da constante e seu valor.

{% highlight php %}
<?php
define('HELLO', 'Hello World');
 
echo HELLO;
// Resultado: Hello World
?>
{% endhighlight %}

Também podemos declarar uma constante utilizando const, que normalmente é utilizada em escopo de classe, mas a partir da versão 5.3 pode ser utilizada em escopo global.

{% highlight php %}
<?php
class foo {
  const BAR = 'BAZ';
}
echo foo::BAR;
 
// funciona na versão 5.3
const HELLO = 'Hello World';
echo HELLO;
?>
{% endhighlight %}

Para entender quais são as diferenças entre define e const e onde cada uma deve ser aplicada, de uma olhada neste tópico [define() vs const](https://stackoverflow.com/questions/2447791/php-define-vs-const).

**Função defined($identificador)** – Verifica se uma constante já foi definida, retornando true ou false, semelhante a função isset($variavel).

{% highlight php %}
<?php
$var = 'USER';
$type = 'TYPE';
define($var, 'Diogo Matheus Costa');
 
defined($var);
// Resultado: true
defined($type);
// Resultado: false
?>
{% endhighlight %}

**Função constant($identificador)** – Retorna o valor de uma constante caso a constante já tenha sido definida, no contrário será emitido uma mensagem de warning, informando que não foi possível encontrar a constante. É recomendado sempre utilizar a função defined($identificador) antes de utilizar a função constant($identificador), para verificar se a constante que será solicitada foi definida, evitando causar mensagens de warning.

{% highlight php %}
<?php
$var = 'USER';
define($var, 'Diogo Matheus Costa');
 
if(defined($var)){
  echo constant($var);
} else {
  echo 'Visitante';
}
?>
{% endhighlight %}

O PHP oferece um grande número de [constantes pré-definidas](https://www.php.net/manual/pt_BR/reserved.constants.php), a maioria dessas constantes, entretanto, são criadas por várias extensões e somente estarão presentes quando essas extensões estiverem disponíveis, por carregamento dinâmico ou por compilação direta.

## Constantes mágicas no PHP

Além das constantes pré-definidas, o PHP oferece algumas constantes falsas, que são denominadas constantes mágicas, eu digo falsa, porque seu valor não será sempre o mesmo, seu valor dependerá de onde ela está sendo utilizada, parece um pouco confuso mas depois de conferir o exemplo abaixo isso ficará um pouco mais claro.

{% highlight php %}
<?php
echo __LINE__ . PHP_EOL;
// comentário simples
echo __LINE__ . PHP_EOL;
 
// Resultado:
// 2
// 4
?>
{% endhighlight %}

Conseguiu entender? simplesmente a constante mágica __LINE__ retorna um valor inteiro representando a linha do script onde a constante está inserida.

Lista de constantes mágicas

- __LINE__ ( linha atual do script )
- __FILE__ ( caminho completo e nome do arquivo )
- __DIR__ ( diretório do arquivo )
- __FUNCTION__ ( nome da função )
- __CLASS__ ( nome da classe )
- __METHOD__ ( nome do método de classe )
- __NAMESPACE__ ( nome do atual namespace )