---
image: "assets/images/posts/shared-image/2011-03-10-reading-rss-feeds-with-php.jpg"
i18n: "Reading RSS feeds with PHP"
title: "Lendo feeds RSS com PHP"
slug: "lendo-feeds-rss-com-php"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/lendo-feeds-rss-com-php/"
---
Bom estou fazendo uma nova versão da minha página pessoal e pensei em listar os últimos tópicos criados aqui no blog, mas queria algo simples, sem precisar criar uma conexão para acessar minha base de dados, decidi por um leitor de feeds RSS, para pegar os últimos tópicos através do feed do blog, vou compartilhar com vocês duas maneiras interessantes para realizar essa tarefa, a primeira utiliza a função simplexml_load_file para fazer um leitor simples e a segunda será usando o projeto [MagpieRSS](https://magpierss.sourceforge.net/), que conta com um sistema de cache para evitar requisições desnecessárias ao feed e tem como objetivo facilitar a criação e a leitura de feeds, mas antes vamos entender um pouco sobre feeds e rss.

## O que são feeds?

Feed (vindo do verbo em inglês “alimentar”) é um formato de dados usado em formas de comunicação com conteúdo atualizado frequentemente, como sites (sítios) de notícias ou blogs. Distribuidores de informação, blogueiros ou canais de notícias disponibilizam um feed ao qual usuários podem se inscrever, no formato de um link. [Wikipédia]

## O que é RSS?

RSS é um subconjunto de “dialetos” XML que servem para agregar conteúdo ou “Web syndication”, podendo ser acessado mediante programas ou sites agregadores. [Wikipédia]

## Para que são utilizados?

Como vimos na descrição os feeds permitem que os usuários acompanhem as últimas notícias de um site ou posts de um blog, sendo bastante útil ao usuário, de maneira que o mesmo não precisa acessar os sites ou blogs procurando novas notícias, ao utilizar feeds são as notícias que vão até os usuários inscritos.

## Criando seu leitor de feeds simples

Nesse script foi utilizado a função simplexml_load_file(), que carrega um arquivo xml e o transforma em objeto, mas aqui utilizamos um link de feed rss, que ao ser solicitado retorna um arquivo xml, como foi dito na descrição, os rss são dialetos xml.

{% highlight php %}
<?php
// habilitar requisições de urls externas
ini_set('allow_url_fopen', 1);
ini_set('allow_url_include', 1);

// executar requisição do feed
$rss = simplexml_load_file('http://www.diogomatheus.com.br/blog/?feed=rss2');
// limitador
$limit = 5;
// contador
$count = 0;
 
if ($rss) {
  foreach ($rss->channel->item as $item) {
    // formatar e escrever item do feed
    printf('<a href="%s" title="%s" >%s</a><br />', $item->link, $item->title, $item->title);
    
    // incrementar contador
    $count++;
    // interromper iteração baseado no limitador
    if($count == $limit) break;
  }
} else {
  echo 'Não foi possível acessar o blog.';
}
?>
{% endhighlight %}

Como nem todos os serviços de hospedagem estão configurados para solicitar conteúdos através de uma url, como é nosso caso aqui, foram adicionadas duas linhas no início do script com a finalidade de configurar e permitir essa solicitação.

Creio que o script está bastante comentado, mas o que fizemos aqui foi:

- Definimos a url do feed na variável $feed;
- Solicitamos e convertemos o feed através da função simplexml_load_file();
- Definimos o número máximo de resultados que desejamos na variável $limit;
- Efetuamos um loop para imprimir os resultados;

A função sprintf() é utilizada para impressão de strings(textos) com grande número de variáveis, essa função é mais rápida do que concatenar textos e variáveis.

## Criando um leitor de feeds usando MagpieRSS

Agora vamos criar um leitor usando o MagpieRSS, para isso vamos fazer o [download do MagpieRSS](http://sourceforge.net/projects/magpierss/files/), após isso, descompacte o arquivo e coloque a pasta junto ao arquivo onde script(o que estamos criando) estiver localizado, renomeie a pasta para “magpierss”, nesse momento devemos ter o arquivo do nosso script e a pasta magpierss no mesmo diretório.

{% highlight php %}
<?php
// importar e configurar MagpieRSS
require_once('magpierss/rss_fetch.inc');
define('MAGPIE_OUTPUT_ENCODING', 'UTF-8');

// executar requisição do feed
$rss = fetch_rss('http://www.diogomatheus.com.br/blog/?feed=rss2');
// limitador
$limit = 5;

if ($rss) {
  // cortar array baseado no limitador
  if($limit) {
    $rss->items = array_slice($rss->items, 0, $limit);
  }

  foreach ($rss->items as $item) {
    // formatar e escrever item do feed
    printf('<a href="%s" title="%s" >%s</a><br />', $item['link'], $item['title'], $item['title']);
  }
} else {
  echo 'Não foi possível acessar o blog.';
}
?>
{% endhighlight %}

Começamos nosso script importanto o arquivo principal do magpierss, “rss_fetch.inc” usando a função require_once(), logo abaixo definimos o charset a ser utilizado para imprimir o conteúdo do feed na página, não mude essa configuração, mesmo que você use iso-8859-1, se você modificar essa configuração para outro charset alguns caracteres virão errados.

Após importar o arquivo e configurar o charset para utf-8, realizamos os seguintes passos:

- Definimos a url do feed na variável $feed;
- Solicitamos e convertemos o feed em um array através da função fetch_rss();
- Definimos o número máximo de resultados que desejamos na variável $limit;
- Efetuamos um loop para imprimir os resultados;

A função fetch_rss() é definida no arquivo importado(“rss_fetch.inc”).

Ao executar o script usando MagpieRSS, ele tentará criar uma pasta chamada “cache” no mesmo diretório do script para guardar o cache dos resultados, se você estiver usando esse script em uma hospedagem, verifique se o mesmo está configurado para permitir escrita de arquivos.

## Testando nosso leitor de Feeds

Agora vamos testar o script, independente de qual você escolheu utilizar o resultado deve ser o mesmo, afinal ambos foram feitos para exibir os 5 últimos tópicos do blog em forma de link.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-10-rss-feed-result.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado do leitor de RSS</figcaption>
</figure>

Esse resultado foi realizado na data em que este tópico estava sendo criado e depende do conteúdo do blog, sendo assim não existe um resultado de conteúdo certo, apenas um formato de saída padronizado.

## Diferença entre os scripts

A grande diferença entre os dois scripts é devido ao sistema de cache oferecido pelo MagpieRSS, que afeta muito no resultado final, porque evita solicitações repetidas ao feed, diminuindo o tempo de carregamento das páginas.

Caso o charset de sua página for “iso-8859-1”, recomendo o uso da função utf8_decode() nos textos resgatados do feed, por exemplo utf8_decode($item->title).