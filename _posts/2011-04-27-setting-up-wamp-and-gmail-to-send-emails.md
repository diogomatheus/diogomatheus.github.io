---
image: "assets/images/posts/shared-image/2011-04-27-setting-up-wamp-and-gmail-to-send-emails.jpg"
i18n: "Setting up WAMP and Gmail to send emails"
title: "Configurando o WAMP e Gmail para enviar emails"
slug: "configurando-o-wamp-e-gmail-para-enviar-emails"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/configurando-o-php-para-enviar-email-no-windows-atraves-do-gmail/"
---
Quem desenvolve com php no windows sempre enfrenta o problema de enviar emails usando o servidor local para testar seus scripts, para resolver esse problema nesse tutorial vamos configurar o php para enviar emails através do gmail.

Para isso vamos precisar baixar o [fake sendmail](http://glob.com.au/sendmail/) para enviar os emails e [stunnel](http://glob.com.au/sendmail/) (multiplatform SSL tunneling proxy) para utilizar o gmail.

Neste tutorial vamos utilizar o ambiente do wampserver para fazer as configurações.

## Configurando o fake sendmail

Após efetuar o download abra o arquivo sendmail.zip e extraia os arquivos, extraia os arquivos para “C:\wamp\sendmail”.

Abra o arquivo “sendmail.ini” localizado na pasta “C:\wamp\sendmail” e edite as seguintes informações:

{% highlight plaintext %}
smtp_server=localhost
smtp_port=25
smtp_ssl=auto
;default_domain=mydomain.com
error_logfile=error.log
auth_username=seuemail@gmail.com
auth_password=suasenha
force_sender=webmaster@mail.com
{% endhighlight %}

As configurações auth_username, auth_password, force_sender devem ser substituidas respectivamente por email do gmail, senha do gmail e email do webmaster(caso não tenha coloque novamente seu gmail). Linhas que iniciam com “;” são comentários, não fazem efeito, caso alguma das linhas acima (default_domain) não esteja comentada no arquivo, edite e adicione o “;” no início da linha.

Salve e feche o arquivo “sendmail.ini”.

## Configurando o stunnel

Instale o stunnel executando o arquivo baixado.

Após instalar, vá no menu iniciar >> stunnel >> edit stunnel.config, efetue as seguintes alterações:

{% highlight plaintext %}
cert = stunnel.pem
socket = l:TCP_NODELAY=1
socket = r:TCP_NODELAY=1
debug = 7
output = stunnel.log
client = yes
[ssmtp]
accept = 127.0.0.1:25
connect = smtp.gmail.com:465
{% endhighlight %}

Caso alguma dessas linhas esteja comentada, com “;” no início da linha, retire o “;” para que a linha faça efeito.

Salve e feche o arquivo.

Caso você tenha dificuldades para editar/salvar o arquivo, verifique as permissões de segurança do arquivo(propriedades >> segurança) que fica na pasta de instalção do stunnel, escolhido no momento da instalação, porque precisa da permissão de administrador para edita-lo.

Execute o stunnel, menu iniciar >> stunnel >> run stunnel.

## Configurando o php.ini

Para finalizar nossas configurações vamos editar o arquivo php.ini, abra o arquivo php.ini (clique no ícone do wamp >> PHP >> php.ini) e de um ctrl+f para localizar a palavra “smtp”, agora vamos editar o arquivo com as seguites configurações na parte [mail function]:

{% highlight plaintext %}
[mail function]
; For Win32 only.
;SMTP = localhost
;smtp_port = 25
 
; For Win32 only.
;sendmail_from = dm.matheus@gmail.com
 
; For Unix only.  You may supply arguments as well (default: "sendmail -t -i").
sendmail_path = "C:\wamp\sendmail\sendmail.exe -t"
 
; Force the addition of the specified parameters to be passed as extra parameters
; to the sendmail binary. These parameters will always replace the value of
; the 5th parameter to mail(), even in safe mode.
;mail.force_extra_parameters =
{% endhighlight %}

Salve e feche o arquivo php.ini e reinicie o servidor (clique no ícone do wamp >> Restart All Services).

O endereço do sendmail_path depende de onde você colocou o fake sendmail.

## Testando nossa configuração

Agora vamos testar nossa configuração, crie o script “sendmail.php” no servidor( C:\wamp\www ), com o conteúdo a seguir.

{% highlight php %}
<?php
  $email = 'to@email.com';
  $title = 'Testando nossa configuração';
  $message = 'Olá, nossa configuração funcionou.';

  $resultado = mail($email, $title, $message);
  if ($resultado) {
    echo 'Seu email foi enviado com sucesso.';
  } else {
    echo 'Não foi possível enviar seu email.';
  }
?
{% endhighlight %}

Edite a variável $email com o email para onde a mensagem deve ir.

Agora abra seu navegador e digite o endereço http://localhost/sendmail.php, se tudo ocorrer bem você receberá a seguinte mensagem: Seu email foi enviado com sucesso.

Verifique se o email chegou na sua caixa de entrada.