---
image: "assets/images/posts/shared-image/2015-02-23-setting-up-php-applications-charset.jpg"
i18n: "Setting up PHP applications' charset"
title: "Configurando charset de aplicações PHP"
slug: "configurando-charset-de-aplicacoes-php"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/configurando-charset-de-uma-aplicacao-php/"
---
Imagine que você está desenvolvendo uma aplicação para internet em seu ambiente local, chegou o dia de colocar o sistema em produção, um servidor compartilhado, hospedagem. Além de verificar se está tudo de acordo com as funcionalidades, uma das preocupações neste cenário é analisar se o charset está devidamente configurado na aplicação e banco de dados.

## O que é charset?

Charset, Character Set, é o conjunto de caracteres que são utilizados para criação de documentos, bancos de dados, sites, etc. Cada charset possui uma lista de caracteres disponíveis, sendo estes representados por uma posição de referência.

Confira alguns caracteres disponíveis no charset ASCII.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Posição</th>
        <th scope="col">Caractere</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>65</td>
        <td>A</td>
      </tr>
      <tr>
        <td>66</td>
        <td>B</td>
      </tr>
      <tr>
        <td>67</td>
        <td>C</td>
      </tr>
      <tr>
        <td>68</td>
        <td>D</td>
      </tr>
      <tr>
        <td>69</td>
        <td>E</td>
      </tr>
      <tr>
        <td>70</td>
        <td>F</td>
      </tr>
    </tbody>
  </table>
</div>

## Qual é a importância do charset?

O charset de um documento, indica ao browser, navegador, qual codificação foi utilizada, possibilitando que o documento seja interpretado, exibindo suas informações corretamente ao usuário. Caso exista algum tipo de incompatibilidade entre o conteúdo, charset declarado e charset utilizado para salvar o documento no seu editor, exemplo Eclipse, isso poderá comprometer sua exibição, gerando possíveis problemas, como erro na codificação do documento ou caracteres incorretos sendo exibidos na aplicação.

## Configurando charset de uma aplicação PHP

Existem 127 charsets disponíveis para uso na internet, onde os mais utilizados são ISO-8859-1 e UTF-8, se você está desenvolvendo algum conteúdo, terá que decidir qual codificação irá utilizar. O charset UTF-8 é uma recomendação, pois cobre quase todos os caracteres e símbolos do mundo, confira os passos recomendados para configurar o charset de sua aplicação.

Recomendações para configurar o navegador

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="php-tab" data-toggle="tab" data-target="#php-tabpanel" type="button" role="tab" aria-controls="php-tabpanel" aria-selected="true">Script PHP</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="html-tab" data-toggle="tab" data-target="#html-tabpanel" type="button" role="tab" aria-controls="html-tabpanel" aria-selected="false">Metatag HTML</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="form-tab" data-toggle="tab" data-target="#form-tabpanel" type="button" role="tab" aria-controls="form-tabpanel" aria-selected="false">Formulário</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="php-tabpanel" role="tabpanel" aria-labelledby="php-tab">
    <p>Informar o charset no início do script, junto ao tipo do conteúdo, nesse caso HTML.</p>

{% highlight php %}
<?php header("Content-type: text/html; charset=utf-8"); ?>
{% endhighlight %}
    
  </div>
  <div class="tab-pane" id="html-tabpanel" role="tabpanel" aria-labelledby="html-tab">
    <p>Informar o charset por meio de metatag no cabeçalho da página HTML.</p>

{% highlight html %}
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
{% endhighlight %}

  </div>
  <div class="tab-pane" id="form-tabpanel" role="tabpanel" aria-labelledby="form-tab">
    <p>Informar o charset na declaração do(s) formulário(s).</p>

{% highlight html %}
<form accept-charset="utf-8" ...>
{% endhighlight %}

  </div>
</div>

Recomendações para configurar o banco de dados

Verificar se as tabelas e campos de caracteres estão configurados para utilizar coleção utf8_general_ci, além de informar o charset ao abrir conexão com banco de dados.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="mysql-tab" data-toggle="tab" data-target="#mysql-tabpanel" type="button" role="tab" aria-controls="mysql-tabpanel" aria-selected="true">Conexão MySQL</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pdo-tab" data-toggle="tab" data-target="#pdo-tabpanel" type="button" role="tab" aria-controls="pdo-tabpanel" aria-selected="false">Conexão PDO</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="zf2-tab" data-toggle="tab" data-target="#zf2-tabpanel" type="button" role="tab" aria-controls="zf2-tabpanel" aria-selected="false">Conexão ZF2</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="mysql-tabpanel" role="tabpanel" aria-labelledby="mysql-tab">
    <p>Informar o charset através da função mysql_set_charset.</p>

{% highlight php %}
<?php mysql_set_charset('utf8'); ?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="pdo-tabpanel" role="tabpanel" aria-labelledby="pdo-tab">
    <p>Informar o charset na abertura da conexão.</p>

{% highlight php %}
<?php
$handler = new PDO(
  "mysql:host=localhost;dbname=dbname",
  'username',
  'password',
  array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
);
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="zf2-tabpanel" role="tabpanel" aria-labelledby="zf2-tab">
    <p>Informar o charset através da opção driver_options, no global.php.</p>

{% highlight php %}
<?php
return array(
  'db' => array(
    'driver' => 'Pdo',
    'dsn' => 'mysql:dbname=dbname;host=localhost',
    'driver_options' => array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'),
  )
);
?>
{% endhighlight %}

  </div>
</div>

## Conclusão

Espero que vocês economizem um pouco do tempo que passei ao pesquisar esse tema, apesar do artigo ter foco em uma aplicação PHP, os passos são semelhantes em outros cenários.

## Referência(s)

- [**UTF-8, PHP and MySQL**](http://akrabat.com/php/utf8-php-and-mysql/). Allen, Rob.
- [**Character Sets and Encodings**](http://www.w3.org/International/getting-started/characters). W3.