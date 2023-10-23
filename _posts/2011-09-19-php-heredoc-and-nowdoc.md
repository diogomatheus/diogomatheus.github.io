---
image: "assets/images/posts/shared-image/2011-09-19-php-heredoc-and-nowdoc.jpg"
i18n: "PHP - heredoc and nowdoc"
title: "PHP - Heredoc e nowdoc"
slug: "php-heredoc-e-nowdoc"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/heredoc-e-nowdoc/"
---
Heredoc e Nowdoc são duas formas de representar strings em PHP, mantendo a quebra de linha e espaço presente no conteúdo de um texto, o que facilita a criação de strings complexas.

## Heredoc

Uma string Heredoc tem funcionalidade parecida com strings criadas utilizando aspas duplas, ou seja, interpreta variáveis e caracteres de escape, sua declaração é delimitada pelo operador <<<, seguido por um identificador, que deve utilizar as mesmas regras de nomenclatura de uma variável, exceto pelo uso do $, que nesse caso é substituído pelo operador <<<. Para finalizar uma string Heredoc devemos criar uma linha contendo apenas o identificador, sem o operador <<<, seguido por ponto e vírgula ( ; ).

{% highlight php %}
<?php
$who = 'World';
echo <<<HEREDOC
Hello $who
Linha 2 heredoc
HEREDOC;
/*
* Hello World
* Linha 2 heredoc
*/
?>
{% endhighlight %}

## Nowdoc

A notação Nowdoc, que está disponível a partir da versão 5.3 do PHP, é semelhante à Heredoc, tendo sua funcionalidade parecida com strings criadas utilizando aspas simples, ou seja, o texto declarado em uma Nowdoc não é interpretado, não sendo possível utilizar variáveis nem caracteres de escape em seu conteúdo.

A sintaxe é praticamente idêntica à Heredoc, exceto que o identificador usado no início da string deve ser delimitado por aspas simples. O delimitador de fim, por sua vez, continua sem as aspas simples.

{% highlight php %}
<?php
$who = 'World';
echo <<<'NOWDOC'
Hello $who
Linha 2 nowdoc
NOWDOC;
/*
* Hello $who
* Linha 2 nowdoc
*/
?>
{% endhighlight %}

Resumindo, quando precisar de uma string complexa que precise ser interpretada, utilize Heredoc, se esse não é o caso e for necessário apenas imprimir um conteúdo complexo sem interpretá-lo, utilize Nowdoc.

A linha que indica o término de um bloco Heredoc ou Nowdoc não pode ser indentada, ou seja, se você está em um nível de indentação, pode usar Heredoc ou Nowdoc, mas precisa colocar o identificador de término sem indentação.

{% highlight php %}
<?php
  $nowdoc = <<<'IDENTIFICADOR'
  Linha 1
  Linha 2
IDENTIFICADOR;
 
  echo $nowdoc;
?>
{% endhighlight %}

## Trabalhando com Heredoc e Nowdoc

Agora que conhecemos um pouco sobre heredoc e nowdoc, vamos criar um exemplo que será executado no console, uma lista de filmes, um exemplo simples para demonstrar como esses recursos podem ser úteis, economizando quebras de linhas e concatenações desnecessárias.

{% highlight php %}
<?php
$data = array(
  'Título 1' => array(
    'description' => 'descrição do filme 1.',
    'year' => 2010
  ),
  'Título 2' => array(
    'description' => 'descrição do filme 2.',
    'year' => 2008
  ),
  'Título 3' => array(
    'description' => 'descrição do filme 3.',
    'year' => 2011
  )
);
 
echo <<<'NOWDOC'
---------------------------------------------------
#Lista de filmes
---------------------------------------------------

NOWDOC;

echo PHP_EOL;

foreach($data as $title => $info) {
  echo <<<HEREDOC
Título: {$title}
Ano: {$info['year']}
Descrição: {$info['description']}
---------------------------------------------------
HEREDOC;
 
  echo PHP_EOL;
}
?>
{% endhighlight %}

Você pode estar se perguntando o que significa PHP_EOL.

PHP_EOL é uma constante reservada do PHP, que tem como finalidade a quebra de linha, o detalhe é que essa quebra de linha será funcional independente da plataforma em que você estiver rodando a aplicação, ou seja, tanto no Linux(\n) quanto no Windows(\r\n).

EOL significa End Of Line, a quebra de linha no código-fonte é útil por exemplo para indentá-lo corretamente.

## Resultado

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-09-19-heredoc-nowdoc.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução</figcaption>
</figure>

Caso este script seja executado no browser, o resultado exibido será diferente, sem quebra de linha, porque a quebra de linha no browser funciona utilizando <br />, mas olhando o código fonte da página veremos que o mesmo foi construído corretamente no mesmo padrão do console.