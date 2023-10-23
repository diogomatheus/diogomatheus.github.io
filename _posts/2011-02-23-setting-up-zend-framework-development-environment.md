---
image: "assets/images/posts/shared-image/2011-02-23-setting-up-zend-framework-development-environment.jpg"
i18n: "Setting up Zend Framework development environment"
title: "Configurando o ambiente de desenvolvimento do Zend Framework"
slug: "configurando-o-ambiente-de-desenvolvimento-do-zend-framework"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/preparando-o-ambiente-para-desenvolvimento-com-zend-framework/"
---
Para começar a desenvolver com zend framework, antes de escolher uma IDE(ferramenta de desenvolvimento), precisamos instalar as tecnologias necessárias para executar as aplicações que serão desenvolvidas e para isso vamos precisar de um servidor local com suporte a linguagem PHP e um banco de dados, o servidor adotado será o [Apache](http://www.apache.org/) e o banco de dados [MySQL](http://www.mysql.com/).

Iremos facilitar a instalação dessas tecnologias utilizando o [WAMP](http://www.wampserver.com/en/), que reune as três tecnologias em apenas uma instalação, lembrando que o wamp é para windows, mas se você utiliza outro sistema operacional também existe o LAMP e MAMP.

## Instalação do WAMP Server

Primeiramente, faça o [download do WAMP Server](http://www.wampserver.com/en/download.php), em seguida execute o instalador, mantenha o diretório “c:\wamp” como local de instalação, caso você tenha firefox o wamp irá perguntar se deseja que ele seja o navegador padrão, se não tiver, irá abrir uma janela pedindo para você selecionar seu navegador padrão, ao termino da instalação o wamp pedirá os parâmetros para utilizar o PHP mail, por enquanto deixe os valores padrões e siga em frente, execute o wamp.

Após instalar e executar o WAMP Server, um ícone será exibido ao lado do relógio do windows na bandeja de ícones.

Para testar a instalação do wamp, abra seu navegador e digite o endereço: http://localhost, se aparecer o conteúdo abaixo, a instalação foi bem sucedida.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-02-23-wamp-server-homepage.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Página inicial do WAMP Server</figcaption>
</figure>

O que temos nesse momento é o WAMP Server iniciado e acessível na máquina local da instação. Porém, podemos configurar o WAMP Server para ficar disponível para outros computadores da rede. O que precisamos fazer é clicar no ícone do WAMP Server e clicar na opção "Put Online".

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-02-23-wamp-server-online.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">WAMP Server online</figcaption>
</figure>

O WAMP Server irá reiniciar e pronto, está configurado para ser acessado por outros computadores da rede.

## Otimizando o wamp server

Para desenvolver sem futuros problemas precisamos habilitar alguns recursos, em cada modificação realizada nessa etapa o wamp irá reiniciar para efetuar as mudanças.

## Habilitando rewrite_module

Este recurso permite que as urls sejam reescritas/personalizadas, resultando em urls amigáveis, este recurso é obrigatório para o desenvolvimento com zend framework.

Clique no ícone do wamp >> Apache >> Apache modules >> marque a opção “rewrite_module”.

## Habilitando short tags do PHP

Este recurso é opcional, costuma ser utilizado na criação de scripts de visão, servindo para iniciar blocos de códigos PHP de maneira simples, apenas com <? e finalizando com ?>.

Clique no ícone do wamp >> PHP >> PHP settings >> verifique se a opção “short open tags” está marcada.

## Habilitando a extensão PDO

A extensão PDO(PHP Data Objects) é utilizada por padrão no zend framework para abstrair conexões/interações com bancos de dados.

Clique no ícone do wamp >> PHP >> PHP extensions >> verifique se as opções “php_pdo” e “php_pdo_mysql” estão marcadas, se não estiverem, marque essas opções, normalmente essas opções já estão habilitadas como padrão do wamp.

## Escolha de IDE

Essa etapa é bastante pessoal, porém, dentre as opções mais usadas para desenvolver aplicações a partir do Zend Framework, no momento de escrita desse texto, estão o Zend Studio, Eclipse PDT e Netbeans.

Para continuidade do texto, iremos optar pela IDE Zend Studio.

## Criando uma estrutura básica

Com o ambiente configurado e uma IDE escolhida, vamos criar uma estrutura básica para nossa aplicação, mas antes disso, vamos alterar o workspace(local onde os projetos são armazenados) da IDE para a pasta do servidor, se você instalou o wamp com as configurações padrões o mesmo deve estar em “C:\wamp”, a pasta do servidor onde os arquivos devem ficar é “C:\wamp\www”, logo, este será nosso workspace, para alterar o workspace do zend studio siga os passos abaixo:

File >> Switch Workspace >> other, selecione C:\wamp\www e clique no botão “OK”, será necessário reiniciar a IDE.

O zend studio trabalha com perspectivas, ambientes customizados de desenvolvimento, localizadas no canto superior direito da tela, durante o desenvolvimento utilizando zend framework recomendo selecionar a perspectiva “Zend Framework perspective”, para alterar sua perspectiva siga os passos a seguir:

Clique no ícone “Open perspective” >> selecione “Zend Framework Perspective”.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-02-23-zend-studio-perspective.png' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Escolha de perspectiva</figcaption>
</figure>

Com a perspectiva Zend Framework, criar uma estrutura básica se torna simples, siga os passos a seguir.

File >> New >> Zend Framework Project, irá aparecer a seguinte tela:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-02-23-project-creation.png' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Criando projeto no Zend Studio</figcaption>
</figure>

Após preencher o nome da aplicação, nesse caso “example-application” e clicar no botão “finish” o zend studio irá criar a estrutura de diretórios abaixo.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-02-23-application-structure.png' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

Confira uma breve descrição de cada diretório dessa estrutura:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Diretório</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>application</td>
        <td>Núcleo da aplicação, onde ficam os principais arquivos e diretórios.</td>
      </tr>
      <tr>
        <td>controllers</td>
        <td>Local onde são armazenados os controles da aplicação.</td>
      </tr>
      <tr>
        <td>models</td>
        <td>Armazena os modelos da aplicação.</td>
      </tr>
      <tr>
        <td>views</td>
        <td>Armazena os scripts de visão da aplicação.</td>
      </tr>
      <tr>
        <td>configs</td>
        <td>Diretório destinado aos arquivos de configuração.</td>
      </tr>
      <tr>
        <td>library</td>
        <td>Diretório destinado a bibliotecas externas e arquivos do framework.</td>
      </tr>
      <tr>
        <td>public</td>
        <td>Armazena os arquivos públicos da aplicação, imagens, etc.</td>
      </tr>
    </tbody>
  </table>
</div>

Estes são os diretórios padrões, mas nada impede você de criar novos diretórios para determinadas finalidades.

## Configurando os arquivos do Zend Framework

Baixe o zend framework, no site existem duas versões do framework, full e minimal, sendo que a versão full conta com arquivos complementares, exemplos e arquivos de tradução, já a versão minimal conta apenas com os arquivos básicos do framework, neste momento recomendo a versão minimal.

Após realizar o download, precisamos copiar a pasta Zend que se encontra no arquivo baixado e colar na pasta Library do projeto, confira o resultado da estrutura ao realizar essa etapa.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-02-23-zend-framework-library.png' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto com Zend Framework</figcaption>
</figure>

Sem os arquivos do framework nossa aplicação não irá funcionar, estes arquivos são o motor da aplicação, sendo assim essa etapa é indispensável.

## Testando nossa aplicação básica

Se tudo foi configurado corretamente, ao acessar nossa aplicação, http://localhost/example-application/public, será exibida uma página de boas vindas do zend framework.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-02-23-zend-framework-homepage.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Página inicial do Zend Framework</figcaption>
</figure>

Esse exemplo é apenas para fins didáticos, em uma estrutura MVC apenas o conteúdo da pasta public(index.php, imagens, css, js) deve ficar acessível ao usuário, os controllers, modelos, etc, devem ficar fora do diretório público do servidor.