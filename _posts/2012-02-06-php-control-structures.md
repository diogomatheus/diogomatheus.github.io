---
image: "assets/images/posts/shared-image/2012-02-06-php-control-structures.jpg"
i18n: "PHP - Control structures"
title: "PHP - Estruturas de controle"
slug: "php-estruturas-de-controle"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/estruturas-de-controle-no-php/"
---
Todo script PHP é composto por um conjunto de instruções, uma instrução pode ser uma atribuição, uma chamada de função, ou mesmo uma instrução que não faz nada. Instruções geralmente terminam com um ponto e vírgula, mas existem casos que instruções são encapsuladas por um grupo de comandos utilizando chaves, grupos de comandos também são instruções, neste artigo iremos conhecer algumas dessas instruções que tem como objetivo encapsular outras instruções, normalmente chamadas de estruturas de controle.

## Estruturas condicionais

**if** - A estrutura if é uma das caracteristicas mais importantes das linguagens de programação, pois permite a execução condicional de um bloco de código. Uma expressão interna é definida para verificar se o bloco de código deve ou não ser executado.

{% highlight plaintext %}
if (expression) {
  statement
}
{% endhighlight %}

Como funciona? Caso a expressão interna retorne true, o bloco de código será executado, caso contrário o bloco é ignorado.

{% highlight php %}
<?php
$var = 'foo';
if($var == 'foo') {
  echo 'foo';
}
// Resultado: foo
 
if($var == 'bar') {
  echo 'bar';
}
// Resultado: N/A
?>
{% endhighlight %}

**else** – A estrutura else é um complemento do if, em alguns casos é necessário executar um bloco de código caso a expressão da estrutura if retorne false, é ai que entra o else.

Como funciona? Caso a expressão interna do if retorne false, o bloco de código da estrutura else será executado, caso contrário este bloco será ignorado.

{% highlight php %}
<?php
$var = 'foo';
if($var == 'foo') {
  echo 'foo';
} else {
  echo 'bar';
}
// Resultado: foo
 
if($var == 'bar') {
  echo 'bar';
} else {
  echo 'foo';
}
// Resultado: foo
?>
{% endhighlight %}

**else if** – A estrutura de controle else if é o resultado do uso encadeado de if e else, de maneira que caso a expressão interna de um dos ifs retorne true, os demais não serão executados.

Como funciona? Enquanto uma expressão interna de if não retornar true, o próximo if será verificado, até que não tenha mais if para verificar, caso uma expressão retorne true, seu bloco de código será executado e a cascata será interrompida.

{% highlight php %}
<?php
$var = 'bar';
if($var == 'foo') {
  echo 'foo';
} else if ($var == 'bar') {
  echo 'bar';
} else if ($var == 'baz') {
  echo 'baz';
}
// Resultado: bar
?>
{% endhighlight %}

**switch** – A estrutura de controle switch é parecida com o uso encadeado de if e else, mas vai um pouco além e oferece outras funcionalidades, por exemplo, podemos agrupar opções que tenham um bloco de código em comum ou definir um bloco de código padrão.

Como funciona? Esta estrutura recebe um parâmetro e o compara com cada uma das opções disponíveis, caso encontre uma opção igual ao parâmetro recebido, executa seu bloco de código até encontrar um comando break, caso não encontre o comando break, todos os blocos seguintes serão executados.

{% highlight php %}
<?php
$var = 'foo';
switch($var) {
    case 'foo':
    case 'bar':
        echo 'foobar';
        break;
    case 'baz':
        echo 'baz';
        break;
    default:
        echo 'Está opção não existe.';
        break;
}
// Resultado: foobar
?>
{% endhighlight %}

Geralmente o uso de switch é recomendado ao invés do uso encadeado de if e else, principalmente se o número de opções for grande.

## Estruturas de repetição

Ao trabalhar com estruturas de repetição, precisamos verificar a existência de um ponto de parada, caso contrário o script entrará em loop infinito.

**while** – A estrutura while é uma estrutura de repetição que avalia uma expressão e executa um bloco de código enquanto o resultado da expressão for true, caso o resultado seja false, a execução do bloco de código é interrompida.

{% highlight plaintext %}
while (expression) {
  statement
}
{% endhighlight %}

Como funciona? enquanto a expressão interna retornar true o bloco de código será executado.

{% highlight php %}
<?php
$count = 1;
while($count <= 5) {
  echo $count;
  $count++;
}
// Resultado: 12345
?>
{% endhighlight %}

**do while** – A estrutura do while é bastante parecida com a estrutura while, mas a verificação de expressão interna fica depois do bloco de código.

Como funciona? Executa primeiro, pergunta depois, ou seja, executa o bloco de código uma vez, depois começa a verificar a expressão interna, enquanto retornar true o bloco de código será executado.

{% highlight php %}
<?php
$check = false;
do {
  echo 'foobar';
} while($check == true);
// Resultado: foobar
?>
{% endhighlight %}

**for** – A estrutura for é uma das estruturas de repetição mais conhecidas, sua sintaxe é bem diferente, nela definimos 3 instruções internas separadas por ponto e vírgula. Primeiro definimos um contador, segundo uma expressão de verificação e por último uma instrução de modificação do contador.

{% highlight plaintext %}
for (expression; expression; expression) {
  statement
}
{% endhighlight %}

Como funciona? Enquanto a segunda expressão retornar true o bloco de código será executado e o contador modificado.

{% highlight php %}
<?php
for($i = 1; $i <= 5; $i++) {
  echo $i;
}
// Resultado: 1 2 3 4 5
?>
{% endhighlight %}

**foreach** – A estrutura foreach é uma estrutura de repetição simplificada, mas que as vezes acaba gerando confusão em quem está iniciando, está estrutura é otimizada para iterar(navegar) pelos itens de um array, mas não se limita somente a array, pode ser utilizada com dois ou três parâmetros.

{% highlight plaintext %}
foreach (array as $value) {
  statement
}
 
foreach (array as $key => $value) {
  statement
}
{% endhighlight %}

Como funciona? Enquanto existir itens será executado o bloco de código.

{% highlight php %}
<?php
$var = array('foo', 'bar', 'baz');
foreach($var as $value) {
  echo $value;
}
// Resultado: foo bar baz
 
foreach($var as $key => $value) {
  echo "{$key} = {$value}";
}
// Resultado: 0 = foo 1 = bar 2 = baz
?>
{% endhighlight %}

## Editando valores durante um foreach

Por padrão a estrutura foreach trabalha recebendo os valores de um array por cópia, ou seja, independente do que você fizer durante um foreach os valores do array irão continuar os mesmos após a execução do mesmo, mas também podemos editar os valores de um array, basta passar a variável que representa o valor do item por referência(&).

{% highlight php %}
<?php
$array = array('A', 'B', 'C');
foreach($array as $key => $value) {
  $value = $key;
}

foreach($array as $item) {
  echo $item;
}
// Resultado: A B C
?>
{% endhighlight %}

Teoricamente o resultado deveria ser: 0 1 2, porque no primeiro foreach trocamos o valor pela chave, mas nesse caso não passamos por referência e após terminar o primeiro foreach o segundo recebe o array original, afinal o que foi alterado no primeiro foreach foi apenas uma cópia do array original.

Confira como ficaria o script acima passando o valor por referência:

{% highlight php %}
<?php
$array = array('A', 'B', 'C');
foreach($array as $key => &$value) {
  $value = $key;
}

foreach($array as $item) {
  echo $item;
}
// Resultado: 0 1 2
?>
{% endhighlight %}

Ao trabalhar com referência utilizando a estrutura foreach, fique atento caso faça uma segunda iteração como realizada nos scripts acima, como você pode perceber eu não utilizei o mesmo nome de variável para receber o valor, pois gera um bug, repetindo o penúltimo item duas vezes, no caso no lugar do último, confira:

{% highlight php %}
<?php
$array = array('A', 'B', 'C');
foreach($array as $key => &$value) {
  $value = $key;
}
 
foreach($array as $value) {
  echo $value;
}
// Resultado: 0 1 1
?>
{% endhighlight %}

Todas as estruturas de repetições podem ser interrompidas ao utilizar o comando break, também podemos ignorar determinadas execuções de blocos de código utilizando o comando continue antes das instruções.

## Entendendo o break e continue

**break** – O comando break termina a execução de uma estrutura de repetição ou switch.

Este comando aceita um argumento númerico opcional, que informa quantas estruturas aninhadas devem ser finalizadas, ou seja, caso tenha um estrutura de repetição dentro de outra e seja necessário interromper as duas, basta utilizar break 2;

{% highlight php %}
<?php
$firstArray = array(1, 2, 3, 4, 5);
$secondArray = array('A', 'B', 'C', 'D', 'E');
 
foreach ($firstArray as $number) {
  echo "{$number}: ";
  foreach($secondArray as $letter) {
    if($number == 3 && $letter == 'C') {
      break;
    }
    echo "{$letter} ";
  }
  echo PHP_EOL . "<br />";
}
// Resultado:
// 1: A B C D E
// 2: A B C D E
// 3: A B
// 4: A B C D E
// 5: A B C D E
 
echo PHP_EOL . "<br />";
 
foreach ($firstArray as $number) {
  echo "{$number}: ";
  foreach($secondArray as $letter) {
    if($number == 3 && $letter == 'C') {
      break 2;
    }
    echo "{$letter} ";
  }
  echo PHP_EOL . "<br />";
}
// Resultado:
// 1: A B C D E
// 2: A B C D E
// 3: A B
?>
{% endhighlight %}

**continue** – O comando continue é utilizado em estruturas de repetição para pular o restante de instruções de um bloco de código em execução, indo para próxima iteração.

Este comando aceita um argumento númerico opicional, que informa quantas iterações devem ser ignoradas, por exemplo: continue 2, irá pular duas iterações, começando pela iteração atual.

{% highlight php %}
<?php
$firstArray = array(1, 2, 3, 4, 5);
$secondArray = array('A', 'B', 'C', 'D', 'E');
 
foreach ($firstArray as $number) {
  echo "{$number}: ";
  foreach($secondArray as $letter) {
    if($number == 3 && $letter == 'C') {
      continue;
    }
    echo "{$letter} ";
  }
  echo PHP_EOL . "<br />";
}
// Resultado:
// 1: A B C D E
// 2: A B C D E
// 3: A B D E
// 4: A B C D E
// 5: A B C D E
 
echo PHP_EOL . "<br />";
 
foreach ($firstArray as $number) {
  echo "{$number}: ";
  foreach($secondArray as $letter) {
    if($number == 3 && $letter == 'C') {
      echo PHP_EOL . "<br />";
      continue 2;
    }
    echo "{$letter} ";
  }
  echo PHP_EOL . "<br />";
}
// Resultado:
// 1: A B C D E
// 2: A B C D E
// 3: A B
// 4: A B C D E
// 5: A B C D E
?>
{% endhighlight %}

## Sintaxe alternativa

Uma dica para quem está iniciando é dar uma olhada nas sintaxes alternativas das estruturas de controle do PHP, que permitem, por exemplo, mesclar códigos PHP com blocos de códigos HTML, ótimo para manipular informações na criação dos scripts de visão.

{% highlight php %}
<?php $array = array(1, 2, 3, 4, 5); ?>

<?php foreach($array as $item): ?>
<div><?php echo $item; ?></div>
<?php endforeach; ?>
{% endhighlight %}

## Referência(s)

- [Documentação oficial, estruturas de controle](http://php.net/manual/pt_BR/language.control-structures.php)