---
image: "assets/images/posts/shared-image/2012-08-20-standard-php-library-spl.jpg"
i18n: "Standard PHP Library (SPL)"
title: "Standard PHP Library (SPL)"
slug: "standard-php-library-spl"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/standard-php-library-spl/"
---
Standard PHP Library (SPL) é uma coleção de interfaces, classes e funções, que oferecem soluções para alguns problemas comuns, além disso, permite que os desenvolvedores trabalhem de maneira padronizada, aproveitando funcionalidades internas da linguagem, por exemplo, criar objetos que são capazes de trabalhar como um array ou ser percorrido através do construtor foreach().

Neste artigo vamos conhecer alguns recursos oferecidos pela SPL, mas o objetivo principal será apresentar os tipos de recursos e possibilidades que estes oferecem, apontando locais para aprofundar o conhecimento sobre o que está sendo abordado.

Os recursos do SPL estão habilitados por padrão e disponível na maioria das versões do PHP 5, entretanto, devido ao alto número de adições no decorrer das versões lançadas, recomendo sempre verificar quais recursos estão disponíveis para versão que você estiver utilizando.

## Datastructures

Uma estrutura de dados (Em inglês: data structure) é um modelo lógico para organizar informações. SPL fornece um conjunto de estruturas de dados, a diferença entre essas estruturas é a implementação de seu algoritmo subjacente. As estruturas de dados são inerentemente independentes da linguagem e existem como um conjunto de conceitos lógicos baseados na matemática, utilizando algoritmos diferentes, conforme apropriado para maximizar a eficiência.

Para que utilizar arrays se não precisamos de todos os recursos oferecidos por eles em determinadas situações? Esse deve ser o questionamento ao utilizar datastructures disponíveis pela SPL.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SplDoublyLinkedList</td>
        <td>Lista duplamente ligada</td>
      </tr>
      <tr>
        <td>SplStack</td>
        <td>Implementação do algoritmo de uma pilha</td>
      </tr>
      <tr>
        <td>SplQueue</td>
        <td>Implementação do algoritmo de uma fila</td>
      </tr>
      <tr>
        <td>SplHeap</td>
        <td>Classe abstrata para organização de uma lista</td>
      </tr>
      <tr>
        <td>SplMaxHeap</td>
        <td>Organiza do maior para o menor</td>
      </tr>
      <tr>
        <td>SplMinHeap</td>
        <td>Organiza do menor para o maior</td>
      </tr>
      <tr>
        <td>SplPriorityQueue</td>
        <td>Fila com prioridade</td>
      </tr>
      <tr>
        <td>SplFixedArray</td>
        <td>Array de tamanho fixo</td>
      </tr>
      <tr>
        <td>SplObjectStorage</td>
        <td>Set / Map de objetos</td>
      </tr>
    </tbody>
  </table>
</div>

Recomendação:
- http://www.slideshare.net/felipernb/spl-datastructures

Exemplos:
- http://www.alberton.info/php_5.3_spl_data_structures.html

## Interfaces

Interface é um conjunto de métodos que determinado objeto deve suportar, um objeto pode implementar várias interfaces. No PHP contamos com algumas interfaces pré-definidas e outras oferecidas pela SPL, essas interfaces permitem que nossos objetos aproveitem funcionalidades e padrões internos da linguagem, também podemos criar nossas próprias interfaces, mas neste artigo iremos focar apenas nas interfaces que já estão disponíveis no PHP.

Algumas interfaces disponíveis no PHP:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Countable</td>
        <td>Interface para “contar” objetos utilizando a função count()</td>
      </tr>
      <tr>
        <td>Serializable</td>
        <td>Interface para serialização customizada</td>
      </tr>
      <tr>
        <td>ArrayAccess</td>
        <td>Interface para acessar objetos como arrays</td>
      </tr>
      <tr>
        <td>Iterator</td>
        <td>Interface para iterar objetos internamente</td>
      </tr>
    </tbody>
  </table>
</div>

Confira todas as [interfaces pré-definidas](http://www.php.net/manual/pt_BR/reserved.interfaces.php) e [interfaces oferecidas pela SPL](http://www.php.net/manual/pt_BR/spl.interfaces.php)

## Iterators

Um iterator é um objeto que percorre uma estrutura, como um array. Existem diferentes tipos de iterators para lidar com diferentes tipos de dados, cada iterator possui uma interface padrão, que possibilita um acesso padronizado para determinados tipos de dados.

[Confira todos iterators oferecidos pela SPL](http://php.net/manual/en/spl.iterators.php)

## Exceptions

A manipulação de exceções não é uma novidade, mas recentemente foram adicionados dois novos recursos interessantes, aninhamento de exceções e o novo conjunto de tipos de exceção oferecidos pela SPL.

Aninhamento (Em inglês: nesting) de exceções é a habilidade de capturar uma determinada exceção e criar um objeto de nova exceção a ser lançada com uma referência para a exceção original, possibilitando o resgate da exceção original através do método getPrevious().

Foram adicionadas 13 novas exceções na SPL, duas dessas podem ser consideradas exceções base, LogicException e RuntimeException, ambas estendem a classe Exception. O objetivo dessa adição é simples, facilitar o entendimento do código.

Recomendação:
- http://ralphschindler.com/2010/09/15/exception-best-practices-in-php-5-3

## SPL Functions

SPL oferece algumas funções que podem ser úteis dependendo de cada situação, confira algumas dessas funções.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>spl_autoload_register</td>
        <td>Registra a função dada como implementação de __autoload()</td>
      </tr>
      <tr>
        <td>class_implements</td>
        <td>Retorna as interfaces que são implementadas pela classe</td>
      </tr>
      <tr>
        <td>class_parents</td>
        <td>Retorna as classes pai de determinada classe</td>
      </tr>
      <tr>
        <td>spl_classes</td>
        <td>Retorna as classes da SPL disponíveis</td>
      </tr>
    </tbody>
  </table>
</div>

[Confira todas as funções oferecidas pela SPL](http://www.php.net/manual/pt_BR/ref.spl.php)

## File Handling

Atualmente na SPL contamos com as classes SplFileInfo, SplFileObject e SplTempFileObject que facilitam o resgate de informações de arquivos, diretórios, etc.

[Confira mais informações sobre as classes para manipulação de arquivo](http://www.php.net/manual/pt_BR/spl.files.php)

## ArrayObject e Padrão de Projeto Observer

Além dos recursos que foram apresentados acima, SPL oferece a classe ArrayObject uma versão orientada a objetos de um array e duas interfaces que buscam facilitar a implementação do padrão de projeto Observer, que são SplSubject e SplObserver.

[Confira mais informações sobre esses recursos](http://www.php.net/manual/pt_BR/spl.misc.php)

## Estudando SPL para certificação

Caso você esteja estudando este tema focando tirar sua certificação, recomendo que procure entender o que cada recurso oferece, no meu exame encontrei algumas questões sobre SPL, todas testavam apenas conhecimento teórico, mas como são questões dinâmicas, se tiver tempo, implemente alguns exemplos.

## Referência(s)

- [Standard PHP Library (SPL)](http://php.net/manual/pt_BR/book.spl.php)
- [PHP Function List](http://www.php.net/~helly/php/ext/spl/)
- [New SPL Features in PHP 5.3](http://www.slideshare.net/tobias382/new-spl-features-in-php-53)