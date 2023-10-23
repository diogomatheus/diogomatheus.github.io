---
image: "assets/images/posts/shared-image/2013-07-29-interface-based-programming.jpg"
i18n: "Interface-based programming"
title: "Programação baseada em interface"
slug: "programacao-baseada-em-interface"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/orientacao-a-objetos/orientacao-a-interfaces/"
---
Interfaces são como contratos de comportamentos disponíveis ao ambiente externo, onde são declarados métodos e constantes públicas, além disso as interfaces desempenham papel importante no desacoplamento de código em uma aplicação orientada a objeto.

## Por que desacoplar nosso código de implementações?

Quando desenvolvemos para implementações geramos dependência, dificultando a expansão e modificação de nosso código, mas vale lembrar que desenvolvimento orientado a interface não é um paradigma como orientação a objetos, é uma boa prática, que visa deixar nosso projeto flexível além de possibilitar a reutilização de código.

## Como as interfaces podem ajudar nosso código?

Interfaces são como contratos, definem quais métodos devem ser implementados, métodos nada mais são do que comportamentos, sendo assim, podemos dizer que interfaces representam comportamentos obrigatórios.

Quando trabalhamos com orientação a interfaces em linguagens fortemente tipadas, como Java, devemos declarar nossas variáveis de objetos informando como tipo uma interface ao invés de informar uma determinada classe. Imagine que estamos desenvolvendo um projeto onde precisamos resgatar informações de um arquivo no formato XML, planejamos algumas classes e interfaces para atingir esse objetivo, durante o desenvolvimento nosso cliente adicionou um requisito e agora também precisamos resgatar as mesmas informações de um arquivo no formato JSON, se nosso projeto foi construído utilizando orientação a interface, grande parte do nosso código não seria afetado, bastaria criar uma classe para interpretar as informações no formato JSON e ajustar o instanciamento do objeto ou injeção de dependência.

Não seria muito melhor se ao invés de passar um objeto como parâmetro informando sua classe, pudéssemos passar um objeto como parâmetro informando qual comportamento esperamos utilizar? Sim. Orientação a interfaces também significa informar qual comportamento precisamos ao trabalhar com objetos como parâmetros, com isso ganhamos flexibilidade.

## Trabalhando com orientação a interfaces

Nessa parte do artigo vamos praticar um pouco do que vimos anteriormente, nosso projeto será desenvolver um brinde para os visitantes de uma feira de produtos eletrônicos, com foco na exposição de televisores, nosso cliente solicitou que fosse desenvolvido um controle remoto universal para seus televisores no formato de um chaveiro, com apenas uma funcionalidade, ligar e desligar as televisões de sua marca.

Iniciamos o desenvolvimento do projeto com as interfaces Electronic e RemoteControl.

Electronic.php

{% highlight php %}
<?php
interface Electronic
{
  public function turnOn();
  public function turnOff();
  public function isOn();
}
?>
{% endhighlight %}

RemoteControl.php

{% highlight php %}
<?php
interface RemoteControl
{
  public function togglePower(Electronic $electronic);
}
?>
{% endhighlight %}

Com nossas interfaces definidas, criamos nossas classes TelevisionImpl e RemoteControlImpl.

TelevisionImpl.php

{% highlight php %}
<?php
class TelevisionImpl implements Electronic
{
  private $_status;

  public function turnOn() {
    echo 'Turning on the Television';
    $this->_status = true;
  }

  public function turnOff() {
    echo 'Turning off the Television';
    $this->_status = false;
  }

  public function isOn() {
    return $this->_status;
  }
}
?>
{% endhighlight %}

RemoteControlImpl.php

{% highlight php %}
<?php
class RemoteControlImpl implements RemoteControl
{
  public function togglePower(Electronic $electronic) {
    if(!$electronic->isOn()) {
      $electronic->turnOn();
    } else {
      $electronic->turnOff();
    }
  }
}
?>
{% endhighlight %}

**Alteração de escopo:** Durante o desenvolvimento do projeto o cliente solicitou uma mudança no escopo, nosso controle remoto também precisa ligar e desligar aparelhos blu-ray player.

Não precisamos modificar nosso controle, já que este foi desenvolvido visando um comportamento de produtos eletrônicos, nesse caso, basta expandir nosso projeto criando uma nova classe.

BlurayPlayerImpl.php

{% highlight php %}
<?php
class BlurayPlayerImpl implements Electronic
{
  private $_status;

  public function turnOn() {
    echo 'Turning on the Bluray Player';
    $this->_status = true;
  }

  public function turnOff() {
    echo 'Turning off the Bluray Player';
    $this->_status = false;
  }

  public function isOn() {
    return $this->_status;
  }
}
?>
{% endhighlight %}

Alguns recursos e nomenclaturas não foram utilizados para simplificar nosso exemplo.

Confira o código-fonte do exemplo no GitHub:

- [Versão PHP](https://github.com/diogomatheus/php-advanced-interface)
- [Versão Java](https://github.com/diogomatheus/java-advanced-interface)

## Conclusão

Interfaces são mais do contratos para as classes, também oferecem flexibilidade ao desenvolvimento, definem comportamentos, que são meios disponíveis para essas classes se comunicarem, ao utilizar orientação a interfaces, desenvolvemos para o que foi publicado, não mais para o que é público, em grandes projetos isso faz toda diferença, apenas adicionamos métodos em nossas interfaces quando estão estáveis, evitando que algo instável seja utilizado por um dos membros da equipe.

## Referência(s)

- [Design Principles from Design Patterns](http://www.artima.com/lejava/articles/designprinciples.html)