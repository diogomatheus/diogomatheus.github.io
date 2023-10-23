---
image: "assets/images/posts/shared-image/2010-05-06-getting-started-with-php.jpg"
i18n: "Getting started with PHP"
title: "Introdução ao PHP"
slug: "introducao-ao-php"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/introducao-ao-php/"
---
Criado por [Rasmus Lerdorf](https://toys.lerdorf.com/), PHP (Hypertext Preprocessor) é uma linguagem de programação de script, ou seja, o código desenvolvido com PHP não precisa ser compilado antes de ser executado. Geralmente, esse tipo de linguagem de programação é referenciado como linguagem interpretada, pois as instruções do código são "interpretadas" no momento da execução.

## Linguagens compiladas x interpretadas

Linguagens de programação compiladas (e.g., C#, Java) são caracterizadas pela etapa de compilação, onde o código desenvolvido é transformado para código de máquina (i.e., binário). Como benefício, podemos destacar sua velocidade de execução. Por outro lado, sua desvantagem está relacionada com o tempo de compilação prévio exigido, além da dependência da plataforma de máquina (i.e., binário) para o qual foi compilado.

Linguagens de programação interpretada (e.g., Ruby, JavaScript) são caracterizadas por não precisar da etapa de compilação, onde o código desenvolvido é interpretado na forma original no momento da execução. Como benefício, podemos destacar sua flexibilidade e independência da plataforma de máquina (i.e., binário). Por outro lado, sua desvantagem está na velocidade de execução quando comparada com linguagens compiladas.

## Propósito da linguagem

Embora seja uma linguagem de programação de propósito geral, o PHP está mais associado ao desenvolvimento web, ou seja, sistemas para internet visando ofertar conteúdo dinâmico. Neste cenário, conteúdo dinâmico significa ir além de servir textos e imagens estáticas na internet, sendo capaz também de executar ações específicas como interagir com banco de dados, etc.

## Sintaxe

O interpretador identifica o código PHP por meio de TAGs, dentre essas, as mais comuns são Standard e Short. Confira as TAGs disponíveis.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="standard-tab" data-toggle="tab" data-target="#standard-tabpanel" type="button" role="tab" aria-controls="standard-tabpanel" aria-selected="true">Standard</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="short-tab" data-toggle="tab" data-target="#short-tabpanel" type="button" role="tab" aria-controls="short-tabpanel" aria-selected="false">Short</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="script-tab" data-toggle="tab" data-target="#script-tabpanel" type="button" role="tab" aria-controls="script-tabpanel" aria-selected="false">Script</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="asp-tab" data-toggle="tab" data-target="#asp-tabpanel" type="button" role="tab" aria-controls="asp-tabpanel" aria-selected="false">ASP</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="standard-tabpanel" role="tabpanel" aria-labelledby="standard-tab">

{% highlight php %}
<?php
// Código
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="short-tabpanel" role="tabpanel" aria-labelledby="short-tab">

{% highlight php %}
<?
// Código
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="script-tabpanel" role="tabpanel" aria-labelledby="script-tab">

{% highlight php %}
<script language="php">
// Código
</script>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="asp-tabpanel" role="tabpanel" aria-labelledby="asp-tab">
  
{% highlight php %}
<%
// Código
%>
{% endhighlight %}

  </div>
</div>

Geralmente, os arquivos que armazenam código PHP usam as extensões (a) .php; e (b) .phtml. Porém, códigos antigos podem possuir extensões (I) .php3; e (II) .php4.

## Separador de instruções

O separador de instruções do PHP é o ponto e vírgula. Nesse cenário, não é recomendado alocar múltiplas instruções na mesma linha, pois dificulta o entendimento do código, i.e., leitura.

## Comentários

Existem dois tipos de comentários no PHP, o comentário de linha única e o comentário de múltiplas linhas, conforme pode ser observado nos exemplos a seguir.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="single-tab" data-toggle="tab" data-target="#single-tabpanel" type="button" role="tab" aria-controls="single-tabpanel" aria-selected="true">Linha única</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="multiple-tab" data-toggle="tab" data-target="#multiple-tabpanel" type="button" role="tab" aria-controls="multiple-tabpanel" aria-selected="false">Múltiplas linhas</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="single-tabpanel" role="tabpanel" aria-labelledby="single-tab">

{% highlight php %}
<?php
# Comentário
// Comentário
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="multiple-tabpanel" role="tabpanel" aria-labelledby="multiple-tab">

{% highlight php %}
<?php
/*
 * Primeira linha do comentário.
 * Segunda linha do comentário.
 */
?>
{% endhighlight %}

  </div>
</div>

## Hello World

Para não perder o costume da área, segue o famigerado exemplo de "Hello World".

{% highlight php %}
<?php echo 'Hello World'; ?>
{% endhighlight %}

Como resultado da execução, o texto "Hello World" será apresentado.

## Documentação oficial

A [documentação oficial](https://www.php.net/) do PHP é um dos seus pontos positivos, principalmente por se preocupar em ensinar de fato, algo que não era comum em documentações de linguagens de programação, frameworks, etc. Dessa forma, pela popularidade do PHP na internet, acredito que sua documentação influenciou positivamente o ecossistema de software.