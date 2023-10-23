---
image: "assets/images/posts/shared-image/2013-02-06-synchronous-and-asynchronous-requests.jpg"
i18n: "Synchronous and asynchronous requests"
title: "Requisições síncronas e assíncronas"
slug: "requisicoes-sincronas-e-assincronas"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/requisicoes-sincronas-e-assincronas/"
---
No ambiente cliente-servidor, nossas aplicações trabalham através de requisições e respostas, onde o cliente (Ex: Navegador) envia uma requisição e o servidor, local onde está nossa aplicação, retorna uma resposta, nesse processo existem diversas etapas, mas o objetivo deste artigo não é abordar cada estado de uma requisição, nesse momento vamos entender como funciona uma requisição utilizando comunicação síncrona e assíncrona.

## Tipos de requisição

Síncrona

Quando uma requisição é enviada, o processo remetente é bloqueado até que ocorra uma resposta, ou seja, não é possível enviar novas requisições até que nossa requisição atual seja finalizada, existe sincronismo entre as requisições.

Assíncrona

Em uma requisição assíncrona, não existe sincronismo entre as requisições, sendo assim, podemos enviar diversas requisições em paralelo, onde cada resposta retorna quando estiver pronta.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2013-02-06-http-request-types.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Requisição Síncrona e Assíncrona</figcaption>
</figure>

## Requisição vs Pizza

Agora que conhecemos os tipos de requisição, vamos fazer uma analogia com um caso do nosso cotidiano, comprar pizza. Quando queremos comprar pizza, temos basicamente duas opções, ir comprar em alguma pizzaria ou pedir pelo telefone, essas situações são equivalentes aos tipos de requisição, pois pedimos pizza pelo telefone por comodidade, não queremos sair de casa para comprar, apenas fazemos uma solicitação, continuamos nossas tarefas e recebemos uma resposta quando essa estiver pronta, nossa pizza neste caso, esse fluxo de comodidade representa uma requisição assíncrona, enviamos uma requisição em paralelo e aguardamos sua resposta a qualquer momento, sem sincronismo, já no caso de ir comprar uma pizza, realizamos uma sincronia, compramos nossa pizza, voltamos para casa, para depois continuar com nossas tarefas.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2013-02-06-http-request-and-pizza.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Analogia entre requisições e pizza</figcaption>
</figure>

## AJAX síncrono e assíncrono com jQuery

Muita gente acredita que AJAX se resume em requisições assíncronas, mas isso é um engano, também é possível realizar requisições síncronas, como estudamos anteriormente, nas requisições síncronas, só prosseguimos com nossas tarefas após obter nossa resposta.

Por padrão o jQuery utiliza requisições assíncronas para trabalhar com AJAX, mas caso seja necessário trabalhar com AJAX através de requisições síncronas, precisamos trabalhar com o método [jQuery.ajax()](http://api.jquery.com/jQuery.ajax/) configurando sua propriedade async como false.

Requisição síncrona

{% highlight javascript %}
$.ajax({
  url: 'script.php',
  async: false
}).done(function(data) {
  alert(data);
});
{% endhighlight %}

Requisição assíncrona

{% highlight javascript %}
$.ajax({
  url: 'script.php',
  async: true
}).done(function(data) {
  alert(data);
});
{% endhighlight %}

Arquivo script.php

{% highlight php %}
<?php
sleep(5);
echo 'Hello World';
?>
{% endhighlight %}

No caso da requisição síncrona o navegador fica bloqueado enquanto aguarda o retorno da requisição, afinal estamos indo comprar nossa pizza, faça seu teste.