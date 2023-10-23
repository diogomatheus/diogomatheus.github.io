---
image: "assets/images/posts/shared-image/2011-05-02-understanding-zend-framework-helpers.jpg"
i18n: "Understanding Zend Framework helpers"
title: "Entendendo os helpers do Zend Framework"
slug: "entendendo-os-helpers-do-zend-framework"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/zend-view-helpers-e-zend-action-helpers/"
---
Helpers são classes auxiliares que tem como objetivo simplificar o código tanto na view quanto no controller, simplificar de que forma? Se por acaso for necessário gerar strings randômicas personalizadas no controller, ao invés de criar uma função em todo controller que precisar de uma string randômica, podemos criar um action helper que abstraia essa tarefa e fique disponível em todos os controllers, mas e se eu precisar de uma função que limite o tamanho de um texto a ser exibido na minha view? criamos então um view helper para auxiliar nessa tarefa, analisando e cortando o texto se necessário, ficando disponível para todas as views, para obter o resultado esperado chamamos uma função com o nome do helper.

## Qual a diferença entre view helpers e action helpers?

Caso ainda não tenha ficado claro, a diferença é que os view helpers auxiliam nossa camada de visão, nossas views, já os action helpers auxiliam nossos controllers.

Ambos são chamados como uma função direta e podem receber parâmetros, mas os actions helpers vão além permitindo que sejam “instanciados”, podendo assim serem manipulados como uma instância de classe, chamando métodos e etc, esse conceito será melhor compreendido na parte final do tutorial onde vamos trabalhar com os helpers.

Na documentação do zend framework conseguimos ver os helpers disponíveis.

## O que eu faço se preciso de um helper e não tem disponível?

Simples, crie o seu próprio helper, basta seguir as nomenclaturas do zend framework, extender as classes certas e pronto, a seguir vamos criar e testar um action helper e view helper, mas antes vamos configurar nosso ambiente para receber nossos helpers.

## Organizando nossa estrutura para os helpers

Agora vamos configurar nossa aplicaçao para que os helpers fiquem acessíveis de toda aplicação, muito útil para quem trabalha com módulos pois os helpers ficarão disponíveis em todos os módulos.

Primeiro vamos criar a estrutura de pastas necessária para nossa configuração, que ficará dentro da pasta library do nosso projeto.

O resultado deve seguir a estrutura da imagem abaixo:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-02-project-structure.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

Com essa estrutura criada, vamos configurar nossa aplicação para encontrar nossos futuros helpers, para realizar essa configuração temos duas alternativas, configurar pelo nosso bootstrap e a outra é configurar através do arquivo application.ini, confira ambas alternativas a seguir, escolha uma e aplique no seu projeto.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="bootstrap-code-tab" data-toggle="tab" data-target="#bootstrap-code-tabpanel" type="button" role="tab" aria-controls="bootstrap-code-tabpanel" aria-selected="true">bootstrap.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="application-code-tab" data-toggle="tab" data-target="#application-code-tabpanel" type="button" role="tab" aria-controls="application-code-tabpanel" aria-selected="false">application.ini</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="bootstrap-code-tabpanel" role="tabpanel" aria-labelledby="bootstrap-code-tab">

{% highlight php %}
<?php
/**
* _initHelpers
* @desc Sets alternative ways to helpers
*/
protected function _initHelpers() {
  $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('viewRenderer');
  $viewRenderer->initView();
  $viewRenderer->view->addHelperPath('ZF/View/Helper/');
  Zend_Controller_Action_HelperBroker::addPath('ZF/Controller/Helper/');
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="application-code-tabpanel" role="tabpanel" aria-labelledby="application-code-tab">

{% highlight plaintext %}
autoloaderNamespace.zf = "ZF_"
resources.view.helperPath.ZF_View_Helper = APPLICATION_PATH "/../library/ZF/View/Helper"
resources.frontController.actionhelperpaths.ZF_Controller_Action_Helper = APPLICATION_PATH "/../library/ZF/Controller/Helper"
{% endhighlight %}

  </div>
</div>

Pronto, agora nossos helpers estão disponíveis para toda aplicação.

## Criando nosso controller action helper

Vamos criar nosso action helper, que será uma classe para auxiliar na geração de strings randômicas, o arquivo deve ser criado na pasta “ZF/Controller/Helper” com o nome “GenerateRandom.php”, veja a seguir o conteúdo do nosso action helper e não se assuste com seu tamanho, pois o objetivo é poder trabalhar dando mais exemplos na hora de testar.

{% highlight php %}
<?php
/**
 * GenerateRandom Action Helper
 * @desc Cria uma string randômica
 * @uses Zend_Controller_Action_Helper
 */
class Zend_Controller_Action_Helper_GenerateRandom
  extends Zend_Controller_Action_Helper_Abstract {
  /**
  * @var Zend_Loader_PluginLoader
  */
  public $pluginLoader;
  /**
  * config
  */
  private $lower = 'abcdefghijklmnopqrstuvwxyz';
  private $upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private $numbers = '1234567890';
  private $simbols = '!@#$%*-';
  /**
  * @var $characters
  */
  private $characters;
  /**
  * @var $resultado
  */
  private $resultado;

  /**
  * Constructor: initialize plugin loader
  * @return void
  */
  public function __construct() {
    $this->pluginLoader = new Zend_Loader_PluginLoader ();
  }

  /**
  * generateRandom
  * @desc Cria uma string randômica
  * @param int $length
  * @param boolean $uppercase
  * @param boolean $number
  * @param boolean $simbol
  * @return string $resultado
  */
  public function generateCustom($length = 8, $uppercase = true, $number = true, $simbol = false) {
    $this->characters = $this->lower;

    if($uppercase)
      $this->characters .= $this->upper;
    if($number)
      $this->characters .= $this->numbers;
    if($simbol)
      $this->characters .= $this->simbols;

    $this->resultado = $this->generate($length);
    return $this->resultado;
  }

  /**
  * numeric
  * @desc Cria uma string de números randômicos
  * @param int $length
  * @return $resultado
  */
  public function numeric($length = 8) {
    $this->characters = $this->numbers;
    $this->resultado = $this->generate($length);
    return $this->resultado;
  }

  /**
  * hardPassword
  * @desc Cria uma senha forte
  * @param int $length
  * @return $resultado
  */
  public function hardPassword($length = 8) {
    $this->characters = $this->lower;
    $this->characters .= $this->simbols;
    $this->characters .= $this->upper;
    $this->characters .= $this->simbols;
    $this->characters .= $this->numbers;
    $this->characters .= $this->simbols;
    $this->resultado = $this->generate($length);
    return $this->resultado;
  }

  /**
  * generate
  * @desc Gera a string baseado nos atributos da classe
  * @param int $length
  * @return $text
  */
  private function generate($length = 8) {
    $text = '';
    $max = strlen($this->characters) - 1;
    for ($i = 1; $i <= $length; $i++) {
      $rand = rand(0, $max);
      $text .= $this->characters[$rand];
    }
    return $text;
  }

  /**
  * Strategy pattern: call helper as broker method
  */
  public function direct( $length = 8, $uppercase = true, $number = true, $simbol = false ) {
    return $this->generateCustom($length, $uppercase, $number, $simbol);
  }
}
?>
{% endhighlight %}

O método “direct” é responsável por chamar o método principal em caso de chamada direta do helper.

## Criando nosso view helper

Agora vamos criar nosso view helper, que será uma classe auxiliar para controlar o tamanho dos textos que serão exibidos na camada de visão, muitas vezes precisamos “cortar” esses textos para manter o layout agradável, o arquivo deve ser criado na pasta “ZF/View/Helper” com o nome “Truncate.php”, veja a seguir o conteúdo do nosso view helper.

{% highlight php %}
<?php
/**
 * Truncate helper
 * @desc Verifica e corta uma string se for necessário
 * @uses Zend_View_Interface
 */
class Zend_View_Helper_Truncate {
  /**
  * @var Zend_View_Interface
  */
  public $view;
  /**
  * @var  string $text
  */
  private $resultado;

  /**
  * trucante
  * @desc Verifica e corta uma string se for necessário
  * @return string $text
  */
  public function truncate($text = '', $length = 32, $character = "&hellip;") {
    if(strlen($text) <= $length)
      return $text;

    $this->resultado  = substr($text, 0, $length-1);
    $this->resultado .= $character;

    return $this->resultado;
  }

  /**
  * Sets the view field
  * @param $view Zend_View_Interface
  */
  public function setView(Zend_View_Interface $view) {
    $this->view = $view;
  }
}
?>
{% endhighlight %}

Nesse momento nossa estrutura está da seguinte forma:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-02-final-project-structure.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Utilizando View Helper no controller

Pode ser necessário utilizar view helpers no controller, para isso temos as seguintes opções:

{% highlight php %}
<?php
class FooController extends Zend_Controller_Action
{
  public function barAction() {
    $this->view->helpername(/*params*/);
    // ou
    $this->_view->helpername(/*params*/);
    // ou
    $helper = $this->view->getHelper('helpername');
    // ou
    $broker = Zend_Controller_Action_HelperBroker::getStaticHelper('ViewRenderer');
    $broker->getView()->helpername(/*params*/);
  }
}
?>
{% endhighlight %}

## Trabalhando com os helpers no controller e na view

Com os nossos helpers prontos, vamos trabalhar, não será necessário criar controllers e views, vamos trabalhar usando o IndexController.php e a view index.phtml.

IndexController.php

{% highlight php %}
<?php
class IndexController extends Zend_Controller_Action {
  public function indexAction() {
    // cria uma string randômica através do método direct apenas com letras
    $primaryString = $this->_helper->generateRandom(14, true, false, false);

    // resgata o helper, retornando uma instância do helper
    $helper = $this->_helper->getHelper('generateRandom');
    // ou $helper = $this->_helper->generateRandom;
    // cria um password seguro através de um dos métodos do helper
    $secondString = $helper->hardPassword();
    // cria uma string numérica chamand o método numeric()
    $thirdString = $helper->numeric(10);

    // enviando os dados para view
    $this->view->assign('alphaString', $primaryString);
    $this->view->assign('hardPassword', $secondString);
    $this->view->assign('numericString', $thirdString);
    // enviando um texto para view
    $this->view->assign('text', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam cursus.');
  }
}
?>
{% endhighlight %}

index.phtml

{% highlight php %}
String de letras gerada pelo nosso action helper: <?php echo $this->alphaString; ?><br />
Password gerado pelo nosso action helper: <?php echo $this->hardPassword; ?><br />
String de numeros pelo nosso action helper: <?php echo $this->numericString; ?><br />
<br />
Resultado usando nosso view helper: <?php echo $this->truncate($this->text, 27); ?>
{% endhighlight %}

## Resultado

Ao acessar nossa aplicação, vamos obter o seguinte resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-05-02-execution-result.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado da execução</figcaption>
</figure>

As strings geradas pelo nosso action helper vão variar a cada acesso, pois são aleatórias.

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-helpers).