---
image: "assets/images/posts/shared-image/2010-05-09-getting-started-with-zend-framework.jpg"
i18n: "Getting started with Zend Framework"
title: "Introdução ao Zend Framework"
slug: "introducao-ao-zend-framework"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/introducao-ao-zend-framework/"
---
Framework de desenvolvimento é uma base de onde se pode desenvolver algo maior ou mais específico. É uma coleção de códigos-fontes, classes, funções, técnicas e metodologias que facilitam o desenvolvimento de nossos softwares.

A decisão por usar um framework de desenvolvimento reside na necessidade de estruturar os projetos de software, devido à grande complexidade que os mesmos alcançaram. Um projeto estruturado reduz custos, aumenta a qualidade e reduz o tempo de desenvolvimento do mesmo.

## Características de um framework

- Reutilizável
- Extensível
- Seguro
- Eficiente

## Diferenças entre framework e biblioteca de classes

Biblioteca de classes

- Em uma biblioteca de classes, cada classe é única e independente das outras.
- Aplicação chama uma determinada classe da biblioteca.

Framework

- Em um framework as dependências/colaborações estão embutidas.
- O framework chama o código desenvolvido por você (“Don´t call us, we’ll call you”, Hollywood Principle).

## Zend Framework

Foi lançado no dia 4 de março de 2006 e inclui diferentes tipos de componentes desenvolvidos em PHP 5 para prover alta qualidade no desenvolvimento de aplicações web, é um projeto open source(código-fonte disponível) que segue o padrão de projeto MVC, para desenvolver aplicações em 3 camadas.

## O que é MVC?

Model-View-Controller (MVC) é um padrão de arquitetura de software que visa separar a lógica de aplicação da interface de apresentação, permitindo o desenvolvimento, teste e manutenção separadamente de cada parte.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2010-05-09-zend-framework-mvc-overview.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Zend Framework - MVC</figcaption>
</figure>

Model

Esta camada contém toda a parte de negócio, ou seja, programação pesada da aplicação, regras de negócio, acesso ao banco de dados, etc.

View

Camada responsável pela apresentação, interface que será exibida para o usuário ao término do processamento feito pelo controller.

Controller

Processa e responde a eventos, geralmente ações do usuário, invocando se necessário models, forms, helpers e etc.

## Componentes

Todo framework conta com uma coleção de componentes, alguns destes precisam ser estendidos para que tenham utilidade na aplicação, outros basta utilizar. O zend framework possui uma grande variedade de componentes, sendo assim vale a pena conferir todos os componentes disponíveis no manual do framework.