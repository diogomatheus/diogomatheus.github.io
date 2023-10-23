---
image: "assets/images/posts/shared-image/2011-10-10-php-operators.jpg"
i18n: "PHP - operators"
title: "PHP - Operadores"
slug: "php-operadores"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/trabalhando-com-operadores-no-php/"
---
Operadores são utilizados para realizar operações em um ou mais operandos, na maioria dos casos os operadores são binários(utilizados com dois operandos), retornando um valor final, certos operadores possuem prioridade sobre outros, por exemplo, ao utilizar na mesma sequência de cálculos, uma soma seguida por uma multiplicação, $a = 2 + 2 * 3, primeiro será realizado o cálculo da multiplicação, para depois efetuar a soma, chamamos isso de [precedência de operadores](http://www.php.net/manual/pt_BR/language.operators.precedence.php), mas podemos priorizar uma determinada operação utilizando parenteses, por exemplo: $a = (2 + 2)  * 3, nesse caso primeiro será realizado a soma para depois efetuar a multiplicação.

No PHP os operadores são dividos em algumas categorias:

- Operadores aritméticos
- Operadores de incremento/decremento
- Operadores lógicos
- Operadores de comparação
- Operadores de array
- Operadores de string
- Operadores de atribuição
- Operador de controle de erro
- Operador de execução
- Operador de tipo
- Operadores bitwise

Seguiremos a ordem da lista acima e daremos foco aos operadores mais utilizados, não iremos estudar os operadores bitwise, devido a sua complexidade, deixaremos para outro artigo.

Operadores aritméticos

Através dos operadores aritméticos podemos realizar as operações matemáticas básicas, como adição, subtração, multiplicação e divisão, confira na tabela abaixo:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Exemplo</th>
        <th scope="col">Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Negação</td>
        <td>-$a</td>
        <td>Oposto de $a.</td>
      </tr>
      <tr>
        <td>Adição</td>
        <td>$a + $b</td>
        <td>Soma de $a e $b.</td>
      </tr>
      <tr>
        <td>Subtração</td>
        <td>$a – $b</td>
        <td>Diferença entre $a e $b.</td>
      </tr>
      <tr>
        <td>Multiplicação</td>
        <td>$a * $b</td>
        <td>Produto de $a e $b.</td>
      </tr>
      <tr>
        <td>Divisão</td>
        <td>$a / $b</td>
        <td>Quociente de $a por $b.</td>
      </tr>
      <tr>
        <td>Módulo</td>
        <td>$a % $b</td>
        <td>Resto de $a dividido por $b.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight php %}
<?php
$a = 2;
$b = 5;
 
$negacao = -$a;
// Resultado: -2
 
$adicao = $a + $b;
// Resultado: 7
 
$subtracao = $b - $a;
// Resultado: 3
 
$multiplicacao = $b * $a;
// Resultado: 10
 
$divisao = $b / $a;
// Resultado: 2.5
 
$modulo = $b % $a;
// R
{% endhighlight %}

Operandos de módulo são convertidos para inteiros (removendo a parte decimal) antes de processar, sendo assim, 90.75 % 1 = 0.

## Operadores de incremento/decremento

PHP oferece operadores de incremento(++) e decremento(–), parecidos com os que são utilizados na linguagem C, esses operadores tem como objetivo respectivamente somar um(+1) e subtrair um(-1), confira na tabela abaixo:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Exemplo</th>
        <th scope="col">Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Pré-incremento</td>
        <td>++$a</td>
        <td>Incrementa $a em um, retorna $a.</td>
      </tr>
      <tr>
        <td>Pós-incremento</td>
        <td>$a++</td>
        <td>Retorna $a, depois incrementa em um.</td>
      </tr>
      <tr>
        <td>Pré-decremento</td>
        <td>–$a</td>
        <td>Decrementa $a em um, retorna $a.</td>
      </tr>
      <tr>
        <td>Pós-decremento</td>
        <td>$a–</td>
        <td>Retorna $a, depois decrementa em um.</td>
      </tr>
    </tbody>
  </table>
</div>

Como podemos perceber na tabela, a posição em que estes operadores são colocados(antes ou após o operando) faz diferença em alguns casos, principalmente quando utilizados para retornar um valor em funções, veja o exemplo abaixo:

{% highlight php %}
<?php
$a = 2;
 
$pre_incremento = ++$a;
// Resultado: $pre_incremento = 3, $a = 3
$pos_incremento = $a++;
// Resultado: $pos_incremento = 3, $a = 4
 
$pre_decremento = --$a;
// Resultado: $pre_decremento = 3, $a = 3
$pos_decremento = $a--;
// Resultado: $pos_decremento = 3, $a = 2
?>
{% endhighlight %}

Curiosidades sobre os operadores de incremento/decremento:

- Não faz efeito em valores booleanos
- Somente o operador de incremento faz efeito em valores NULL ou letras
- Ao utilizar o operador de incremento em letras, o valor retornado segue a ordem do alfabeto
- Após a letra Z vem AA

## Operadores lógicos

Os operadores lógicos são utilizados para conectar dois valores booleans e obter um terceiro valor boolean dependendo dos dois primeiros. Existem 4 operadores lógicos no PHP, onde três são binários(utilizam dois operandos) e apenas um é unário(utiliza apenas um operando), que é o operador lógico NOT, identificado por um simples ponto de exclamação( ! ) precendendo o operando.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Exemplo</th>
        <th scope="col">Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>E</td>
        <td>$a and $b</td>
        <td>true se $a e $b são true.</td>
      </tr>
      <tr>
        <td>OU</td>
        <td>$a or $b</td>
        <td>true se $a ou $b são true.</td>
      </tr>
      <tr>
        <td>XOR</td>
        <td>$a xor $b</td>
        <td>true se $a ou $b forem true, mas não os dois.</td>
      </tr>
      <tr>
        <td>NÃO</td>
        <td>!$a</td>
        <td>true se $a é false.</td>
      </tr>
      <tr>
        <td>E</td>
        <td>$a && $b</td>
        <td>true se $a e $b são true.</td>
      </tr>
      <tr>
        <td>OU</td>
        <td>$a || $b</td>
        <td>true se $a ou $b são true.</td>
      </tr>
    </tbody>
  </table>
</div>

É importante entender que todos operadores lógicos só funcionam com valores do tipo boolean, caso seja passado um valor de outro tipo(o que é comum) o PHP irá converter esse valor para boolean antes de realizar qualquer operação, logo é importante dominar os tipos de dados no php.

O PHP utiliza uma estratégia muito simples ao utilizar o operador lógico AND, sempre que o operando esquerdo, que pode ser um valor ou expressão retornar false, a operação irá retornar false imediatamente, pois independente do valor do operando direito está operação será false, isso é de grande valor para construir boas estruturas lógicas, já que em muitos casos o operando direito depende do operando esquerdo, logo não faz sentido iniciar a avaliação do mesmo.

A razão para as duas variantes dos operandos AND e OR é que eles operam com [precedências diferentes](https://www.php.net/manual/pt_BR/language.operators.precedence.php).

## Operadores de comparação

Os operadores de comparação são utilizados para comparar dois valores, onde podemos verificar se um valor é igual à outro, maior, menor, etc. É interessante dar uma olhada na [tabela de comparação de tipos](http://www.php.net/manual/pt_BR/types.comparisons.php) no php, para evitar possíveis erros ou pegadinhas caso você esteja estudando para prova de certificação.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Exemplo</th>
        <th scope="col">Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Igual</td>
        <td>$a == $b</td>
        <td>true se $a é igual a $b.</td>
      </tr>
      <tr>
        <td>Idêntico</td>
        <td>$a === $b</td>
        <td>true se $a é igual a $b e são do mesmo tipo.</td>
      </tr>
      <tr>
        <td>Diferente</td>
        <td>$a != $b</td>
        <td>true se $a não é igual a $b.</td>
      </tr>
      <tr>
        <td>Diferente</td>
        <td>$a <> $b</td>
        <td>true se $a não é igual a $b.</td>
      </tr>
      <tr>
        <td>Não idêntico</td>
        <td>$a !== $b</td>
        <td>true se $a não é igual a $b e/ou não são do mesmo tipo.</td>
      </tr>
      <tr>
        <td>Menor que</td>
        <td>$a < $b</td>
        <td>true se $a é menor que $b.</td>
      </tr>
      <tr>
        <td>Maior que</td>
        <td>$a > $b</td>
        <td>true se $a é maior que $b.</td>
      </tr>
      <tr>
        <td>Menor ou igual</td>
        <td>$a <= $b</td>
        <td>true se $a é menor ou igual a $b.</td>
      </tr>
      <tr>
        <td>Maior ou igual</td>
        <td>$a >= $b</td>
        <td>true se $a é maior ou igual a $b.</td>
      </tr>
    </tbody>
  </table>
</div>

Se você comparar um inteiro com uma string, a string será convertida para um valor numérico. Se você comparar 2 strings numéricas, elas serão comparadas como inteiras.

## Operadores de array

Alguns dos operadores apresentados anteriormente funcionam de outra maneira quando aplicados em arrays, por isso é importante tomar cuidado, confira os operadores de array.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Exemplo</th>
        <th scope="col">Resultado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>União</td>
        <td>$a + $b</td>
        <td>União de $a e $b.</td>
      </tr>
      <tr>
        <td>Igualdade</td>
        <td>$a == $b</td>
        <td>true se $a e $b tem os mesmos pares de chave/valor.</td>
      </tr>
      <tr>
        <td>Identidade</td>
        <td>$a === $b</td>
        <td>true se $a e $b tiverem pares de chave/valor, ordem e tipo iguais.</td>
      </tr>
      <tr>
        <td>Desigualdade</td>
        <td>$a != $b</td>
        <td>true se $a não é igual a $b.</td>
      </tr>
      <tr>
        <td>Desigualdade</td>
        <td>$a <> $b</td>
        <td>true se $a não é igual a $b.</td>
      </tr>
      <tr>
        <td>Não identidade</td>
        <td>$a !== $b</td>
        <td>true se $a não é identico a $b.</td>
      </tr>
    </tbody>
  </table>
</div>

O operador de união ( + ) acrescenta os elementos do array a direita no array da esquerda, contudo, chaves duplicadas NÃO são sobrescritas.

## Operadores de string

O PHP oferece dois operadores para trabalhar com strings, o primeiro e mais simples é o operador de concatenação ( . ), isso mesmo trata-se de um ponto. Este operador tem como objetivo unir(concatenar) o operando da esquerda com o operando da direita.

{% highlight php %}
<?php
echo 'Hello ' . 'World';
// Resultado: Hello World
 
echo 1 . 2;
// Resultado: 12
// PHP identifica os espaços entre os números e os converte para string
 
echo 1.2;
// Resultado: 1.2
// PHP identifica como um número real
?>
{% endhighlight %}

O segundo operador de strings é a combinação do operador de concatenação com o operador de atribuição, formando o operador ( .= ), que retorna o valor do operando da esquerda concatenado com o operando da direita, atribuindo o resultado no operando da esquerda, que normalmente é uma variável.

## Operadores de atribuição

O operador mais básico de atribuição é utilizado com o sinal de igual ( = ), que apesar de utilizar este sinal, não significa uma comparação, este operador indica que o operando da esquerda, normalmente uma variável, recebe o valor do operando da direita, que pode ser um valor único, uma expressão, etc.

{% highlight php %}
<?php
$a = 2;
$b = 'Diogo';
$c = array('preto', 'branco');
?>
{% endhighlight %}

Além do operador básico de atribuição, podemos realizar combinações com alguns operadores apresentados anteriormente, confira na tabela:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Exemplo</th>
        <th scope="col">Equivalente</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Atribuição e adição</td>
        <td>$a += $b</td>
        <td>$a = $a + $b</td>
      </tr>
      <tr>
        <td>Atribuição e subtração</td>
        <td>$a -= $b</td>
        <td>$a = $a – $b</td>
      </tr>
      <tr>
        <td>Atribuição e multiplicação</td>
        <td>$a *= $b</td>
        <td>$a = $a * $b</td>
      </tr>
      <tr>
        <td>Atribuição e divisão</td>
        <td>$a /= $b</td>
        <td>$a = $a / $b</td>
      </tr>
      <tr>
        <td>Atribuição e módulo</td>
        <td>$a %= $b</td>
        <td>$a = $a % $b</td>
      </tr>
      <tr>
        <td>Atribuição e concatenação</td>
        <td>$a .= $b</td>
        <td>$a = $a . $b</td>
      </tr>
    </tbody>
  </table>
</div>

## Operador de controle de erro

PHP oferece o operador ( @ ), isso mesmo o arroba, que é utilizado para ignorar mensagens de erro de uma determinada [expressão](https://www.php.net/manual/pt_BR/language.expressions.php), sua funcionalidade ocorre quando o operador precede uma expressão, deixando claro que não queremos mensagens de erros que possam ocorrer nessa expressão.

{% highlight php %}
<?php
@include("file.php");
?>
{% endhighlight %}

No exemplo acima, importamos o arquivo file.php utilizando a função include, que lança uma mensagem de warning se o arquivo não existir, nesse caso como utilizamos o operador de controle de erro, mesmo que o arquivo não exista, não será lançado nenhuma mensagem.

Caso o recurso track_errors estiver habilitado, qualquer mensagem de erro gerada pela expressão será gravada na variável $php_errormsg. Esta variável será sobrescrita a cada erro, assim verifique-a constantemente se você quiser usá-la.

## Operador de execução

O operador de execução ( `comando` ) possibilita executar comandos no servidor e retorna sua saída como uma string, sua funcionalidade é parecida com a função shell_exec(), porem em formato de operador.

{% highlight php %}
<?php
// Linux $output = `ls -al`;
echo $output;
 
// Windows $output = `dir`;
echo $output;
?>
{% endhighlight %}

Os comandos vão variar dependendo do sistema operacional do servidor, no exemplo acima o resultado será uma listagem de diretórios.

O operador de execução fica desabilitado quando o safe mode(modo de segurança) está ativado ou shell_exec() está desabilitado.

## Operador de tipo

PHP oferece um operador de tipo, instanceof, este operador é utilizado para verificar se uma variável é um objeto instânciado de uma determinada [classe](http://php.net/manual/pt_BR/language.oop5.basic.php).

{% highlight php %}
<?php
class Pessoa {}
class Animal {}
 
$a = new Pessoa();
 
var_dump($a instanceof Pessoa);
// Resultado: true
var_dump($a instanceof Animal);
// Resultado: false
?>
{% endhighlight %}

O operador instanceof também pode ser utilizado para verificar se uma variável é um objeto instânciado de uma classe que herda de uma classe pai ou se uma variável é um objeto instânciado de uma classe que implementa determinada interface.

{% highlight php %}
<?php
interface Pessoa {}
class Diogo implements Pessoa {}
 
class Animal {}
class Cachorro extends Animal {}
 
$a = new Diogo();
$b = new Cachorro();
 
var_dump($a instanceof Pessoa);
// Resultado: true
var_dump($b instanceof Animal);
// Resultado: true
?>
{% endhighlight %}