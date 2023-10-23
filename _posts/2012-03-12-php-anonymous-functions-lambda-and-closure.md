---
image: "assets/images/posts/shared-image/2012-03-12-php-anonymous-functions-lambda-and-closure.jpg"
i18n: "PHP - Anonymous functions (lambda and closure)"
title: "PHP - Funções anônimas (lambda e closure)"
slug: "php-funcoes-anonimas-lambda-e-closure"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/funcoes-anonimas-lambda-e-closure-no-php/"
---
Uma função anônima é qualquer função que não possui ou não precise de um nome identificador, estas funções podem ser definidas em qualquer lugar e normalmente são atribuídas a uma variável e/ou utilizadas como callback.

Conceitualmente temos dois tipos de funções anônimas, lambda e closures que estão disponíveis a partir da versão 5.3 do PHP.

## Lambda

Lambda é uma função anônima básica, muitas linguagens não utilizam esse termo, apenas chamam de função anônima, mas particularmente costumo utilizar, pois a função [create_function](http://php.net/manual/en/function.create-function.php), que está disponível desde a versão 4 do PHP, cria funções anônimas a um bom tempo, sendo assim para diferenciar costumo chamar este novo estilo de lambda, confira a sintaxe de uma lambda.

{% highlight plaintext %}
$var = function ( parameters ) { statement };
{% endhighlight %}

Lambdas são mais rápidas que funções criadas utilizando a função create_function.

## Closure

Closures são funções anônimas um pouco mais complexas que as lambdas, pois permitem interações com variáveis externas, ou seja, variáveis que foram definidas no mesmo escopo em que o closure foi definido, para isso utilizamos a palavra-chave use, informando as variáveis externas que iremos interagir entre parênteses.

{% highlight plaintext %}
$var = function ( parameters ) use ( variables ) { statement };
{% endhighlight %}

É importante finalizar a declaração de uma lambda ou closure com ponto e vírgula após as chaves.

## Método mágico __invoke()

O PHP oferece um conjunto de [métodos mágicos](http://php.net/manual/pt_BR/language.oop5.magic.php) que podem ser utilizados quando necessário em uma classe e são executados quando um determinado comportamento é solicitado.

O método mágico __invoke() foi adicionado na versão 5.3 do PHP, sendo este executado quando tentamos chamar um objeto como uma função.

{% highlight php %}
<?php
class Logger {
  public function __invoke($message) {
    echo $message;
  }
}
 
$log = new Logger();
$log('Hello World');
// Resultado: Hello World
?>
{% endhighlight %}

## Trabalhando com lambda e closure

Agora que conhecemos um pouco sobre funções anônimas, vamos praticar.

{% highlight php %}
<?php
// Simulation configuration
$config['uppercase'] = true;
 
$lambda = function ($first, $second) {
  return $first + $second;
};
 
$result_lambda = $lambda(2, 3);
echo $result_lambda;
// Resultado: 5
 
$closure = function ($message) use ($config) {
  if(isset($config['uppercase']) && $config['uppercase'] == true) {
    $message = strtoupper($message);
  }
  return $message;
};
 
$result_closure =  $closure('Hello world');
echo $result_closure;
// Resultado: HELLO WORLD
 
// Using as a callback
function firstWord($message, $callback) {
  $parts = explode(' ', $message);
  return $callback($parts[0]);
}
 
$result_callback = firstWord('Hello World', $closure);
echo $result_callback;
// Resultado: HELLO
?>
{% endhighlight %}

Começamos o script acima simulando um array de configurações, em seguida criamos uma lambda, para calcular a soma entre dois parâmetros, atribuindo a variável $lambda.

Após testar a lambda, definimos um closure que recebe uma mensagem e interage com o array de configurações($config) para padronizar como está mensagem deve ser exibida, com isso, não precisamos passar as configurações como parâmetro toda vez que a função/closure for utilizada, em seguida testamos o closure.

Por último criamos uma função que recebe dois parâmetros, o primeiro uma mensagem, já o segundo um callback, ou seja, uma função que deve ser chamada antes de retornar o resultado, sendo assim ao executar a função firstWord passamos a mensagem como primeiro parâmetro e como segundo parâmetro enviamos a variável $closure, que antes de retornar o resultado é executada.

## Referência(s)

- http://php.net/manual/pt_BR/functions.anonymous.php
- http://stackoverflow.com/questions/150129/what-is-a-lambda
- http://stackoverflow.com/questions/220658/what-is-the-difference-between-a-closure-and-a-lambda