---
image: "assets/images/posts/shared-image/2012-03-26-php-reflection.jpg"
i18n: "PHP - Reflection"
title: "PHP - Reflexão"
slug: "php-reflexao"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/entendendo-reflection-no-php/"
---
Reflection (em português: reflexão) é o processo em que um programa pode observar e modificar sua própria estrutura, no PHP este recurso foi adicionado após a reformulação da orientação a objeto na linguagem, versão 5, possibilitando realizar engenharia reversa em classes, interfaces, funções e extensões, além disso também podemos resgatar comentários/documentação de funções, classes e métodos.

## O que podemos fazer utilizando reflection?

- Gerar documentação em runtime, tempo de execução.
- Alterar propriedades privadas de uma classe.
- Verificar a existência de um determinado método.
- Executar/Invocar métodos dinamicamente.

## Classes disponíveis na API Reflection

- Reflection
- ReflectionClass
- ReflectionZendExtension
- ReflectionExtension
- ReflectionFunction
- ReflectionFunctionAbstract
- ReflectionMethod
- ReflectionObject
- ReflectionParameter
- ReflectionProperty
- Reflector
- ReflectionException

Confira todos os [recursos disponíveis](http://php.net/manual/en/book.reflection.php).

## Trabalhando com reflection no PHP

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="index-code-tab" data-toggle="tab" data-target="#index-code-tabpanel" type="button" role="tab" aria-controls="index-code-tabpanel" aria-selected="true">index.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="television-code-tab" data-toggle="tab" data-target="#television-code-tabpanel" type="button" role="tab" aria-controls="television-code-tabpanel" aria-selected="false">models/Television.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="eletronic-code-tab" data-toggle="tab" data-target="#eletronic-code-tabpanel" type="button" role="tab" aria-controls="eletronic-code-tabpanel" aria-selected="false">interfaces/Electronic.php</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="index-code-tabpanel" role="tabpanel" aria-labelledby="index-code-tab">

{% highlight php %}
<?php
include_once('models/Television.php');

$tv = new Television();
$tv->turnOn();
// Resultado: Turning on the television.
 
$reflectionClass = new ReflectionClass('Television');
// Resgata o nome da classe
$className = $reflectionClass->getName();
// Resgata as interfaces que a classe implementa
$interfaces = $reflectionClass->getInterfaces();
 
// Resgatando uma propriedade da classe, objeto ReflectionProperty
$typeProperty = $reflectionClass->getProperty('displayType');
// Alterando a acessibilidade/visibilidade da propriedade
$typeProperty->setAccessible(true);
// Alterando o valor da propriedade em um determinado objeto($tv)
$typeProperty->setValue($tv, 'LED');
 
echo $tv->getDisplayType();
// Resultado: LED
 
// Resgatando os métodos da classe
$methods = $reflectionClass->getMethods();
// Verifica a quantidade de métodos
$methodsQtd = count($methods);
 
echo "{$className} has {$methodsQtd} methods.";
// Resultado: Television has 8 methods.
 
// Resgatando o método changeChannel
$changeChannelMethod = $reflectionClass->getMethod('changeChannel');
// Resgatando os parâmetros do método changeChannel
$parameters = $changeChannelMethod->getParameters();
// Resgatando os comentários/documentação do método
$docComment = $changeChannelMethod->getDocComment();
 
// Executando o método de um determinado objeto($tv)
$changeChannelMethod->invoke($tv, 6);
 
$tv->channelInfo();
// Resultado: You are watching channel 6.
$tv->turnOff();
// Resultado: Turning off the television.
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="television-code-tabpanel" role="tabpanel" aria-labelledby="television-code-tab">

  <p>models/television.php</p>

{% highlight php %}
<?php
include_once('interfaces/Electronic.php');

/**
* Television Class
*
*/
class Television implements Electronic
{
  private $currentChannel;
  private $manufacturer;
  private $displayType;

  public function getManufacturer() {
    return $this->manufacturer;
  }

  public function setManufacturer($manufacturer) {
    $this->manufacturer = $manufacturer;
  }

  public function getDisplayType() {
    return $this->displayType;
  }

  public function setDisplayType($displayType) {
    $this->displayType = $displayType;
  }

  /**
  * changeChannel Method
  *
  * @param $channel
  * @desc Change the television channel
  */
  public function changeChannel($channel){
    $this->currentChannel = $channel;
  }

  public function channelInfo() {
    echo "You are watching channel {$this->currentChannel}.";
  }

  public function turnOn() {
    echo 'Turning on the television.';
  }

  public function turnOff() {
    echo 'Turning off the television.';
  }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="eletronic-code-tabpanel" role="tabpanel" aria-labelledby="eletronic-code-tab">

  <p>interfaces/Eletronic.php</p>

{% highlight php %}
<?php
Interface Electronic
{
  public function turnOn();
  public function turnOff();
}
?>
{% endhighlight %}

  </div>
</div>

No exemplo acima criamos uma classe chamada Television e implementamos a interface Electronic na mesma, no index.php utilizamos alguns recursos da API Reflection do PHP para examinar e alterar detalhes da classe, para mais informações leia os comentários no script.

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/php-reflection).

## Referência(s)

- [Documentação oficial, reflexão](http://php.net/manual/pt_BR/book.reflection.php)