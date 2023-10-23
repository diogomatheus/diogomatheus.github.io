---
image: "assets/images/posts/shared-image/2011-03-04-understanding-zend-framework-controllers-and-views.jpg"
i18n: "Understanding Zend Framework controllers and views"
title: "Entendendo os controllers e views do Zend Framework"
slug: "entendendo-os-controllers-e-views-do-zend-framework"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/zend-controller-e-zend-view-entendendo-controllers-e-views-no-zend-framework/"
---
Para começar a desenvolver aplicações com Zend Framework, precisamos primeiro entender os conceitos básicos de seu funcionamento, dentre os componentes mais básicos, porem não menos importantes, encontramos o Zend Controller e Zend View, que iremos conhecer melhor durante este artigo. Caso você não conheça o paradigma MVC(Model-View-Controller), recomendo que leia o artigo Introdução ao Zend Framework, pois seu entendimento é fundamental.

Confira abaixo uma ilustração de como este paradigma trabalha no Zend Framework:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-04-zend-framework-mvc.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Zend Framework (MVC)</figcaption>
</figure>

Confira as etapas da ilustração acima:

1. Usuário faz uma requisição clicando em um link, enviando um formulário, etc.
2. Controller recebe essa requisição.
3. Controller solicita informações ao Model.
4. Model retorna para o Controller os dados solicitados.
5. Controller envia informações para View.
6. View solicita dados ao Model.
7. Model retorna para View os dados solicitados.
8. A página é exibida para o usuário.

Neste artigo iremos abordar apenas os passos 1, 2, 5 e 8, que representam o fluxo básico, sem chamadas aos models.

## Entendendo Zend Controller

O controller é responsável por processar e responder eventos, geralmente ações do usuário, podendo ou não interagir com os models. No zend framework o controller é representado por classes que extendem a classe Zend_Controller_Action.

No exemplo abaixo podemos observar um controller chamado IndexController e um método/action chamado indexAction(), quando executamos uma aplicação zend framework com suas configurações padrões este é o controller e action executado caso nenhum seja especificado na URL.

{% highlight php %}
class IndexController extends Zend_Controller_Action {
  public function indexAction() {
    // action body
  }
}
{% endhighlight %}

Quando solicitamos a url http://www.myapplication.com.br, na verdade o zend framework entende como: http://www.myapplication.com.br/index/index, pois sempre espera uma url no seguinte padrão:

{% highlight plaintext %}
http://www.myapplication.com.br/controller/action/
{% endhighlight %}

Caso um desses não esteja presente, será substituido por index, além disso, para informar uma action precisamos informar um controller, mas podemos informar apenas o controller sem action, sendo está substituida por index.

Assim como informamos o controller e action, também podemos passar parâmetros pela URL.

{% highlight plaintext %}
http://www.myapplication.com.br/controller/action/parameter/value
{% endhighlight %}

Este padrão suporta vários parâmetros.

{% highlight plaintext %}
http://www.myapplication.com.br/controller/action/name/diogo/age/23
{% endhighlight %}

Para passar parâmetros seguindo este padrão, precisamos informar o controller e action.

Para finalizar este assunto, segue o padrão de urls no Zend Framework.

{% highlight plaintext %}
http://www.myapplication.com.br/[controller/[action/[parameter/value]]]
{% endhighlight %}

Este padrão pode ser customizado através de routers, mas este fica para outro artigo.

Confira alguns recursos oferecidos pelo Zend Controller

{% highlight php %}
<?php
/**
 * Recebendo um parâmetro por GET ou POST
 */
$var = $this->getRequest()->getParam('key');
// $this->_getParam('key');
 
/**
 * Recebendo um parâmetro com valor padrão
 * @desc Caso o parâmetro não exista, será retornado o valor padrão.
 */
$var = $this->getRequest()->getParam('key', 'Default');
// $this->_getParam('key', 'Default');
 
/**
 * Alguns métodos para resgatar parâmetros e informações.
 *
 * getQuery()
 * getPost()
 * getCookie()
 * getServer()
 * getEnv()
 */
 
/**
 * Recebendo um array com os parâmetros enviados
 * @desc Ótima maneira de receber vários parâmetros.
 */
$array = $this->getRequest()->getParams();
// $this->_request->getParams();
 
/**
 * Verificando o tipo da requisição
 * @desc Retorna TRUE ou FALSE
 */
$boolean = $this->getRequest()->isPost();
// $this->_request->isPost();
 
/**
 * Enviando informações para view
 */
$this->view->message = 'Hello World';
// $this->view->assign('message', 'Hello World');
 
/**
 * Desabilitando o layout
 */
$this->getHelper('layout')->disableLayout();
// $this->_helper->layout->disableLayout();
 
/**
 * Desabilita a renderização da view
 */
$this->getHelper('viewRenderer')->setNoRender();
// $this->_helper->viewRenderer->setNoRender();
 
/**
 * Renderiza uma determinada view
 */
$this->render('my-view');
?>
{% endhighlight %}

## Entendendo Zend View

A view é responsável pela apresentação, interface que será exibida ao usuário no término do processamento de uma requisição. No zend framework esta camada é representada pela classe Zend_View, que trabalha como uma ponte entre o controller e o script de visão, está classe é instanciada pelo controller e pode receber ou não parâmetros, em seguida o controller solicita que seja renderizado um determinado script, essa solicitação pode ser realizada através do método render($script) ou pelos padrões de nomenclatura.

Por padrão os scripts são arquivos de extensão .phtml, misturando as linguagens PHP e HTML. É recomendado evitar a utilização em excesso da linguagem PHP, deixando o script de visão mais limpo, utilizando apenas como controlador de estruturas, principalmente com o recurso de sintaxe alternativa.

## Padrões de controller e view

O zend framework se basea em padrões de nomenclaturas para determinar qual script de visão deve ser renderizado caso o método render($script) não seja invocado.

Estrutura básica de uma aplicação zend framework:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-04-project-structure.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

Confira alguns padrões de nomenclaturas:

- O arquivo do controller deve começar com letra maiúscula e terminar com Controller.php
- Toda action começa com letra minúscula e termina com Action()
- Scripts de visão ficam localizados na pasta scripts
- Para cada controller um diretório deve ser criado em scripts
- Para cada action um script de visão deve ser criado na pasta do controller
- Controller com nome composto deve utilizar CamelCase
- Action com nome composto deve utilizar lowerCamelCase
- Scripts de nomes compostos são minúsculos, separados por hífen(-)
- Na URL os nomes compostos são separados por hífen(-)

## Layout e view helpers

Para organizar e deixar nossos scripts de visão sem códigos PHP em excesso, temos a possibilidade de trabalhar com layouts e view helpers, ambos tem como destaque a reutilização de código.

Layout

O componente Zend_Layout permite envolver o conteúdo da aplicação com uma determinada view, normalmente representando o modelo do site, mais conhecidos como layout, onde podemos definir o topo, menu, rodapé, etc.

View Helper

Nos scripts de visão, frequentemente precisamos executar funções complexas, como formatar uma data, exibir um link, etc. Um helper é simplesmente uma classe, que pode facilmente ser executada, deixando os scripts mais organizados com menos código php.

Confira alguns recursos oferecidos pelo Zend View

{% highlight php %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Zend Framework - View</title>
    
    <!-- Trabalhando com view helper -->
    <link rel="stylesheet" type="text/css" href="<?php echo $this->baseUrl('css/base.css'); ?>" />
  </head>
  <body>
    <!-- Imprimindo um parâmetro enviado pelo controller -->
    <?php echo $this->message; ?>

    <!-- Trabalhando com alternative syntax -->
    <?php if($this->username): ?>
    <p>Olá <?php echo $this->username; ?>.</p>
    <?php else: ?>
    <p>Olá visitante.</p>
    <?php endif; ?>

    <?php if(sizeof($this->messages)): ?>
    <ul>
      <?php foreach($this->messages as $message): ?>
      <li><?php echo $message; ?></li>
      <?php endforeach; ?>
    </ul>
    <?php endif; ?>
  </body>
</html>
{% endhighlight %}

## Trabalhando com controllers e views no zend framework

Agora que conhecemos um pouco sobre Zend Controller, Zend View e algumas de suas funcionalidades, vamos criar um exemplo simples. Baseado na estrutura apresentada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, crie um projeto com nome de example-zend-view-controller.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-04-project-structure.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="index-controller-code-tab" data-toggle="tab" data-target="#index-controller-code-tabpanel" type="button" role="tab" aria-controls="index-controller-code-tabpanel" aria-selected="true">IndexController.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="index-view-code-tab" data-toggle="tab" data-target="#index-view-code-tabpanel" type="button" role="tab" aria-controls="index-view-code-tabpanel" aria-selected="false">index/index.phtml</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-controller-code-tab" data-toggle="tab" data-target="#contact-controller-code-tabpanel" type="button" role="tab" aria-controls="contact-controller-code-tabpanel" aria-selected="false">FaleConoscoController.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-view-code-tab" data-toggle="tab" data-target="#contact-view-code-tabpanel" type="button" role="tab" aria-controls="contact-view-code-tabpanel" aria-selected="false">fale-conosco/index.phtml</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="index-controller-code-tabpanel" role="tabpanel" aria-labelledby="index-controller-code-tab">

{% highlight php %}
<?php
class IndexController extends Zend_Controller_Action {
  public function indexAction() {
    /**
      * Resgata o nome do usuário
      * Caso não exista, será recebido 'Visitante'
      */
    $username = $this->_getParam('username', 'Visitante');

    /**
      * Envia um parâmetro para view
      */
    $this->view->assign('username', $username);
  }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="index-view-code-tabpanel" role="tabpanel" aria-labelledby="index-view-code-tab">
  
{% highlight php %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Zend Framework - View e Controller</title>
  </head>
  <body>
    <h2>Home</h2>
    <?php if($this->username): ?>
    <p>Olá <?php echo $this->username; ?>.</p>
    <?php endif; ?>
  </body>
</html>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="contact-controller-code-tabpanel" role="tabpanel" aria-labelledby="contact-controller-code-tab">
  
{% highlight php %}
<?php
class FaleConoscoController extends Zend_Controller_Action {
  public function indexAction() {
    // action body
  }
}
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="contact-view-code-tabpanel" role="tabpanel" aria-labelledby="contact-view-code-tab">
  
{% highlight php %}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <title>Zend Framework - View e Controller</title>
  </head>
  <body>
    <h2>Fale Conosco</h2>
    <ul>
      <li>Email: dm.matheus@gmail.com</li>
      <li>Twitter: @dmmatheus</li>
      <li>Facebook: fb.com/dm.matheus</li>
    </ul>
  </body>
</html>
{% endhighlight %}

  </div>
</div>

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-04-project-final-structure.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Resultado

http://localhost/example-zend-view-controller/public/

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-04-application-homepage.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Página inicial</figcaption>
</figure>

http://localhost/example-zend-view-controller/public/index/index/username/Diogo+Matheus/

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-04-application-homepage-with-parameter.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Página inicial com parâmetro</figcaption>
</figure>

http://localhost/example-zend-view-controller/public/fale-conosco/

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-04-application-contact.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Página fale conosco</figcaption>
</figure>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-view-controller).