---
image: "assets/images/posts/shared-image/2010-05-13-getting-started-with-jquery.jpg"
i18n: "Getting started with jQuery"
title: "Introdução ao jQuery"
slug: "introducao-ao-jquery"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/jquery/introducao-ao-jquery/"
---
Criado por [John Resig](https://johnresig.com/), jQuery é uma biblioteca JavaScript de código aberto baseada na licença GPL (General Public Licence), ou seja, pode ser usada em projetos pessoais e comerciais.

## Propósito da biblioteca

Segundo John Resig, o foco da biblioteca jQuery é a simplicidade, ou seja, substituir longos códigos escritos em JavaScript para executar efeitos visuais e ações, por poucas linhas de código usando jQuery.

Além disso, no contexto de criação da biblioteca jQuery, existia um grande problema de incompatibilidade entre os navegadores da época, e.g., Internet Explorer, Firefox, etc. Nesse cenário, jQuery foi projetado para simplificar os códigos escritos em JavaScript e mitigar esses problemas de incompatibilidade, incrementando de forma não obstrututiva aspectos como usabilidade, acessibilidade e design.

## O que é incrementar de forma não obstrututiva?

Geralmente uma página de internet é composta por inúmeros efeitos visuais e funcionalidades escritas em JavaScript / jQuery. Porém, como essa página irá se comportar em navegadores com JavaScript desabilitado ou suporte inexistente?

Escrever páginas de internet de maneira não obstrutiva significa, em primeiro momento, criar páginas acessíveis, sem efeitos visuais ou funcionalidades JavaScript. Em seguida, visando melhorar a experiência do usuário, incrementamos essa página de forma não obstrutiva com efeitos visuais e funcionalidades escritas em JavaScript / jQuery.

## O que podemos fazer usando jQuey?

De forma geral, jQuery contribui para:

- Requisitar informações externas (e.g., servidor) sem recarregar o conteúdo da página;
- Identificar, resgatar e manipular os elementos da página;
- Customizar as properidades de folha de estilo da página e seus elementos;
- Adicionar efeitos visuais e animações na página.

Além disso, diferentes plugins são disponibilizados no website oficial da biblioteca jQuery. Com base nesses plugins, podemos adicionar funcionalidades, efeitos visuais ou animações prontas, implementadas por terceiros em nossa página.

Confira os plugins disponíveis: [http://plugins.jquery.com/](http://plugins.jquery.com/)

## Principais características da biblioteca

- Extensível para implementação / instalação de plugins;
- Baseado em seletores CSS para identificar elementos da página;
- Cross-browser, ou seja, recursos para mitigar os problemas de incompatibiliade de navegadores;
- Programação encadeada (method chaining), onde podemos invocar múltiplos métodos de maneira encadeada.

## Como adicionar jQuery em páginas HTML?

A biblioteca jQuery pode ser incluída em páginas HTML por meio de arquivo JavaScript convencional. Esse arquivo JavaScript, local ou armazenado em CDN (Content Delivery Network), pode ser declarado no cabeçalho da página (HEAD) ou no final do corpo da página (BODY). Recomenda-se que arquivos JavaScript sejam declarados no final do corpo da página (BODY). Porém, isso depende da estrutura da página, o importante é declarar antes de usar os recursos da biblioteca.

## Hello World

Para não perder o costume da área, segue o famigerado exemplo de "Hello World".

{% highlight html %}
<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>jQuery Hello World</title>
</head>
<body>
  <h1>jQuery Hello World</h1>
  
  <!-- jQuery -->
  <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function() { alert('Hello Word'); });
  </script>
</body>
</html>
{% endhighlight %}

Como resultado da execução, quando nossa página terminar de ser carregada, um alert será apresentado com o texto "Hello World".

Observação: Para economizar o consumo de banda, recomenda-se o uso da versão compacta (minified) da biblioteca, pois existe uma diferença considerável de tamanho no arquivo.

## Documentação oficial

[https://api.jquery.com/](https://api.jquery.com/)