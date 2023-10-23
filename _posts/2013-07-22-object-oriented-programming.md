---
image: "assets/images/posts/shared-image/2013-07-22-object-oriented-programming.jpg"
i18n: "Object-Oriented Programming"
title: "Programação Orientada a Objetos"
slug: "programacao-orientada-a-objetos"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/orientacao-a-objetos/entendendo-orientacao-a-objetos/"
---
Orientação a objetos é um paradigma no qual implementa-se um conjunto de classes, que definem os objetos através de seus estados e comportamentos necessários em determinado software. O objetivo deste artigo é introduzir os conceitos básicos envolvidos neste paradigma, que está presente em diversas linguagens de programação.

## Classe (Modelo de objetos)

Classe é um modelo de objetos, que pode representar de maneira abstrata um conjunto de objetos com características afins, definindo seus comportamentos através de métodos e gerenciando seu estado utilizando atributos.

## Objeto (Instância de classe)

Quando instanciamos uma classe, geramos um objeto, cada objeto possui um estado próprio, dessa forma, com apenas uma classe podemos gerar diversos objetos, cada qual com seu próprio estado e comportamentos, comportamentos esses que podem variar baseado no estado de cada objeto, fazendo toda mágica acontecer.

Para quem está iniciando, diferenciar os conceitos de classe e objeto, pode ser uma tarefa bastante reflexiva.

## Métodos (Comportamentos e habilidades)

Os métodos definidos na classe, representam os meios de comunicação de um objeto com o mundo externo, em uma classe que represente pessoas, poderíamos definir os métodos caminhar, falar, etc.

Um exemplo de variação baseado no estado do objeto, seria definir que pessoas altas andam mais rápido.

## Atributos (Estado)

Os atributos definidos na classe, representam as características de um objeto, para o nosso exemplo de classe que represente pessoas, poderíamos definir como atributo sua altura, peso, cor dos olhos, etc.

O conjunto de atributos de um determinado objeto é chamado de estado.

## Encapsulamento (Visibilidade)

O encapsulamento consiste na proteção de informações internas, utilizado para impedir acesso direto aos atributos, para isso são gerados métodos específicos para realizar alterações no estado do objeto, o que permite maior controle sobre essas atividades.

Para utilizar um telefone, não precisamos conhecer os detalhes dos circuitos internos, pois estes estão encapsulados, limitando nosso acesso aos recursos através de meios de comunicações.

## Interface (Contrato)

Para uma classe, interfaces são como contratos de comportamentos com o ambiente externo, onde declaramos quais métodos e constantes públicas nossa classe deve possuir. Interfaces quando bem utilizadas tem papel importante na orientação a objetos.

## Herança (Hierarquia)

Através da herança é possível estender uma classe, herdando seus atributos e métodos, adicionando novos atributos, métodos e quando necessário sobrescrevendo métodos já existentes, podendo caso seja preciso incubar o comportamento da classe estendida. No momento em que estendemos uma classe, estamos gerando uma subclasse, cada subclasse pode estender apenas uma classe na maioria das linguagens de programação.

No Java qualquer classe é uma subclasse de Object.

## Classes abstratas (Modelo de classes)

Classes abstratas são modelos para outras classes, já que não podem ser instanciadas, esse tipo de classe tem como objetivo definir métodos e atributos comuns de suas subclasses, além de possibilitar que seja definido um contrato interno, fazendo com que suas subclasses tenham determinados métodos obrigatoriamente.

## Por que utilizar orientação a objeto?

Quando trabalhamos com orientação a objeto, focamos na reutilização de código e possibilitamos que nosso código seja expandido de maneira sustentável.

## Conclusão

Para trabalhar com orientação a objeto precisamos não só conhecer os recursos disponibilizados pela linguagem de programação, mas também pensar, analisar e planejar visando esse paradigma, sempre refatorando nossas soluções, abstraindo blocos de código em comum para que seja possível reaproveitar melhor nosso código.