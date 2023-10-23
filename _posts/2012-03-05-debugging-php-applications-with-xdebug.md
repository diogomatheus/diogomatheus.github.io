---
image: "assets/images/posts/shared-image/2012-03-05-debugging-php-applications-with-xdebug.jpg"
i18n: "Debugging PHP applications with XDebug"
title: "Depuração de aplicações PHP com XDebug"
slug: "depuracao-de-aplicacoes-php-com-xdebug"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/depuracao-de-aplicacoes-php-com-xdebug/"
---
Depuração (em inglês: debugging) é o processo de encontrar a causa de um erro já detectado. Muita gente confunde depuração com teste, mas existe uma grande diferença entre esses conceitos.

## Objetivo de testar

Executar uma aplicação visando determinados casos de teste e encontrar defeitos.

## Objetivo de depurar

Analisar para identificar qual parte da aplicação está causando o defeito detectado, para que seja possível realizar sua correção.

Neste texto iremos configurar o ambiente para depuração em PHP, o exemplo prático será baseado no WAMP, instalado no Windows, que possui XDebug nativo. Nesse cenário, será preciso configurar o php.ini e uma IDE.

## Não utilizo wamp, o que devo fazer?

Em caso de ambiente sem XDebug, será necessário realizar sua instalação antes de prosseguir.

Caso seu sistema operacional seja windows, acesse [http://www.xdebug.org/](http://www.xdebug.org/), efetue o download da última versão respeitando o tipo do seu sistema (32bits ou 64bits).

Por outro lado, no ubuntu, basta executar o seguinte comando no terminal.

{% highlight shell %}
sudo apt-get install php5-xdebug
{% endhighlight %}

## Configuração do php.ini

{% highlight plaintext %}
; XDEBUG Extension
 
zend_extension = "path"
 
[xdebug]
xdebug.remote_enable = On
xdebug.profiler_enable = On
xdebug.profiler_enable_trigger = On
xdebug.remote_autostart = 0
xdebug.remote_handler= "dbgp"
xdebug.remote_host = "127.0.0.1"
xdebug.remote_mode = "req"
xdebug.remote_port = 9000
{% endhighlight %}

Na informação “zend_extension”, informe o caminho do XDebug, no caso do windows um arquivo .dll, por outro lado no ubuntu será um arquivo .so. Reinicie o seridor ao finalizar esta configuração, caso esteja utilizando WAMP, reinicie todos os serviços.

{% highlight plaintext %}
// Exemplo de instalação no windows
c:/wamp/bin/php/php5.3.8/zend_ext/php_xdebug-2.1.2-5.3-vc9.dll
{% endhighlight %}

## Verificar configuração

Para verificar as configurações realizadas, acesse as informações do PHP através da função phpinfo().

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-phpinfo.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Informações do PHP no servidor</figcaption>
</figure>

## Configurando IDE (Eclipse PDT, Zend Studio)

Com o XDebug configurado, vamos precisar realizar algumas configurações na IDE.

{% highlight plaintext %}
Window >> Preferences >> PHP >> Debug
{% endhighlight %}

Selecione o XDebug na opção PHP Debugger e clique em Configure, selecione o XDebug e clique em configure novamente. Na opção Accept Remote Session (JIT), marque a opção Any.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-xdebug-configuration.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Configuração XDebug</figcaption>
</figure>

Volte para tela de Debug, clique em PHP Executables, depois clique em Add, siga as configurações abaixo e clique em Finish.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-php-executable.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">PHP Executable</figcaption>
</figure>

Volte para tela de Debug e selecione em PHP Executable a opção que acabamos de criar e desmarque a opção Break at First line, confira o resultado da tela de debug.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-php-debug-configuration.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Configuração da interface Debug do PHP</figcaption>
</figure>

Agora vamos definir em qual navegador nosso script/aplicação será executado ao realizar o debug, eu escolhi o chrome, mas fique livre para escolher seu preferido.

{% highlight plaintext %}
Window >> Preferences >> General >> Web Browser
{% endhighlight %}

Selecione a opção Use external web browser, clique em new e adicione um nome e o executável do navegador e clique em OK.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-chrome-configuration.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Configuração do navegador Chrome</figcaption>
</figure>

Agora selecione o navegador que você acabou de criar, clique em Apply e depois OK para concluir.

## Trabalhando com depuração no PHP

Com a nossa IDE configurada, precisamos criar um projeto e definir o perfil de debug para este projeto.

{% highlight plaintext %}
File >> New >> PHP Project
{% endhighlight %}

Escolha o nome example-debug e de preferência coloque este projeto na raiz do servidor, na pasta www se estiver usando o wamp.

Agora crie um arquivo index.php nesse projeto com o seguinte conteúdo.

{% highlight php %}
<?php
$var = null;
$var = 10;
$var += 20;
echo $var;
?>
{% endhighlight %}

Agora marque um breakpoint na linha 6, clicando duas vezes na faixa lateral que corresponde está linha.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-breakpoint.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Marcação do breakpoint</figcaption>
</figure>

Feito isso vamos configurar o perfil de debug da aplicação.

{% highlight plaintext %}
Run >> Debug Configurations
{% endhighlight %}

Clique com o botão direito do mouse em PHP Web Page e adicione um novo perfil, confira o resultado dessa configuração.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-application-profile.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Perfil de debug da aplicação</figcaption>
</figure>

Agora clique em Apply, em seguida clique em Debug, seu navegador irá abrir realizando uma requisição e logo de cara o eclipse irá acusar que encontrou um breakpoint durante a execução, perguntando se você deseja mudar a perspectiva do eclipse para debug.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-perspective-confirmation.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Confirmação de mudança de perspectiva</figcaption>
</figure>

Ao clicar em yes nossa perspectiva muda para debug, veja o resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-03-05-debug-perspective.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Perspectiva de debug</figcaption>
</figure>

Enfim, com o XDebug configurado no ambiente, podemos depurar desde um script simples como visto acima até aplicações de grande porte.