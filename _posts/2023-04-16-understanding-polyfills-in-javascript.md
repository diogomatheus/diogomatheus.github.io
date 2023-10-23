---
image: "assets/images/posts/shared-image/2023-04-16-understanding-polyfills-in-javascript.jpg"
i18n: "Understanding Polyfills in JavaScript"
title: "Entendendo Polyfills no JavaScript"
slug: "entendendo-polyfills-no-javascript"
categories: [ "Programação" ]
tags: []
---
Com o avanço constante da linguagem JavaScript, nem todos os navegadores e ambientes de execução suportam as mesmas funcionalidades, o que pode dificultar a criação de uma experiência consistente para os usuários. Nesse cenário, polyfills são trechos de código que permitem que desenvolvedores utilizem funcionalidades modernas em navegadores e ambientes de execução antigos que não as suportam nativamente. Esses trechos de código preenchem as lacunas de compatibilidade do navegador ou ambiente de execução, possibilitando que novas funcionalidades da linguagem sejam utilizadas sem preocupação. Por exemplo, se um desenvolvedor quer utilizar o método Array.includes() em seu código JavaScript, mas o navegador não suporta tal método, é possível utilizar um polyfill para preencher a lacuna de compatibilidade e garantir que o código funcione corretamente.

## Como escrever um polyfill em JavaScript?

Um polyfill é basicamente uma implementação de funcionalidade em JavaScript que ainda não é suportada por determinado navegador ou ambiente execução. Isso significa que, se quisermos usar essa funcionalidade indisponível em nossos projetos, precisamos fornecer uma implementação para garantir que ela funcione.

Escrever um polyfill pode parecer intimidador, mas é um processo simples. Para começar, identifique a funcionalidade desejada e verifique se ela é suportada pelo navegador ou ambiente de execução. Caso já esteja disponível, nada precisa ser feito. Caso contrário, é necessário criar uma implementação compatível com as especificações da funcionalidade desejada para que possa ser usada sem problemas.

{% highlight javascript %}
// Remove String.prototype.startsWith if exists
String.prototype.startsWith = null;

// Create custom polyfill String.prototype.startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    console.log('Executing custom polyfill String.prototype.startsWith');
    position = !position || position < 0 ? 0 : +position;
    return this.substring(position, position + searchString.length) === searchString;
  };
}

const name = 'Diogo Matheus Costa';
console.log(`Result: ${name.startsWith('Diogo')}`);
// Executing custom polyfill String.prototype.startsWith
// Result: true
{% endhighlight %}

Nesse código de exemplo, começamos removendo o String.prototype.startsWith, simulando um navegador ou ambiente de execução que não oferece suporte para essa funcionalidade. Em seguida, verificamos se essa mesma funcionalidade está disponível, embora nesse exemplo esteja evidente que não estará disponível, em cenários reais é importante esse tipo de verificação para respeitar as implementações nativas. Caso não esteja disponível, implementamos nossa própria versão do método startsWith. No final, executamos o método e observamos que o polyfill implementado foi executado com sucesso.

## O que é o core-js?

O core-js é uma biblioteca JavaScript de código aberto que fornece polyfills para recursos modernos do JavaScript. O core-js é bastante popular na comunidade JavaScript e é usado em muitos projetos de grande porte. Além disso, ele também fornece outros recursos úteis, como algoritmos de pesquisa e manipulação de arrays, que podem ajudar a melhorar o desempenho do código.

## Quais são as vantagens e desvantagens de usar o core-js?

O uso do core-js apresenta algumas vantagens e desvantagens que devem ser consideradas pelos desenvolvedores ao decidirem se devem utilizá-lo em seus projetos. Confira algumas vantagens da biblioteca core-js:

- **Facilidade de uso:** O core-js torna a inclusão de polyfills em projetos JavaScript mais fácil e menos trabalhosa, já que é possível incluir apenas os polyfills necessários para o projeto.
- **Compatibilidade:** O core-js é compatível com uma ampla variedade de navegadores e ambientes de execução, o que permite que o desenvolvedor se concentre em escrever o código em vez de se preocupar com as diferenças de compatibilidade entre as plataformas.
- **Atualizações frequentes:** O core-js é atualizado com frequência para incluir novos polyfills e melhorias, garantindo que os desenvolvedores possam utilizar as últimas funcionalidades disponíveis no JavaScript.

Por outro lado, também há algumas desvantagens que devem ser levadas em conta:

- **Tamanho:** O core-js pode adicionar um peso considerável aos arquivos JavaScript do projeto, o que pode afetar o tempo de carregamento da aplicação.
- **Conflitos com outros polyfills:** Caso o desenvolvedor já tenha incluído outros polyfills em seu projeto, pode haver conflitos com os polyfills do core-js, o que pode causar erros no código.
- **Dependência de bibliotecas de terceiros:** O core-js é uma biblioteca de terceiros, o que significa que o desenvolvedor precisa confiar na sua manutenção e atualizações. Se a biblioteca não for atualizada com frequência ou for abandonada, pode haver problemas de segurança ou de compatibilidade no futuro.

## Exemplo prático de uso de polyfills com o core-js

Imagine que você precise utilizar o recurso Promise.allSettled() no seu código, mas percebeu que esse recurso ainda não é suportado por um dos navegadores que serão utilizados pelos usuários da aplicação. Para resolver isso, você pode usar o core-js para incluir o polyfill necessário.

{% highlight html %}
<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Promise.allSettled() with core-js</title>
  <script src="https://cdn.jsdelivr.net/npm/core-js-bundle@3.29.1/minified.min.js"></script>
</head>
<body>
  <script>
    const promises = [
      Promise.resolve(1),
      Promise.reject(new Error('Erro!')),
      Promise.resolve(3)
    ];
    Promise.allSettled(promises).then(results => {
      console.log(results);
    }).catch(error => {
      console.error(error);
    });
  </script>
</body>
</html>
{% endhighlight %}

Nesse exemplo, o core-js é importado na página por meio de um arquivo externo de CDN (Content Delivery Network). Em seguida, criamos um código JavaScript baseado no recurso Promise.allSettled(). Nesse cenário, sabemos que caso algum navegador não ofereça suporte para o recurso, ele será executado corretamente graças ao polyfill ofertado pelo core-js.

Essa lógica é válida não apenas para navegadores, mas também para outros ambientes de execução, como o Node.js, por exemplo.

## Considerações finais

O uso de polyfills é uma prática que garante a compatibilidade do código em diversos navegadores e ambientes de execução. Na hora de escrever um polyfill, é essencial testá-lo em diferentes navegadores e ambientes de execução para garantir que não haja interferência no comportamento padrão. Nesse sentido, a biblioteca core-js pode ser uma solução interessante para gerenciar os polyfills e garantir que apenas as funcionalidades necessárias sejam carregadas. No entanto, é preciso estar ciente das desvantagens, como o aumento do tamanho do script da aplicação e a possibilidade de carregar funcionalidades desnecessárias. Portanto, é fundamental avaliar cuidadosamente as necessidades do projeto.