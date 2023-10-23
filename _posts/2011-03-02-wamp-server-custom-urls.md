---
image: "assets/images/posts/shared-image/2011-03-02-wamp-server-custom-urls.jpg"
i18n: "WAMP server custom URLs"
title: "URLs customizadas no servidor WAMP"
slug: "urls-customizadas-no-servidor-wamp"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/personalizando-urls-locais-no-wamp-server/"
---
Neste artigo vamos personalizar o acesso a estrutura criada no último post, Preparando o ambiente para desenvolvimento com zend framework, deixando nossas urls mais simples, não é algo que vai influenciar o nosso desenvolvimento, sendo assim fique a vontade em optar por fazer ou não essa personalização de url.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-application-structure.png' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

No artigo anterior fizemos uma configuração básica para rodar uma aplicação usando zend framework, agora iremos aprender a personalizar a url de acesso dessas aplicações, configurando o wamp, vamos adicionar Alias(apelidos) para as urls, veremos dois formatos de Alias, padrão e personalizado(usando virtual hosts).

Nesse artigo o nome da aplicação será “application”.

## Alias padrão

Este tipo de alias é padrão do wamp, muito simples de fazer, vamos deixar a url no seguinte formato: http://localhost/example, retirando o public, não aconselho a adicionar o Alias com o mesmo nome da aplicação, porque confunde o wamp, uma demonstração do que não devemos fazer nesse caso é adicionar um Alias http://localhost/application, porque nossa aplicação já se chama “application”.

1º – clique no ícone do wamp server >> Apache >> Alias directories >> Add an alias

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-add-alias-option.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Opção de adicionar alias</figcaption>
</figure>

2º – a tela abaixo irá aparecer para você digitar o nome do alias(apelido) que você deseja criar, no nosso caso será “example” e aperte enter.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-alias-path.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Informando nomenclatura do alias</figcaption>
</figure>

3º – informe o local(diretório) em que está o conteúdo que você deseja exibir através do alias, nesse caso, aproveitando a estrutura do tópico anterior, nossa aplicação se chama “application” e está dentro da pasta padrão do wamp(www), c:/wamp/www/application/public e aperte enter.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-alias-directory.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Informando diretório do alias</figcaption>
</figure>

4º – irá aparecer a mensagem “alias criado, aperte “enter” para sair”, pronto o alias padrão está criado.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-alias-created.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Mensagem de sucesso</figcaption>
</figure>

5º – editando o arquivo “.htaccess”

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-edit-htaccess-option.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Opção de editar .htaccess do WAMP Server</figcaption>
</figure>

Com isso o arquivo .htaccess vai abrir no notepad, esse arquivo foi criado pela estrutura do zend framework no momento em que criamos o projeto no tópico passado, caso ele não exista por algum motivo o wamp irá perguntar se deseja cria-lo, deixe o mesmo com o conteúdo abaixo, lembrando que para esse formato de Alias, a linha RewriteBase muda de acordo com o nome dado ao Alias, para o próximo Alias que vamos apresentar(Alias Personalizado) essa linha não deve exister no arquivo .htaccess.

{% highlight plaintext %}
SetEnv APPLICATION_ENV development
 
RewriteEngine On
RewriteBase /example/
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]
RewriteRule ^.*$ index.php [NC,L]
{% endhighlight %}

6º – teste o alias criado abrindo seu navegador e digitando o seguinte endereço: http://localhost/example

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-zend-framework-homepage.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Página inicial do Zend Framework</figcaption>
</figure>

O resultado deve ser a página inicial da aplicação, nesse caso a página padrão do zend framework.

## Alias personalizado (Virtual hosts)

O Alias personalizado exige um pouco mais de configuração e permite remover até a chamada ao “localhost”, o resultado desse formato será, http://zf.example

1º – editar o arquivo “hosts”, localizado em C:\Windows\System32\drivers\etc, deixando o conteúdo a seguir:

{% highlight plaintext %}
# localhost name resolution is handled within DNS itself.
127.0.0.1       localhost
 
# example domain
127.0.0.1       zf.example
{% endhighlight %}

Para editar este arquivo é necessário permissão de administrador, caso você esteja editando pelo notepad e não conseguir salvar por cima do arquivo existente,, salve na área de trabalho e depois copie por cima do arquivo atual, assim pedirá permissão de administrador para continuar e irá funcionar, lembrando é um arquivo, não tem extensão, caso salve como .txt, remova a extensão depois de salvar, para virar ‘arquivo’.

2º – editar o arquivo “httpd.conf”, localizado em C:\wamp\bin\apache\apache2.2.6\conf

Ao abrir este arquivo, use o localizador(ctrl + f) para achar a palavra “vhosts”

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-htaccess-find-vhosts.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Localizar palavra vhosts</figcaption>
</figure>

Como podemos observar na imagem acima, a linha está comentada(iniciando com ‘#’), retire o ‘#’ e salve o arquivo, isso irá habilitar a configuração de virtual hosts.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-htaccess-remove-comment.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado após remoção do #</figcaption>
</figure>

3º – editar o arquivo “httpd-vhosts.conf”, localizado em C:\wamp\bin\apache\apache2.2.6\conf\extra, deixando o conteúdo a seguir:

{% highlight plaintext %}
# Use name-based virtual hosting.
NameVirtualHost *:80
 
#
# VirtualHost example:
# Almost any Apache directive may go into a VirtualHost container.
# The first VirtualHost section is used for all requests that do not
# match a ServerName or ServerAlias in any <VirtualHost> block.
#
 
# localhost
NameVirtualHost localhost:80
<VirtualHost 127.0.0.1>
  DocumentRoot c:/wamp/www
  ServerName localhost
  ServerAlias localhost
</VirtualHost>
 
# example domain
NameVirtualHost zf.example
<VirtualHost 127.0.0.1:80>
  ServerName zf.example
  ServerAlias zf.example
  DocumentRoot c:/wamp/www/application/public
  ErrorLog "c:/wamp/www/application/public/error.log"
  CustomLog c:/wamp/www/application/public/access.log common
  <Directory "c:/wamp/www/application/public">
    Options -Indexes FollowSymLinks MultiViews
    AllowOverride All
    <IfModule mod_access.c>
      Order allow,deny
      Allow from all
    </IfModule>
  </Directory>
</VirtualHost>
{% endhighlight %}

4º – reiniciar o wamp server

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-wamp-server-restart.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Opção de reiniciar do WAMP Server</figcaption>
</figure>

5º – Confirmando o conteúdo do arquivo .htaccess, localizado em C:\wamp\www\application\public, o mesmo deve ficar com o conteúdo seguir:

{% highlight plaintext %}
SetEnv APPLICATION_ENV development
 
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]
RewriteRule ^.*$ index.php [NC,L]
{% endhighlight %}

6º – teste o alias personalizado(virtual host), abra seu navegador e digite o endereço http://zf.example

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-03-02-zend-framework-homepage.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Página inicial do Zend Framework</figcaption>
</figure>

O resultado deve ser a página inicial da aplicação, nesse caso a página padrão do zend framework.

Para adicionar outro alias personalizado(virtual host), basta editar os arquivos do 1º e 3º passo, duplicando o conteúdo abaixo de #example domain, editando o nome e localização do diretório, veja o exemplo abaixo:

Arquivo hosts
{% highlight plaintext %}
# nome domain
127.0.0.1       zf.nome
{% endhighlight %}

Arquivo httpd-vhosts.conf
{% highlight plaintext %}
# nome domain
NameVirtualHost zf.nome
<VirtualHost 127.0.0.1:80>
  ServerName zf.nome
  ServerAlias zf.nome
  DocumentRoot localização
  ErrorLog "localização/error.log"
  CustomLog localização/access.log common
  <Directory "localização">
    Options -Indexes FollowSymLinks MultiViews
    AllowOverride All
    <IfModule mod_access.c>
      Order allow,deny
      Allow from all
    </IfModule>
  </Directory>
</VirtualHost>
{% endhighlight %}