---
image: "assets/images/publication/2010-05-06-getting-started-with-php.jpg"
i18n: "Getting started with PHP"
title: "Introdução ao PHP"
slug: "introducao-ao-php"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/introducao-ao-php/"
---
PHP é o acrônimo de "Hypertext Preprocessor", uma linguagem de programação de script, ou seja, o código desenvolvido com PHP não precisa ser compilado antes de ser executado. Geralmente, esse tipo de linguagem de programação é referenciado como linguagem interpretada, pois o código desenvolvido nessas linguagens são "interpretados" no momento da execução.

## Linguagens compiladas x interpretadas

Linguagens de programação compiladas (e.g., C#, Java) são caracterizadas pela etapa de compilação, onde o código desenvolvido é transformado para código de máquina (i.e., binário). Como benefício, podemos destacar sua velocidade de execução. Por outro lado, sua desvantagem está relacionada com o tempo de compilação prévio exigido, além da dependência da plataforma de máquina (i.e., binário) para o qual foi compilado.

Linguagens de programação interpretada (e.g., Ruby, JavaScript) são caracterizadas por não precisar da etapa de compilação, onde o código desenvolvido é interpretado na forma original no momento da execução. Como benefício, podemos destacar sua flexibilidade e independência de plataforma. Por outro lado, sua desvantagem está na velocidade de execução quando comparada com linguagens compiladas.

## Propósito da linguagem

Embora seja uma linguagem de programação de propósito geral, o PHP está mais relacionado ao desenvolvimento web, ou seja, sistemas para internet visando ofertar conteúdo dinâmico. Neste cenário, conteúdo dinâmico significa ir além de servir textos e imagens estáticas na internet, sendo capaz também de executar ações específicas como interagir com banco de dados, etc.

## Sintaxe

O interpretador identifica o código PHP por meio de TAGs, dentre essas, as mais comuns são Standard e Short. Confira as TAGs disponíveis.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="standard-tab" data-toggle="tab" data-target="#standard" type="button" role="tab" aria-controls="standard" aria-selected="true">Standard</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="short-tab" data-toggle="tab" data-target="#short" type="button" role="tab" aria-controls="short" aria-selected="false">Short</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="script-tab" data-toggle="tab" data-target="#script" type="button" role="tab" aria-controls="script" aria-selected="false">Script</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="asp-tab" data-toggle="tab" data-target="#asp" type="button" role="tab" aria-controls="asp" aria-selected="false">ASP</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="standard" role="tabpanel" aria-labelledby="standard-tab">
{% highlight php %}
<?php echo 'Hello WorldA'; ?>
{% endhighlight %}
  </div>
  <div class="tab-pane" id="short" role="tabpanel" aria-labelledby="short-tab">
{% highlight php %}
<?php echo 'Hello WorldB'; ?>
{% endhighlight %}
  </div>
  <div class="tab-pane" id="script" role="tabpanel" aria-labelledby="script-tab">
{% highlight php %}
<?php echo 'Hello WorldC'; ?>
{% endhighlight %}
  </div>
  <div class="tab-pane" id="asp" role="tabpanel" aria-labelledby="asp-tab">
{% highlight php %}
<?php echo 'Hello WorldD'; ?>
{% endhighlight %}
  </div>
</div>

Geralmente, os arquivos que armazenam código PHP usam as extensões (a) .php; e (b) .phtml. Porém, códigos antigos podem possuir extensões (I) .php3 e (II) .php4.

## Separador de instruções

O separador de instruções do PHP é o ponto e vírgula. Embora seja possível, não é recomendado colocar múltiplas instruções em apenas uma linha pois dificulta o entendimento do código, i.e., leitura.

## Comentários

Existem dois tipos de comentários no PHP, o comentário de linha única e o comentário de múltiplas linhas, conforme pode ser observado nos exemplos a seguir.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="single-tab" data-toggle="tab" data-target="#single" type="button" role="tab" aria-controls="single" aria-selected="true">Linha única</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="multiple-tab" data-toggle="tab" data-target="#multiple" type="button" role="tab" aria-controls="multiple" aria-selected="false">Múltiplas linhas</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="single" role="tabpanel" aria-labelledby="single-tab">
{% highlight php %}
<?php echo 'Hello WorldA'; ?>
{% endhighlight %}
  </div>
  <div class="tab-pane" id="multiple" role="tabpanel" aria-labelledby="multiple-tab">
```php
<?php echo 'Hello World'; ?>
```
  </div>
</div>

## Hello World

Para não perder o costume da área, o primeiro texto do site precisa do famigerado exemplo de "Hello World".

```php
<?php echo 'Hello World'; ?>
```

Como resultado da execução do código, o texto "Hello World" será apresentado.

{% highlight php %}
<?php echo 'Hello WorldB'; ?>
{% endhighlight %}

## Documentação oficial

A [documentação oficial](https://www.php.net/) do PHP é um dos seus principais pontos positivos. Não era algo comum encontrar documentações de linguagens de programação preocupadas em ensinar de fato. Dessa forma, pela popularidade do PHP na internet, acredito que sua documentação influenciou o ecossistema de software como um todo, e.g., linguagens de programação, frameworks, etc.