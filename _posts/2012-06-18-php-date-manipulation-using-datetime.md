---
image: "assets/images/posts/shared-image/2012-06-18-php-date-manipulation-using-datetime.jpg"
i18n: "PHP - Date manipulation using DateTime"
title: "PHP - Manipulação de datas usando DateTime"
slug: "php-manipulacao-de-datas-usando-datetime"
categories: [ "Programação" ]
tags: [ "featured" ]
redirect_from:
  - "/blog/php/trabalhando-com-datas-no-php/"
---
Trabalhar com manipulação de datas no PHP já foi uma grande dor de cabeça, antigamente era necessário decorar diversas funções e mesmo assim não era possível realizar algumas operações, como por exemplo, comparação de datas.

Neste artigo iremos conhecer algumas funções antigas, mas vamos focar na classe DateTime, que a partir da versão 5.3 do PHP apresentou funcionalidades interessantes. Independente do recurso utilizado, precisamos conhecer alguns conceitos que estão presente em ambas as opções, como os parâmetros utilizados para formatação de datas.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Caractere</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>d</td>
        <td>Dia do mês (2 dígitos)</td>
      </tr>
      <tr>
        <td>D</td>
        <td>Dia do mês (Representação textual, Mon até Sun)</td>
      </tr>
      <tr>
        <td>m</td>
        <td>Mês (2 dígitos)</td>
      </tr>
      <tr>
        <td>M</td>
        <td>Mês (Representação textual, Jan até Dec)</td>
      </tr>
      <tr>
        <td>y</td>
        <td>Ano (2 dígitos)</td>
      </tr>
      <tr>
        <td>Y</td>
        <td>Ano (4 dígitos)</td>
      </tr>
      <tr>
        <td>l</td>
        <td>Dia do mês (Representação textual, Sunday até Saturday)</td>
      </tr>
      <tr>
        <td>h</td>
        <td>Hora (12 horas)</td>
      </tr>
      <tr>
        <td>H</td>
        <td>Hora (24 horas)</td>
      </tr>
      <tr>
        <td>i</td>
        <td>Minutos (2 dígitos)</td>
      </tr>
      <tr>
        <td>s</td>
        <td>Segundos (2 dígitos)</td>
      </tr>
      <tr>
        <td>a</td>
        <td>am ou pm</td>
      </tr>
      <tr>
        <td>A</td>
        <td>AM ou PM</td>
      </tr>
    </tbody>
  </table>
</div>

[Confira todos os parâmetros disponíveis para formatação de data](http://br.php.net/manual/en/function.date.php#refsect1-function.date-parameters)

## Manipulando datas no estilo Old School

Algumas funções para manipulação de datas já existem há algum tempo e foram sendo melhoradas a cada nova versão do PHP, dentre as principais funções podemos citar, date, time, mktime e strtotime.

A função date tem como objetivo formatar uma data, baseando-se em um timestamp, caso este não seja informado, o valor da data atual será utilizado.

{% highlight plaintext %}
string date ( string $format [, int $timestamp = time() ] )
{% endhighlight %}

Exemplo:

{% highlight php %}
<?php
echo date('d/m/Y');
// Resultado: 09/06/2012
echo date('H:i:s');
// Resultado: 23:19:04
echo date('Y-m-d H:i:s');
// Resultado: 2012-06-09 23:19:04
?>
{% endhighlight %}

A função time tem como objetivo retornar o timestamp da data atual.

{% highlight plaintext %}
int time ( void )
{% endhighlight %}

Exemplo:

{% highlight php %}
<?php
$timestamp = time();
echo $timestamp;
// Resultado: 1339294887
echo date('d/m/Y H:i:s', $timestamp);
// Resultado: 09/06/2012 23:21:27
?>
{% endhighlight %}

A função mktime tem como objetivo retornar o timestamp de uma data específica, que pode ser datas antigas ou futuras.

{% highlight plaintext %}
int mktime ([ int $hour = date("H") [, int $minute = date("i")
[, int $second = date("s") [, int $month = date("n")
[, int $day = date("j") [, int $year = date("Y") [, int $is_dst = -1 ]]]]]]] )
{% endhighlight %}

Exemplo:

{% highlight php %}
<?php
$timestamp = mktime(18, 30, 00, 10, 11, 1988);
echo $timestamp;
// Resultado: 592608600
echo date('d/m/Y H:i:s', $timestamp);
// Resultado: 11/10/1988 18:30:00
?>
{% endhighlight %}

A função strtotime tem como objetivo retornar o timestamp de uma data em sua representação textual, essa função é muito utilizada para resgatar datas do banco de dados e também permite realizar operações simples como adicionar e subtrair períodos de tempo.

{% highlight plaintext %}
int strtotime ( string $time [, int $now = time() ] )
{% endhighlight %}

Exemplo:

{% highlight php %}
<?php
$date = '1988-10-11 18:30:00';
$timestamp1 = strtotime($date);
$timestamp2 = strtotime('+1 day', $timestamp1);
echo $timestamp1;
// Resultado: 592597800
echo $timestamp2;
// Resultado: 592684200
echo date('d/m/Y H:i:s', $timestamp1);
// Resultado: 11/10/1988 18:30:00
echo date('d/m/Y H:i:s', $timestamp2);
// Resultado: 12/10/1988 18:30:00
?>
{% endhighlight %}

Timestamp é uma forma de controlar o tempo como uma execução total de segundos. Esta contagem começa no Unix Epoch em 01 de janeiro de 1970. Portanto, o timestamp é o intervalo em segundos entre essa data inicial e uma data qualquer.

## Manipulando datas com DateTime

Para acabar com as dores de cabeça, foi lançado na versão 5.2 e aperfeiçoado na versão 5.3 a classe DateTime, que conta com as seguintes classes auxiliares, DateInterval, DatePeriod e DateTimeZone. O grande objetivo dessas classes é padronizar a maneira de se trabalhar com datas no PHP, o que antes era confuso e desorganizado agora ficou simples. Também foram adicionadas funcionalidades interessantes, como por exemplo, comparação de datas, que antes exigia certa gambiarra para ser realizada onde cada pessoa programava sua própria solução.

Quem estava acostumado a trabalhar com as funções que já existiam, não terá dificuldades em utilizar a classe DateTime, afinal muitos recursos são os mesmos como veremos a seguir.

## DateTime

Classe principal que conta com uma série de métodos para manipulação de datas, além disso também possui [constantes com padrões para formatação de datas](http://br.php.net/manual/en/class.datetime.php#datetime.constants.types), como por exemplo, para cookie e rss.

{% highlight plaintext %}
public __construct ([ string $time = "now" [, DateTimeZone $timezone = NULL ]] )
{% endhighlight %}

O método construtor da classe DateTime trabalha com os mesmos recursos da função strtotime, além de aceitar um parâmetro adicional para informar um determinado timezone, uma instância da classe DateTimeZone.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Método</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>add</td>
        <td>Adiciona intervalo de tempo.</td>
      </tr>
      <tr>
        <td>sub</td>
        <td>Subtrai intervalo de tempo.</td>
      </tr>
      <tr>
        <td>diff</td>
        <td>Retorna intervalo de tempo entre duas datas.</td>
      </tr>
      <tr>
        <td>format</td>
        <td>Retorna data formatada, semelhante a função date().</td>
      </tr>
      <tr>
        <td>setDate</td>
        <td>Informa dia, mês e ano.</td>
      </tr>
      <tr>
        <td>setTime</td>
        <td>Informa hora, minuto e segundo.</td>
      </tr>
      <tr>
        <td>setTimestamp</td>
        <td>Informa uma data por um determinado timestamp.</td>
      </tr>
      <tr>
        <td>getTimestamp</td>
        <td>Resgata timestamp de uma determinada data.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight php %}
<?php
// Resgatando data atual, baseado no timezone do php
$date_default = new DateTime();
 
// Exemplos de resgate no estilo strtotime
$date_oct = new DateTime('1988-10-11 18:30:00');
$date_tomorrow = new DateTime('+1 day');
 
// Formatando datas
echo $date_oct->format('d/m/Y H:i:s');
// Resultado: 11/10/1988 18:30:00
echo $date_oct->format(DATE_RSS);
// Resultado: Tue, 11 Oct 1988 18:30:00 +0000
?>
{% endhighlight %}

[Confira todos os detalhes da classe DateTime](http://br.php.net/manual/en/class.datetime.php)

## DateInterval

Classe auxiliar responsável pela representação de intervalos, essa classe possui um estilo próprio para definição dos intervalos, confira as peças disponíveis para construção dos intervalos.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Caractere</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>P</td>
        <td>Representa período, vem antes de dia, mês, ano e semana.</td>
      </tr>
      <tr>
        <td>Y</td>
        <td>Representação de anos.</td>
      </tr>
      <tr>
        <td>M</td>
        <td>Representação de meses.</td>
      </tr>
      <tr>
        <td>D</td>
        <td>Representação de dias.</td>
      </tr>
      <tr>
        <td>W</td>
        <td>Representação de semanas.</td>
      </tr>
      <tr>
        <td>T</td>
        <td>Representa tempo, vem antes de hora, minuto e segundo.</td>
      </tr>
      <tr>
        <td>H</td>
        <td>Representação de horas.</td>
      </tr>
      <tr>
        <td>M</td>
        <td>Representação de minutos.</td>
      </tr>
      <tr>
        <td>S</td>
        <td>Representação de segundos.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight php %}
<?php
// Resgatando data atual baseado no timezone do php
$date = new DateTime();
// Adicionando 15 dias
$date->add(new DateInterval("P15D"));
// Adicionando 2 anos
$date->add(new DateInterval("P2Y"));
// Adicionando 1 ano, 2 meses, 10 dias e 30 minutos
$date->add(new DateInterval("P1Y2M10DT30M"));
?>
{% endhighlight %}

[Confira todos os detalhes da classe DateInterval](http://br.php.net/manual/en/class.dateinterval.php)

## DatePeriod

Classe auxiliar responsável pela representação de períodos, costuma ser utilizada para verificar o número de ocorrências de um determinado período entre duas datas, também utiliza o padrão de definição da classe DateInterval.

{% highlight php %}
<?php
$date_begin = new DateTime('1988-10-11');
$date_end = new DateTime('1994-10-11');
 
// Definimos o intervalo de 1 ano
$interval = new DateInterval('P1Y');
 
// Resgatamos datas de cada ano entre data de início e fim
$period = new DatePeriod($date_begin, $interval, $date_end);
 
foreach($period as $date) {
    echo $date->format("d/m/Y") . '<br />' . PHP_EOL;
}
/**
 * Resultado:
 * 11/10/1988
 * 11/10/1989
 * 11/10/1990
 * 11/10/1991
 * 11/10/1992
 * 11/10/1993
 */
?>
{% endhighlight %}

[Confira todos os detalhes da classe DataPeriod](http://br.php.net/manual/en/class.dateperiod.php)

## DateTimeZone

Classe auxiliar que representa um timezone, ou seja, localidade que servirá como base para manipulação de datas.

{% highlight php %}
<?php
// Resgatando data atual, baseado no timezone informado
$timezone = new DateTime(
  'now',
  new DateTimeZone('America/Sao_Paulo')
);
?>
{% endhighlight %}

[Confira todos os detalhes da classe DateTimeZone](http://br.php.net/manual/en/class.datetimezone.php)

## Comparação de datas

{% highlight php %}
<?php
$one = new DateTime('1988-10-11');
$two = new DateTime('2012-06-12');
if ($one < $two) {
    echo "{$one->format('d/m/Y')} < {$two->format('d/m/Y')}";
} else if ($one > $two) {
    echo "{$one->format('d/m/Y')} > {$two->format('d/m/Y')}";
} else if ($one == $two) {
    echo "{$one->format('d/m/Y')} == {$two->format('d/m/Y')}";
}
?>
{% endhighlight %}

## Intervalo entre datas

{% highlight php %}
<?php
$one= new DateTime('2012-06-01');
$two = new DateTime('2012-06-12');
 
// Resgata diferença entre as datas
$dateInterval = $one->diff($two);
echo $dateInterval->days;
// Resultado: 11
?>
{% endhighlight %}

## Manipulação de datas

{% highlight php %}
<?php
// Cria uma data no estilo strtotime
$date = new DateTime('2012-06-12');
echo $date->format('d/m/Y');
// Resultado: 12/06/2012
 
// Adiciona 2 semanas
$date->add(new DateInterval('P2W'));
echo $date->format('d/m/Y');
// Resultado: 26/06/2012
 
// Subtrai 1 mês e 5 dias
$date->sub(new DateInterval('P1M5D'));
echo $date->format('d/m/Y');
// Resultado: 21/05/2012
?>
{% endhighlight %}

## Trabalhando com datas no PHP

Agora que conhecemos um pouco sobre a classe DateTime construiremos uma máquina do tempo, calma, será apenas uma calculadora onde poderemos realizar algumas operações como adicionar, subtrair e comparar datas.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="first-tab" data-toggle="tab" data-target="#datetime-code-tabpanel" type="button" role="tab" aria-controls="datetime-code-tabpanel" aria-selected="true">datetime.php</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="index-code-tab" data-toggle="tab" data-target="#index-code-tabpanel" type="button" role="tab" aria-controls="index-code-tabpanel" aria-selected="false">index.html</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="result-code-tab" data-toggle="tab" data-target="#result-code-tabpanel" type="button" role="tab" aria-controls="result-code-tabpanel" aria-selected="false">result.html</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="datetime-code-tabpanel" role="tabpanel" aria-labelledby="datetime-code-tab">

{% highlight php %}
<?php
// Funções para construção de data e intervalo
function buildDateTime($hour, $minute, $second, $month, $day, $year) {
  $timestamp = mktime($hour, $minute, $second, $month, $day, $year);
  $date = new DateTime("now", new DateTimeZone('America/Sao_Paulo'));
  $date->setTimestamp($timestamp);
  return $date;
}
 
function buildDateInterval($hour, $minute, $second, $month, $day, $year) {
  $interval = "P{$year}Y{$month}M{$day}D";
  $interval .= "T{$hour}H{$minute}M{$second}S";
  return new DateInterval($interval);
}
 
// Função para simplificar resgate de informações
function getPostParam($name) {
  return !isset($_POST[$name]) ? 0 : (int) $_POST[$name];
}
 
// Resgatar valores
$hourOne = getPostParam('hourOne');
$minuteOne = getPostParam('minuteOne');
$secondOne = getPostParam('secondOne');
$monthOne = getPostParam('monthOne');
$dayOne = getPostParam('dayOne');
$yearOne = getPostParam('yearOne');
 
$operationType = $_POST['operationType'];
 
$hourTwo = getPostParam('hourTwo');
$minuteTwo = getPostParam('minuteTwo');
$secondTwo = getPostParam('secondTwo');
$monthTwo = getPostParam('monthTwo');
$dayTwo = getPostParam('dayTwo');
$yearTwo = getPostParam('yearTwo');
 
// Monta datas e intervalo
$dateOne = buildDateTime($hourOne, $minuteOne, $secondOne, $monthOne, $dayOne, $yearOne);
 
$intervalTwo = buildDateInterval($hourTwo, $minuteTwo, $secondTwo, $monthTwo, $dayTwo, $yearTwo);

$dateTwo = buildDateTime($hourTwo, $minuteTwo, $secondTwo, $monthTwo, $dayTwo, $yearTwo);
 
// Verifica tipo de operação e calcula resultado
switch ($operationType) {
  case 'A':
    $dateOne->add($intervalTwo);
    $resultado = "O resultado da adição é {$dateOne->format('d/m/Y H:i:s')}.";
    break;
  case 'S':
    $dateOne->sub($intervalTwo);
    $resultado = "O resultado da subtração é {$dateOne->format('d/m/Y H:i:s')}.";
    break;
  case 'D':
    $diff = $dateOne->diff($dateTwo);
    $resultado = "A diferença entre as datas é de ";
    $resultado .= "{$diff->format('%d Dias')} ";
    $resultado .= "{$diff->format('%m Meses')} ";
    $resultado .= "{$diff->format('%y Anos')} ";
    $resultado .= "{$diff->format('%h Horas')} ";
    $resultado .= "{$diff->format('%i Minutos')} ";
    $resultado .= "{$diff->format('%s Segundos')}.";
    break;
  case 'C':
    if($dateOne == $dateTwo) {
      $resultado = "As datas informadas são iguais.";
    } else if($dateOne > $dateTwo) {
      $resultado = "{$dateOne->format('d/m/Y H:i:s')} é maior que {$dateTwo->format('d/m/Y H:i:s')}.";
    } else {
      $resultado = "{$dateTwo->format('d/m/Y H:i:s')} é maior que {$dateOne->format('d/m/Y H:i:s')}.";
    }
    break;
}
 
// Realizar cálculo de datas
require_once('result.phtml');
?>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="index-code-tabpanel" role="tabpanel" aria-labelledby="index-code-tab">

{% highlight html %}
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Máquina do Tempo</title>
    <style type="text/css">
      <!--
      .simple {
          width: 25px;
      }
      .full {
          width: 50px;
      }
      -->
    </style>
  </head>
  <body>
    <h2>Máquina do Tempo</h2>
    <form action="datetime.php" method="post">
      <div id="firstDate">
        Dia: <input type="text" name="dayOne"class="simple" />
        Mês: <input type="text" name="monthOne"class="simple" />
        Ano: <input type="text" name="yearOne"class="full" /> &nbsp;
        Hora: <input type="text" name="hourOne"class="simple" />
        Minuto: <input type="text" name="minuteOne"class="simple" />
        Segundo: <input type="text" name="secondOne"class="simple" />
      </div>
      <br />
      <div id="operationType">
        Tipo de operação:
        <select name="operationType">
          <option value="A">Adição</option>
          <option value="S">Subtração</option>
          <option value="D">Diferença</option>
          <option value="C">Comparação</option>
        </select>
      </div>
      <br />
      <div id="secondDate">
        Dia: <input type="text" name="dayTwo"class="simple" />
        Mês: <input type="text" name="monthTwo"class="simple" />
        Ano: <input type="text" name="yearTwo"class="full" /> &nbsp;
        Hora: <input type="text" name="hourTwo"class="simple" />
        Minuto: <input type="text" name="minuteTwo"class="simple" />
        Segundo: <input type="text" name="secondTwo"class="simple" />
      </div>
      <br />
      <input type="submit" value="Calcular" />
    </form>
  </body>
</html>
{% endhighlight %}

  </div>
  <div class="tab-pane" id="result-code-tabpanel" role="tabpanel" aria-labelledby="result-code-tab">

{% highlight html %}
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Resultado - Máquina do Tempo</title>
</head>
<body>
  <h2>Resultado</h2>
  <p><?php echo $resultado; ?></p>
</body>
</html>
{% endhighlight %}

  </div>
</div>

## Resultado

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="interface-tab" data-toggle="tab" data-target="#interface-tabpanel" type="button" role="tab" aria-controls="interface-tabpanel" aria-selected="true">Interface</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="comparison-tab" data-toggle="tab" data-target="#comparison-tabpanel" type="button" role="tab" aria-controls="comparison-tabpanel" aria-selected="false">Comparação</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="difference-tab" data-toggle="tab" data-target="#difference-tabpanel" type="button" role="tab" aria-controls="difference-tabpanel" aria-selected="false">Diferença</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="interface-tabpanel" role="tabpanel" aria-labelledby="interface-tab">
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2012-06-18-interface.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Interface</figcaption>
    </figure>
  </div>
  <div class="tab-pane" id="comparison-tabpanel" role="tabpanel" aria-labelledby="comparison-tab">
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2012-06-18-comparison-result.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Resultado da comparação</figcaption>
    </figure>
  </div>
  <div class="tab-pane" id="difference-tabpanel" role="tabpanel" aria-labelledby="difference-tab">
    <figure class="figure mx-auto d-block">
      <img src="{{ '/assets/images/posts/general/2012-06-18-difference-result.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
      <figcaption class="figure-caption text-center">Resultado da diferença</figcaption>
    </figure>
  </div>
</div>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/php-datetime).

As funções para manipulação de datas normalmente se baseiam na data do servidor e no [timezone](http://php.net/manual/pt_BR/function.date-default-timezone-set.php) configurado no php.

## Referência(s)

- [Documentação oficial, Date/Time](http://br.php.net/manual/en/ref.datetime.php)