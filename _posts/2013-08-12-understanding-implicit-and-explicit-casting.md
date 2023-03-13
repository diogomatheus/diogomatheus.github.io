---
image: "assets/images/posts/shared-image/2013-08-12-understanding-implicit-and-explicit-casting.jpg"
i18n: "Understanding implicit and explicit casting"
title: "Entendendo casting implícito e explícito"
slug: "entendendo-casting-implicito-e-explicito"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/orientacao-a-objetos/entendendo-casting-implicio-e-explicito/"
---
Quando trabalhamos com orientação a objetos em linguagens de tipagem forte, onde precisamos declarar o tipo de nossas variáveis antes de utilizá-las, frequentemente precisamos realizar algumas mudanças / transformações nos tipos das variáveis, cenário no qual precisamos entender o funcionamento do casting.

## Definição

Casting é a transformação de uma determinada variável com valor / referência de tipo menos específico para uma variável de tipo mais específico e vice-versa.

## Tipos de casting

Implícito, conhecido como upcasting, quando transformamos uma variável com valor/referência de tipo mais específico em uma  variável de tipo menos específico, ou seja, estamos subindo na nossa hierarquia, esse tipo de cast é realizado automaticamente.

{% highlight java %}
String exampleString = new String("Hello World");
Object exampleObject = exampleString;
{% endhighlight %}

Explícito, conhecido como downcasting, quando transformamos uma variável com valor/referência de tipo menos específico em uma variável de tipo mais específico, ou seja, estamos descendo na nossa hierarquia, esse tipo de cast é realizado manualmente.

{% highlight java %}
Object exampleOject = new String("Hello World");
String exampleString = (String) exampleObject;
{% endhighlight %}

O tipo de casting explícito, downcasting, ocorre em tempo de execução, diferente do casting implícito, upcasting, que é interpretado em tempo de compilação.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2013-08-12-casting-types.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block rounded">
  <figcaption class="figure-caption text-center">Tipos de casting</figcaption>
</figure>

## Por que precisamos trabalhar manualmente?

Quando trabalhamos com casting implícito, upcasting, estamos subindo nossa hierarquia de classes, logo é possível verificar em tempo de compilação se determinado tipo de variável é derivado de outro, por exemplo, se tivermos uma variável de tipo Gato, podemos transforma-la em Felino ou Animal, nesse caso o compilador iria verificar se Gato é um Felino ou se Gato é um Animal, essa verificação é baseada em herança e implementação de interfaces [operador instanceof], por outro lado se tentarmos transformar uma variável de tipo Gato em Canino, iremos receber uma mensagem do compilador de que essa transformação não é possível, já que Gato não é um Canino em nossa hierarquia de classes.

Quando trabalhamos com casting explícito, downcasting, estamos descendo nossa hierarquia de classes. Se tivermos uma variável de tipo Animal, podemos tentar transforma-la em qualquer de suas classes derivadas, o que irá definir se vamos conseguir, será a referência dessa variável, como o instanciamento dessa variável pode ocorrer baseado em alguma escolha do usuário em tempo de execução, essa verificação não pode ser analisada em tempo de compilação, obrigando que o desenvolvedor tenha controle sobre o que está fazendo.

## O que acontece durante o casting?

Para melhor compreensão será preciso entender os conceitos de memória Stack e Heap.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Memória</th>
        <th scope="col">Definição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Stack</td>
        <td>Bloco de memória onde variáveis locais, definidas no escopo de função / método, são armazenadas.</td>
      </tr>
      <tr>
        <td>Heap</td>
        <td>Pool de memória de propósito geral, memória dinâmica, onde os objetos ficam armazenados.</td>
      </tr>
    </tbody>
  </table>
</div>

Na declaração de uma variável, estamos ocupando um espaço na memória Stack, quando instanciamos uma classe [operador new], gerando um objeto, este objeto fica na memória Heap e nesse momento nosso espaço na memória Stack faz referência ao objeto.

No momento em que realizamos casting, estamos analisando o objeto referenciado por uma variável, verificando se existe compatibilidade entre os tipos das variáveis envolvidas, em caso de sucesso ambas as variáveis fazem referencia ao objeto. Em nenhum momento alteramos nosso objeto. Os recursos oferecidos pelo objeto [atributos e métodos] estarão disponíveis para cada variável de acordo com seu tipo [classe / interface].