---
image: "assets/images/posts/shared-image/2012-02-27-php-functions.jpg"
i18n: "PHP - Functions"
title: "PHP - Funções"
slug: "php-funcoes"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/trabalhando-com-funcoes-no-php/"
---
Funções são formas de modularizar uma ou mais linhas de código de maneira que possam ser executadas em diferentes momentos do script/aplicação quando necessário.

## Sintaxe de uma função

Toda função deve iniciar com function e possuir um nome identificador, podendo ter ou não parâmetros que devem ser definidos dentro de parênteses, já seu bloco de código é delimitado por chaves. A nomenclatura de uma função deve seguir as mesmas regras de nomenclatura de uma variável.

{% highlight plaintext %}
function name(parameters) {
  // statement
}
{% endhighlight %}

## Retornando valores

Por padrão uma função retorna null, mas podemos especificar qual será seu valor de retorno utilizando o comando return.

{% highlight php %}
<?php
$var;
function foo() {}
function bar() {
  return 'baz';
}
 
$var = foo();
echo $var;
// Resultado: Nada porque $var é null
 
$var = bar();
echo $var;
// Resultado: baz
?>
{% endhighlight %}

## Escopo de variáveis

O escopo de uma variável é o contexto onde esta foi definida, a maior parte das variáveis do PHP tem escopo local, que engloba outros scripts, incluídos através de include e require.

{% highlight php %}
<?php
$var = 'Hello World';
include 'test.php';
?>
{% endhighlight %}

No exemplo acima a variável $var estará disponível no script test.php.

Porem quando definimos uma função em um script estamos criando um novo escopo local, o escopo da função. Este escopo bloqueia o acesso direto as variáveis definidas no escopo externo da função, conhecido como escopo global.

{% highlight php %}
<?php
$foo = 'bar';
// $foo é uma variável global
 
function test() {
  echo $foo;
  // Tentamos imprimir a variável $foo, mas neste escopo ela não existe
  // Será lançado um Notice: Undefined variable
}
 
test();
?>
{% endhighlight %}

O PHP oferece algumas alternativas para que possamos trabalhar com variáveis de escopo global dentro de uma função, confira:

- Utilizando o comando global.
- Através do array superglobal $GLOBALS.
- Passando as variáveis por parâmetro/referência.

Neste artigo iremos abordar apenas a passagem de variáveis por parâmetro/referência, mas não deixe de ler mais sobre [escopo de variáveis](http://php.net/manual/pt_BR/language.variables.scope.php).

## Passagem de parâmetros

Ao definir uma função podemos informar quais parâmetros esta função irá receber, geralmente os parâmetros são definidos de duas maneiras:

Parâmetro por valor

{% highlight php %}
<?php
$a = 5;
$b = 8;
 
function foo($first, $second) {
  $result = $first + $second;
  return $result;
}
 
$var = foo($a, $b);
echo $var;
// Resultado: 13
?>
{% endhighlight %}

Parâmetro de valor padrão

{% highlight php %}
<?php
$a = 5;
 
function bar($first, $second = 2) {
  $result = $first + $second;
  return $result;
}

$var = bar($a);
echo $var;
// Resultado: 7
?>
{% endhighlight %}

A grande diferença é que no parâmetro de valor padrão, se não passarmos um valor para o parâmetro, o mesmo utilizará o valor definido no momento da declaração do mesmo, ou seja, seu valor padrão, mas devemos ter cuidado com este tipo de recurso, observe o caso a seguir, onde definimos um parâmetro de valor padrão seguido de um parâmetro por valor.

{% highlight php %}
<?php
$a = 8;
 
function bar($first = 5, $second) {
  $result = $first + $second;
  return $result;
}

$var = bar($a);
echo $var;
// Resultado: Lançará Warning e Notice, mas exibirá o resultado 8
?>
{% endhighlight %}

Neste caso não tem como o PHP identificar se estamos querendo passar o segundo parâmetro e armazena o valor passado na variável $first, sendo assim a variável $second não é informada, resultando em um warning de erro na quantidade de parâmetros esperados pela função e um notice informando que a variável $second não foi inicializada, undefined variable.

## Verificando lista de parâmetros variáveis

Nem sempre sabemos quantos parâmetros uma função irá receber, para essa situação o PHP oferece métodos para verificar e resgatar quantidades indefinidas de parâmetros, confira:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Sintaxe</th>
        <th scope="col">Parâmetros</th>
        <th scope="col">Second</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>int func_num_args(void)</td>
        <td>void (nenhum)</td>
        <td>Quatidade de parâmetros</td>
      </tr>
      <tr>
        <td>array func_get_args(void)</td>
        <td>void (nenhum)</td>
        <td>Array de parâmetros</td>
      </tr>
      <tr>
        <td>mixed func_get_arg(int arg_num)</td>
        <td>Índice do parâmetro</td>
        <td>Valor do parâmetro</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight php %}
<?php
function media() {
  $qtd = func_num_args();
  $valores = func_get_args();
  if($qtd < 1) {
    return 0;
  }

  $soma = null;
  //$soma = array_sum($valores);
  for($i = 0; $i < $qtd; $i++) {
    $soma += func_get_arg($i);
  }
  $resultado = $soma / $qtd;

  return $resultado;
}
 
$var = media(2, 8, 10, 12);
echo $var;
// Resultado: 8
?>
{% endhighlight %}

No exemplo acima criamos uma função que retorna a média dos valores passados. Primeiro resgatamos a quantidade de parâmetros passados para função, em seguida resgatamos os valores, verificando se pelo menos um parâmetro foi informado e após somar todos os valores, dividimos pela quantidade de parâmetros, retornando o resultado desse cálculo.

## Passagem de parâmetros por referência

Por padrão um parâmetro é passado como cópia(valor) para uma função, com isso, qualquer alteração que seja efetuada nesse parâmetro dentro da função(escopo local), não afetará seu ambiente externo(escopo global). Porém, existem casos em que precisamos que as alterações sejam mantidas no ambiente externo(escopo global), para esses casos, devemos passar o parâmetro como referência, utilizando & na frente do parâmetro no momento em que definimos a função.

{% highlight php %}
<?php
function changeValue(&$value) {
  $value += 20;
}
 
$var = 10;
changeValue($var);
echo $var;
// Resultado: 30
?>
{% endhighlight %}

Observe que nenhum valor foi retornado pela função, caso tenha alguma dúvida sobre como funciona referência no PHP dê uma olhada no artigo Variáveis e Constantes no PHP, onde falo sobre variáveis por referência.

## Retornando referência de uma variável

Para retornar uma referência, precisamos utilizar o & em dois locais, primeiro no momento da definição da função, adicionando o mesmo antes do nome identificador da função e segundo ao receber o resultado da função, devemos atribuir o mesmo a uma variável adicionando o & após o operador de atribuição(=), confira o exemplo anterior alterado para retornar uma referência.

{% highlight php %}
<?php
function &changeValue(&$value) {
  $value += 20;
  return $value;
}
 
$var = 10;
$test =& changeValue($var);
$test += 10;
echo $var;
// Resultado: 40
?>
{% endhighlight %}

Neste exemplo além de alterar o conteúdo da variável $var dentro da função, retornamos sua referência para a variável $test no escopo global, onde realizamos uma adição e por fim exibimos o valor da variável $var.

## Referência(s)

- [Documentação oficia, funções](http://php.net/manual/pt_BR/language.functions.php)
- [Documentação oficia, escopo de variáveis](http://php.net/manual/pt_BR/language.variables.scope.php)
- [Documentação oficia, referências](http://www.php.net/manual/pt_BR/language.references.php)