---
image: "assets/images/posts/shared-image/2013-06-03-identifying-elements-with-id-and-classes.jpg"
i18n: "Identifying elements with ID and Classes"
title: "Identificando elementos com ID e Classes"
slug: "identificando-elementos-com-id-e-classes"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/xhtml-css/identificando-elementos-com-id-e-classes/"
---
Quem está iniciando no mundo do desenvolvimento utilizando as tecnologias XHTML e CSS, em algum momento irá se perguntar qual a diferença entre identificar um elemento com ID ou Classe?

Para quem já trabalha na área pode parecer uma questão simples, mas costumo observar pessoas com uma boa experiência confundindo os conceitos desses atributos.

## ID não se repete

Deve ser utilizado para representar um elemento único em nossa página. Quando adicionamos um ID em determinado elemento, este não deve se repetir em outro elemento.

{% highlight html %}
<!-- Cada elemento pode ter apenas um ID -->
<p id="helloWorld">Hello Word!</p>
{% endhighlight %}

## Classes são modelos de elementos

Quando definimos uma classe, podemos atribuí-la para diversos elementos em nossa página, onde cada elemento irá herdar as características dessa(s) classe(s).

{% highlight html %}
<!-- Cada elemento pode ter diversas classes -->
<p class="oneClass anotherClass">Hello Word!</p>
{% endhighlight %}

## Quando utilizar ID e Classe?

Basicamente devemos analisar se o elemento que desejamos identificar pode se repetir em nossa página, por exemplo, se queremos destacar um único elemento é recomendado utilizar ID, mas se nosso objetivo é destacar vários elementos, gerando componentes, que podem se repetir diversas vezes em nossa página, o ideal seria utilizar classe(s).

{% highlight html %}
<!-- Elementos podem receber ambos atributos, ID e Classe(s) -->
<p id="helloWorld" class="oneClass anotherClass">Hello Word!</p>
{% endhighlight %}

## Especificação e Abstração

Quando trabalhamos com ID, estamos especificando uma identificação única para determinado elemento, essa especificação reflete em alguns recursos, por exemplo, quando precisamos manipular dinamicamente atributos e conteúdo de elementos em nossa página, podemos utilizar o método [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/document.getElementById), da [API DOM](http://pt.wikipedia.org/wiki/Document_Object_Model), retornando o elemento desejado, recebendo como parâmetro um ID.

Por outro lado, ao trabalhar com classes, estamos abstraindo informações de determinado(s) elemento(s), separando em quantas classes for necessário, o que torna nosso desafio ainda maior, abstrair essas informações, que na maioria das vezes são de aparência, de tal maneira que não seja necessário duplicar linhas de código.

## Conclusão

Não se trata de uma escolha, apenas do entendimento de cada conceito, aplicando de acordo com nossa necessidade. Nem todos os elementos precisam de identificação, mas quando for preciso, devemos aplicar o atributo que se encaixar melhor, seja ID, classe ou ambos, visando manipulação ou formatação um elemento bem mapeado se destaca dos demais.

## Referência(s)

- [The Difference Between ID and Class](http://css-tricks.com/the-difference-between-id-and-class/)