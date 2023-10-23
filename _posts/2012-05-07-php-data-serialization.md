---
image: "assets/images/posts/shared-image/2012-05-07-php-data-serialization.jpg"
i18n: "PHP - Data serialization"
title: "PHP - Serialização de dados"
slug: "php-serializacao-de-dados"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/serializacao-de-dados-no-php/"
---
Em ciência da computação, no contexto de armazenamento e transmissão de dados, serialização é o processo de salvar um objeto em um meio de armazenamento, ou transmiti-lo por uma conexão de rede, seja em forma binária ou em formato de texto. Esta série de bytes pode ser usada para recriar um objeto com o mesmo estado interno que o original.

Para exemplificar essa explicação, imagine que você está jogando seu jogo preferido, mas precisa pausar e não gostaria de começar tudo denovo, você então salva seu processo no jogo, capturando o estado atual dos itens/objetos e salvando em algum meio de armazenamento, para que posteriormente estes itens/objetos possam ser restaurados, permitindo que você continue de onde parou, alguma semelhança com a explicação anterior? Sim, você acabou de serializar objetos do seu jogo para poder continuar depois.

## Serialização de dados

O processo de serialização de dados no PHP é bastante simples, precisamos apenas da função serialize(), com está função podemos serializar diversos tipos de dados, exceto resource, ou seja, não podemos serializar uma variável que contenha uma conexão com uma base de dados, arquivo, etc.

{% highlight php %}
<?php
$information = array(1, 2, 3, 4, 5);
echo serialize($information);
// a:5:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:5;}
?>
{% endhighlight %}

Quando trabalhamos com session no PHP, os dados armazenados na sessão são automaticamente serializados.

## Restauração de dados

Para restaurar um dado serializado, precisamos utilizar a função unserialize(), que interpreta a string serializada reconstruindo um array, objeto, etc. Caso seja um objeto, sua classe precisa estar disponível no script para que o mesmo seja reconstruído corretamente.

{% highlight php %}
<?php
$serializedInformation = 'a:5:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:5;}';
var_dump(unserialize($serializedInformation));
/*
array
  0 => int 1
  1 => int 2
  2 => int 3
  3 => int 4
  4 => int 5
*/
?>
{% endhighlight %}

O método unserialize retorna false e lança uma E_NOTICE caso o argumento passado não seja uma string serializada, para retornar apenas false utilize o operador @, evitando o lançamento da E_NOTICE.

## Métodos mágicos

__sleep()

O método mágico __sleep() é invocado quando um objeto é serializado, ou seja, no momento em que executamos a função serialize() ou enviamos um objeto para uma variável de sessão. Seu objetivo é informar quais dados do objeto devem ser serializados, essa tarefa é realizada ao retornar um array com os nomes das propriedades que devem ser mantidas, o restante será ignorado, esse método é bastante utilizado para evitar a serialização de itens desnecessários ou temporários.

__wakeup()

O método mágico __wakeup() ao contrário do __sleep() tem como objetivo recuperar recursos necessários para um objeto que está sendo restaurado, este método é invocado quando utilizamos a função unserialize() ou quando resgatamos um objeto de uma variável de sessão.

{% highlight php %}
<?php
class Player
{
  private $name;
  private $level;
  private $life;

  // get, set, etc

  public function __sleep() {
    return array(
      'name',
      'level'
    );
  }

  public function __wakeup() {
    $this->life = 100;
  }
}
?>
{% endhighlight %}

No exemplo acima criamos uma classe Player com três propriedades, name, level e life. Ao serializar um objeto dessa classe optamos por salvar apenas as propriedades name e level, como pode ser visto no método mágico __sleep(), e ao reconstruir o objeto este deve voltar com a propriedade life igual a 100, configurado no método mágico __wakeup().

## Trabalhando com serialização de dados no PHP

Agora que conhecemos um pouco sobre serialização de dados no PHP, vamos criar um exemplo.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="serialize-code-tab" data-toggle="tab" data-target="#serialize-code-tabpanel" type="button" role="tab" aria-controls="serialize-code-tabpanel" aria-selected="true">serialize.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="unserialize-code-tab" data-toggle="tab" data-target="#unserialize-code-tabpanel" type="button" role="tab" aria-controls="unserialize-code-tabpanel" aria-selected="false">unserialize.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="player-code-tab" data-toggle="tab" data-target="#player-code-tabpanel" type="button" role="tab" aria-controls="player-code-tabpanel" aria-selected="false">player.php</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="serialize-code-tabpanel" role="tabpanel" aria-labelledby="serialize-code-tab">

{% highlight php %}
<?php
include_once('Class/Player.php');
 
$player = new Player('dmatheus');
$player->setLevel(3);
$player->setLife(60);
echo $player;
 
echo '<br />' . PHP_EOL;
 
file_put_contents("player.save", serialize($player));
echo 'Player saved successfully.';
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="unserialize-code-tabpanel" role="tabpanel" aria-labelledby="unserialize-code-tab">

{% highlight php %}
<?php
include_once('Class/Player.php');
 
echo 'Loading the player information.';
echo '<br />' . PHP_EOL;
 
$data = file_get_contents('player.save');
$player = unserialize($data);
echo $player;
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="player-code-tabpanel" role="tabpanel" aria-labelledby="player-code-tab">

{% highlight php %}
<?php
class Player
{
  private $name;
  private $level;
  private $life;

  public function __construct($name) {
    $this->name = $name;
    $this->level = 1;
    $this->life = 100;
  }

  public function getName() {
    return $this->name;
  }

  public function setName($name) {
    $this->name = $name;
  }

  public function getLevel() {
    return $this->level;
  }

  public function setLevel($level) {
    $this->level = $level;
  }

  public function getLife() {
    return $this->life;
  }

  public function setLife($life) {
    $this->life = $life;
  }

  public function __sleep() {
    return array(
      'name',
      'level'
    );
  }

  public function __wakeup() {
    $this->life = 100;
  }

  public function __toString() {
    return "Player {$this->name}, level {$this->level} has {$this->life} of life.";
  }
}
?>
{% endhighlight %}

  </div>
</div>

Aproveitando a base da classe Player vista anteriormente, criamos um exemplo simulando um backup de jogo, no script serialize.php criamos um jogador/objeto ‘dmatheus’, atualizamos seu level para 3 e informamos que sua vida caiu para 60, logo em seguida exibimos as informações do jogador e serializamos o jogador/objeto, salvando em um arquivo nomeado de ‘player.save’. No script unserialize.php resgatamos as informações do arquivo ‘player.save’, reconstruímos o objeto/jogador e exibimos suas informações.

Resultado do script serialize.php

{% highlight plaintext %}
Player dmatheus, level 3 has 60 of life.
Player saved successfully.
{% endhighlight %}

Resultado do script unserialize.php

{% highlight plaintext %}
Loading the player information.
Player dmatheus, level 3 has 100 of life.
{% endhighlight %}

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/php-serialization).

Verifique se você tem permissão de escrita antes de executar os scripts do exemplo.

## Referência(s)

- [Documentação oficial, serialize](http://php.net/manual/pt_BR/function.serialize.php)
- [Documentação oficial, unserialize](https://www.php.net/manual/pt_BR/function.unserialize.php)
- [Documentação oficial, serialização de objetos](http://php.net/manual/pt_BR/language.oop5.serialization.php)