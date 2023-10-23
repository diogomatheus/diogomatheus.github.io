---
image: "assets/images/posts/shared-image/2011-09-12-php-data-types.jpg"
i18n: "PHP - Data types"
title: "PHP - Tipos de dados"
slug: "php-tipos-de-dados"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/tipos-de-dados-no-php/"
---
PHP suporta diferentes tipos de dados, esses tipos são divididos em duas categorias, escalares e compostos.

Escalares:

- int
- float
- string
- boolean

Compostos:

- array
- object

Além dos tipos citados acima, existem dois tipos de dados especiais, resource e NULL.

## Valores numéricos

PHP reconhece dois tipos de dados numéricos, inteiros(int) e valores de ponto flutuante(float ou também conhecido como double).

## Tipo Int ( inteiro / integer )

Um número inteiro é constituído de números naturais {0, 1, 2, 3, …} e de seus simétricos {-1, -2, -3, …}, ou seja, signed, podendo conter valores positivos ou negativos.

Esses números podem seguir diferentes tipos de sistemas, confira na lista abaixo.

- Sistema Decimal – Ex: 20
- Sistema Octal – Ex: 0777
- Sistema Hexadecimal – Ex: 0x123

Caso você esteja estudando para tirar sua certificação, de uma olhada nas fórmulas utilizadas para conversão dos valores, principalmente octal para decimal e hexadecimal para decimal, pode ser que você precise analisar algum cálculo que envolva esses sistemas, melhor estar preparado.

## Tipo Float ( ponto flutuante / double )

Ponto flutuante (float ou double) é um formato de representação digital de números reais.

Os valores float podem seguir dois tipos de notação, confira:

- Decimal – Ex: 0.25
- Exponencial – Ex: 1e2

## Tipo String

Strings são coleções ordenadas de dados binário, mas para a maioria dos casos pode ser explicado como um conjunto de caracteres.

Podemos declarar uma string utilizando aspas simples ou aspas duplas, a grande diferença entre as opções é que quando declarada com aspas duplas o conteúdo da string será interpretado, ou seja, se tiver variáveis ou caracteres de escape em seu conteúdo, os mesmos serão substituídos pelos seus valores.

String utilizando aspas duplas

{% highlight php %}
<?php
$who = 'World';
echo "Hello $who";
// Resultado: Hello World
?>
{% endhighlight %}

Lista de caracteres de escape

- \n – fim de linha
- \r – retorno de carro(carriage return)
- \t – tab horizontal
- \v – tab vertical
- \f – form feed
- \\ – contra barra ou barra invertida
- \$ – sinal de cifrão
- \” – aspas duplas

String utilizando aspas simples

{% highlight php %}
<?php
$who = 'World';
echo 'Hello $who';
// Resultado: Hello $who
?>
{% endhighlight %}

O único caractere de escape que uma string utilizando aspas simples permite é para imprimir exatamente uma aspas simples.

{% highlight php %}
<?php
echo 'Joe\'s pizza';
// Resultado: Joe's pizza
?>
{% endhighlight %}

Utilize aspas simples sempre que possível pois seu processamento é mais rápido. Use aspas duplas somente quando for necessário interpretar valores em seu conteúdo.

## Tipo boolean

O tipo boolean só aceita dois valores, true e false, ou seja, verdadeiro e falso, geralmente é utilizado como base para operações lógicas.

{% highlight php %}
<?php
$boolean = true;
if ($boolean) {
  echo 'verdadeiro / true';
} else {
  echo 'falso / false';
}
// Resultado: verdadeiro / true
 
// Exemplo de valores verdadeiros
$var = true;
$var = 'texto';
$var = 1;
// Exemplo de valores falsos
$var = false;
$var = '';
$var = null;
$var = 0;
?>
{% endhighlight %}

No exemplo acima definimos uma variável, $boolean, com o valor true (verdadeiro), verificamos se(if) a variável $boolean é verdadeira, caso seja imprimimos uma string com valor: verdadeiro / true, caso contrário(else) imprimimos uma string com valor: falso / false, como definimos a variável como true, o resultado será a primeira opção.

## Tipos de dados compostos

Além dos tipos escalares que vimos agora, o PHP suporta dois tipos compostos, que são chamados assim pois são basicamente recipientes para os outros tipos de dados.

## Array

Arrays são recipientes de dados ordenados, um array pode ser usado para guardar e recuperar outros tipos de dados, inclusive outros arrays, não vou me aprofundar nesse assunto porque o tipo array merece um artigo só para ele.

{% highlight php %}
<?php
$data = new array('branco', 'amarelo', 'vermelho', 'azul');
echo $data[0];
// Resultado: branco
?>
{% endhighlight %}

No exemplo acima criamos um array de strings(uma coleção de cores) e imprimimos o primeiro item da coleção.

## Object

Objetos são recipientes de dados e código, eles formam a base da programação orientada a objeto.

{% highlight php %}
<?php
class Pessoa {
    private $nome;
    private $idade;
 
    public function getNome(){
        return $this->nome;
    }
    public function setNome($nome){
        $this->nome = $nome;
    }
 
    public function getIdade(){
        return $this->idade;
    }
    public function setIdade($idade){
        $this->idade = $idade;
    }
}
 
$dm = new Pessoa();
$dm->setNome('Diogo Matheus Costa');
?>
{% endhighlight %}

No exemplo acima criamos uma classe Pessoa e instanciamos um objeto da classe Pessoa na variável $dm, em seguida utilizamos um dos métodos da classe para informar o nome da pessoa. Assim como Array, esse tema também merece um artigo próprio.

## Tipos de dados especiais

## NULL

O tipo null indica que uma variável não possui valor, uma variável é considerada null quando ela é setada com o valor null ou ainda não foi instanciada.

Obs: O valor null é case insensitive, ou seja, tanto faz se informamos o valor de uma variável como null, NULL, NulL ou nuLL, mas é recomendado manter um padrão, tente utilizar null ou NULL.

## Resource

O tipo resource é utilizado para indicar recursos externos que não são utilizados nativamente pelo PHP, mas que têm significado no contexto de uma operação especial, como manipulação de arquivos e imagens.

## Funções para validar o tipo de uma variável

PHP oferece algumas funções para validar o tipo de uma variável, retornando um valor boolean, true ou false, confira:

- isset – Informa se a variável foi iniciada.
- is_array – Verifica se a variável é um array.
- is_bool – Verifica se a variável é um boolean.
- is_float – Verifica se a variável é um float.
- is_int – Verifica se a variável é um inteiro.
- is_null – Verifica se a variável é NULL.
- is_numeric – Verifica se a variável é um número ou uma string numérica.
- is_object – Verifica se a variável é um objeto.
- is_resource – Verifica se a variável é um resource.
- is_escalar – Verifica se é uma variável escalar.
- is_string – Verifica se a variável é uma string.

{% highlight php %}
<?php
$var = 'texto';
echo is_string($var);
// Resultado: 1(true)
?>
{% endhighlight %}

## Função gettype

A função gettype é utilizada para identificar qual o tipo de uma variável, diferente das funções acima que verificam se uma variável é de um determinado tipo retornando um boolean, essa função retorna uma string contendo o tipo da variável.

{% highlight php %}
<?php
$var = 'texto';
echo gettype($var);
// Resultado: string
?>
{% endhighlight %}