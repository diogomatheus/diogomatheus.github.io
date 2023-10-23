---
image: "assets/images/posts/shared-image/2015-07-20-css-and-preprocessors.jpg"
i18n: "CSS and preprocessors"
title: "CSS e pré-processadores"
slug: "css-e-pre-processadores"
categories: [ "Programação" ]
tags: [ "featured" ]
redirect_from:
  - "/blog/xhtml-css/css-e-pre-processadores/"
---

Criada por [Håkon Wium Lie](https://www.wiumlie.no/en), Cascading Style Sheets (CSS) é uma linguagem para especificação de folhas de estilo de páginas da internet, descrevendo como essas páginas são apresentadas em telas, impressão, etc. O principal objetivo da linguagem CSS é possibilitar uma divisão entre o conteúdo da página e sua organização visual, sendo geralmente usada para organizar visualmente documentos escritos em HTML e XML.

Por meio de uma sintaxe simples, essa linguagem se tornou um padrão na internet. Porém, essa simplicidade pode se tornar um gargalo quando falamos de grandes aplicações, envolvendo folhas de estilo de alta complexidade. Nesse cenário, surgiram os pré-processadores de CSS que oferecem recursos para facilitar o desenvolvimento e manutenção de grandes aplicações.

## O que são pré-processadores?

Pré-processadores são programas que recebem uma entrada, normalmente um texto, efetuando conversões em seu conteúdo que podem incluir substituições e inclusões condicionais.

No caso dos pré-processadores CSS este fluxo não é diferente, onde os códigos são desenvolvidos através de seus recursos facilitadores, depois submetido ao processador tendo como resultado seu conteúdo adequado as limitações do CSS. O principal benefício dos pré-processadores é o ganho na produtividade, seja na criação ou manutenção de estilos, gerando aplicações com estilo organizado e sem duplicação de código.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2015-07-20-css-preprocessors-overview.png' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Visão geral dos pré-processadores CSS</figcaption>
</figure>

Confira os principais pré-processadores disponíveis no mercado.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Pré-processador</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="http://lesscss.org/">Less</a></td>
        <td>Criada por Alexis Sellier, LESS é uma linguagem de folhas de estilo dinâmica originalmente desenvolvida com Ruby, mas suas versões atuais usam JavaScript para processamento.</td>
      </tr>
      <tr>
        <td><a href="http://sass-lang.com/">Sass</a></td>
        <td>Criada por Hampton Catlin e Natalie Weizenbaum, Sass é uma linguagem de folha de estilos dinâmica que possui dois tipos de sintaxe, Sass e Scss, sendo originalmente desenvolvida com Ruby, mas possui versões em PHP, Java e C.</td>
      </tr>
      <tr>
        <td><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
        <td>Criada por TJ Holowaychuk, Stylus é uma linguagem de folhas de estilo dinâmica desenvolvida com NodeJS e possui suporte para sintaxe indentada e tradicional do CSS.</td>
      </tr>
    </tbody>
  </table>
</div>

## Os principais recursos dos pré-processadores

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Recurso</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Variáveis</td>
        <td>As váriáveis são usadas para armazenar informações, nos pré-processadores essas variávies na verdade funcionam como constantes, sendo definida apenas uma vez, ótimo para guardar as principais cores de um template, fonte padrão, etc.</td>
      </tr>
      <tr>
        <td>Operadores</td>
        <td>Os operadores são úteis para cálculos matemáticos como controle de altura e largura, podendo também ser baseado em variáveis.</td>
      </tr>
      <tr>
        <td>Aninhamento</td>
        <td>Embora as linguagens de marcação como HTML e XML disponibilizem meios de aninhar conteúdo o CSS não oferece esse tipo de suporte, o que acaba gerando confusão na folha de estilo e duplicação nas declarações. Os pré-processadores oferecem uma alternativa simples de aninhamento que resolve esse problema, deixando o código mais limpo e de fácil entendimento.</td>
      </tr>
      <tr>
        <td>Importação</td>
        <td>O CSS oferece esse recurso mas para cada importação é gerado uma requisição HTTP, o que não é muito interessante, com os pré-processadores uma vez processado será gerado um arquivo CSS com todo conteúdo necessário, possibilitando organizar os estilos mas sem comprometer o desempenho.</td>
      </tr>
      <tr>
        <td>Mixins</td>
        <td>Os mixins permitem que sejam criados grupos de declarações, como por exemplo classes, que serão reutilizadas no decorrer do código, onde é possível definir parâmetros, possibilitando também o comportamento de herança.</td>
      </tr>
      <tr>
        <td>Funções</td>
        <td>Este recurso não é oferecido por todos os pré-processadores, seu objetivo é disponibilizar funções pré-definidas, visando operações matemáticas, tipo de variável, definição de cores, etc.</td>
      </tr>
    </tbody>
  </table>
</div>

Confira os [recursos](http://lesscss.org/features/) e [funções](http://lesscss.org/functions/) pré-definidas do pré-processador de CSS LESS.

## Criando folhas de estilo usando LESS

Com os conceitos apresentados, vamos ao que interessa, nesse exemplo iremos desenvolver um componente para listagem de comentários usando os recursos do LESS.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="result-tab" data-toggle="tab" data-target="#result-tabpanel" type="button" role="tab" aria-controls="result-tabpanel" aria-selected="true">Resultado</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="index-tab" data-toggle="tab" data-target="#index-tabpanel" type="button" role="tab" aria-controls="index-tabpanel" aria-selected="false">index.html</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="style-tab" data-toggle="tab" data-target="#style-tabpanel" type="button" role="tab" aria-controls="style-tabpanel" aria-selected="false">style.less</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="result-tabpanel" role="tabpanel" aria-labelledby="result-tab">
    <img src="{{ '/assets/images/posts/general/2015-07-20-css-preprocessors-example.jpg' | prepend: site.baseurl }}" class="img-responsive">
  </div>
  <div class="tab-pane" id="index-tabpanel" role="tabpanel" aria-labelledby="index-tab">

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>LESS - Pré-processador CSS</title>
    <link rel="stylesheet/less" type="text/css" href="style.less" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.5.1/less.min.js"></script>
  </head>
  <body>
    <div class="template-wrapper">
      <h1 class="template-title">Comments</h1>
      <ul class="comment-list">
        <li>
          <div class="comment-avatar">
            <a href="#"><img src="image/avatar.png" alt="avatar"></a>
          </div>
          <div class="comment-info">
            <h4>Lorem ipsum</h4>
            <p>26/01/2015</p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          </div>
        </li>
        <li>
          <div class="comment-avatar">
            <a href="#"><img src="image/avatar.png" alt="avatar"></a>
          </div>
          <div class="comment-info">
            <h4>Lorem ipsum</h4>
            <p>26/01/2015</p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          </div>
        </li>
        <li>
          <div class="comment-avatar">
            <a href="#"><img src="image/avatar.png" alt="avatar"></a>
          </div>
          <div class="comment-info">
            <h4>Lorem ipsum</h4>
            <p>26/01/2015</p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          </div>
        </li>
      </ul>
    </div>
  </body>
</html>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="style-tabpanel" role="tabpanel" aria-labelledby="style-tab">

{% highlight css %}
// Variable
@text-color: #333;
  
// Mixin
.bordered {
  // LESS function lighten and variable usage
  border: solid 1px lighten(@text-color, 50%);
}
// Mixin with parameter
.border-radius(@radius: 10px) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}
// Mixin clearfix hack
.clearfix {
  display: block;
  zoom: 1;

  // Nested and self reference
  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
  
// Template
body {
  font-family: Helvetica,Arial,sans-serif;
}
.template-wrapper {
  margin: auto;
  width: 80%;
  color: @text-color;
}
.template-title {
  font-weight: lighter;
}
.comment-list {
  margin: 0px;
  padding: 10px;
  list-style: none;
    
  // Mixins usage
  .bordered;
  .border-radius();

  // Nested
  li {
    margin-top: 5px;
    min-height: 150px;

    .comment-avatar {
      // Local variable
      @image-size: 150px;
      width: @image-size;
      // Operations [15px]
      padding-right: @image-size / 10;
      float: left;

      img {
        // Mixins usage
        .bordered;
        .border-radius(5px);
      }
    }

    .comment-info {
      h4 {
        margin: 0px;
        color: lighten(@text-color, 30%);
      }
      p {
        color: lighten(@text-color, 40%);
      }
    }

    // Mixin usage
    .clearfix;
  }
}
{% endhighlight %}

  </div>
</div>

O exemplo possui comentários no código LESS indicando os recursos utilizados, possibilitando um melhor entendimento sobre seus conceitos, além disso, foi usado uma versão javascript do processador executando as conversões no lado do cliente, isso não é recomendado para projetos reais onde existe necessidade de performance, para estes o ideal é usar um processador gerando arquivo CSS antes de enviar ao servidor, trabalhando normalmente seguindo os padrões do CSS.

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/css-less).

## Conclusão

Os pré-processadores de CSS oferecem diversos recursos visando facilitar criação e manutenção de folhas de estilos, apenas quem já sofreu realizando mudanças significativas em estilos de grandes aplicações consegue identificar os benefícios das variáveis, mixins, etc. O uso de pré-processadores é uma realidade no mercado, podendo ser facilmente encontrado em projetos abertos de front-end ou como requisito de oportunidades de emprego.