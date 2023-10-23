---
image: "assets/images/posts/shared-image/2011-03-16-creating-rss-feeds-with-php.jpg"
i18n: "Creating RSS feeds with PHP"
title: "Criando feeds RSS com PHP"
slug: "criando-feeds-rss-com-php"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/criando-feeds-rss-com-php/"
---
Nesse texto irei compartilhar uma maneira simples de criar feeds RSS com PHP através da classe [SimpleXMLElement](http://php.net/manual/en/class.simplexmlelement.php), o resultado será um exercício prático que irá simular uma conexão com banco de dados usando um array com dados pré-definidos.

## O que são feeds?

Feed, do verbo em inglês Alimentar, é um formato de dados usado para comunicação de conteúdos atualizados frequentemente, como sites de notícias ou blogs. Distribuidores de informação, blogueiros ou canais de notícias disponibilizam um feed ao qual usuários podem se inscrever, no formato de um link.

## O que é RSS?

RSS é um subconjunto de “dialetos” XML que servem para agregar conteúdo ou “Web syndication”, podendo ser acessado mediante programas ou sites agregadores. [Wikipédia]

## Para que são utilizados?

Os feeds são utilizados para manter os usuários de um determinado site informado sobre novos conteúdos, como últimas notícias ou postagens em um blog, uma ótima maneira de fidelizar o usuário, sem exigir que este acesse o site para verificar se existe conteúdo novo.

## Criando um feed RSS com PHP

Para criar nosso feed, iremos usar os seguintes dados.

{% highlight php %}
<?php
$data = array(
  array(
    'titulo' => 'Página Pessoal',
    'link' => 'http://www.diogomatheus.com.br/',
    'description' => 'Descrição da página pessoal'
  ),
  array(
    'titulo' => 'Blog',
    'link' => 'http://www.diogomatheus.com.br/blog/',
    'description' => 'Descrição do blog'
  )
);
?>
{% endhighlight %}

Segue o script responsável pela criação do feed RSS.

{% highlight php %}
<?php
$feed = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><rss></rss>');
$feed->addAttribute('version', '2.0');
 
// Criar elemento channel
$channel = $feed->addChild('channel');
$channel->addChild('title', 'Criando Feeds RSS com PHP');
$channel->addChild('link', 'http://www.diogomatheus.com.br');
$channel->addChild('description', 'Feed RSS usando SimpleXMLElement');

foreach ($data as $item) {
  // Criar elemento para cada item
  $item_channel = $channel->addChild('item');
  $item_channel->addChild('title', $item['titulo']);
  $item_channel->addChild('link', $item['link']);
  $item_channel->addChild('description', $item['description']);
  $item_channel->addChild('pubDate', date('r'));
}
 
// Definir tipo de conteúdo da resposta e charset
header("content-type: application/rss+xml; charset=utf-8");

// Escrever resultado como XML
echo $feed->asXML();
?>
{% endhighlight %}

Segue os passos executados no script:

- Instanciar classe SimpleXMLElement
- Informar versão do RSS
- Criar elemento channel e adicionar suas informações
- Percorrer array de resultados pré-definidos
- Criar um elemento para cada item do array, adicionando suas informações
- Definir tipo do conteúdo e charset
- Imprimir conteúdo XML gerado

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="result-tab" data-toggle="tab" data-target="#result-tabpanel" type="button" role="tab" aria-controls="result-tabpanel" aria-selected="true">Resultado</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="xml-code-tab" data-toggle="tab" data-target="#xml-code-tabpanel" type="button" role="tab" aria-controls="xml-code-tabpanel" aria-selected="false">Código XML</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="feed-code-tab" data-toggle="tab" data-target="#feed-code-tabpanel" type="button" role="tab" aria-controls="feed-code-tabpanel" aria-selected="false">Código PHP</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="result-tabpanel" role="tabpanel" aria-labelledby="result-tab">
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2011-03-16-rss-feed.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Resultado RSS feed</figcaption>
    </figure>
  </div>
  <div class="tab-pane" id="xml-code-tabpanel" role="tabpanel" aria-labelledby="xml-code-tab">

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Criando Feeds RSS com PHP</title>
    <link>http://www.diogomatheus.com.br</link>
    <description>Feed RSS usando SimpleXMLElement</description>
    <item>
      <title>Página Pessoal</title>
      <link>http://www.diogomatheus.com.br/</link>
      <description>Descrição da página pessoal</description>
      <pubDate>Wed, 16 Mar 2011 12:40:27 -0300</pubDate>
    </item>
    <item>
      <title>Blog</title>
      <link>http://www.diogomatheus.com.br/blog/</link>
      <description>Descrição do blog</description>
      <pubDate>Wed, 16 Mar 2011 12:40:27 -0300</pubDate>
    </item>
  </channel>
</rss>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="feed-code-tabpanel" role="tabpanel" aria-labelledby="feed-code-tab">

{% highlight php %}
<?php
$data = array(
  array(
    'titulo' => 'Página Pessoal',
    'link' => 'http://www.diogomatheus.com.br/',
    'description' => 'Descrição da página pessoal'
  ),
  array(
    'titulo' => 'Blog',
    'link' => 'http://www.diogomatheus.com.br/blog/',
    'description' => 'Descrição do blog'
  )
);

$feed = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><rss></rss>');
$feed->addAttribute('version', '2.0');

$channel = $feed->addChild('channel');
$channel->addChild('title', 'Criando Feeds RSS com PHP');
$channel->addChild('link', 'http://www.diogomatheus.com.br');
$channel->addChild('description', 'Feed RSS usando SimpleXMLElement');

foreach ($data as $item) {
  // Criar elemento para cada item
  $item_channel = $channel->addChild('item');
  $item_channel->addChild('title', $item['titulo']);
  $item_channel->addChild('link', $item['link']);
  $item_channel->addChild('description', $item['description']);
  $item_channel->addChild('pubDate', date('r'));
}

header("content-type: application/rss+xml; charset=utf-8");
echo $feed->asXML();
?>
{% endhighlight %}

  </div>
</div>

Lembrando que o código desenvolvimento nesse texto foi criado para demonstrar o uso da classe [SimpleXMLElement](http://php.net/manual/en/class.simplexmlelement.php), para um cenário real será necessário substituir o array com valores pré-definidos.