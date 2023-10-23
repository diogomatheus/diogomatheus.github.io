---
image: "assets/images/posts/shared-image/2013-11-11-setting-up-virtual-hosts-on-ubuntu-with-apache.jpg"
i18n: "Setting up virtual hosts on Ubuntu with Apache"
title: "Configurando virtual hosts no Ubuntu com Apache"
slug: "configurando-virtual-hosts-no-ubuntu-com-apache"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/ubuntu/virtual-hosts-no-ubuntu/"
---
Virtual hosts são utilizados para configurar vários domínios em um servidor, possibilitando que uma ou mais aplicações neste hospedado tenha diversos pontos de acesso diferentes, neste artigo será abordado como criar e configurar um virtual host no ubuntu.

Confira os softwares necessários para este artigo.

- Ubuntu
- Apache
- PHP

Criação do projeto

Navegue para /var/www/ no terminal e crie um diretório, nomeado de “application”.

{% highlight shell %}
cd /var/www/
sudo mkdir application
{% endhighlight %}

Navegue para /var/www/application/ e crie um arquivo, nomeado de “index.php”.

{% highlight shell %}
cd /var/www/application/
sudo nano index.php
{% endhighlight %}

Adicione o seguinte conteúdo no arquivo.

{% highlight php %}
<?php echo 'Hello World'; ?>
{% endhighlight %}

## Declaração do virtual host

Para declarar o virtual host, será preciso editar as configurações de host no ubuntu “/etc/hosts”.

{% highlight shell %}
sudo nano /etc/hosts
{% endhighlight %}

Adicione o seguinte conteúdo no final do arquivo.

{% highlight shell %}
127.0.0.1 virtual.localhost
{% endhighlight %}

Este bloco de instrução sinaliza que http://virtual.localhost representa um domínio local, este será o endereço de acesso do virtual host.

## Configuração do virtual host

Após declarar o virtual host, será necessário adicionar sua configuração no diretório /etc/apache2/sites-available/, crie um arquivo nomeado de “virtual”, sem extensão.

{% highlight shell %}
cd /etc/apache2/sites-available/
sudo nano virtual
{% endhighlight %}

Adicione o seguinte conteúdo no arquivo.

{% highlight plaintext %}
<VirtualHost *:80>
  DocumentRoot “/var/www/application/”
  ServerName virtual.localhost
  ServerAlias virtual.localhost
  ErrorLog “/var/log/apache2/virtual-error.log”
  CustomLog “/var/log/apache2/virtual-custom.log” common

  <Directory “/var/www/application/”>
    Options Includes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
  </Directory>
</VirtualHost>
{% endhighlight %}

## Ativação do virtual host

Nesse momento o virtual host já está declarado e configurado, sendo assim, basta ativá-lo.

{% highlight shell %}
sudo a2ensite virtual
{% endhighlight %}

Caso tudo tenha ocorrido corretamente na ativação, você recebeu um aviso de que é preciso reiniciar o serviço do apache, execute o seguinte comando.

{% highlight shell %}
sudo service apache2 reload
{% endhighlight %}

## Conclusão

Para testar, acesse http://virtual.localhost, se apareceu uma mensagem de “Hello World”, está tudo funcionando corretamente.