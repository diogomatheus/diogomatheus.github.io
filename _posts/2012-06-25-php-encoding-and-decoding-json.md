---
image: "assets/images/posts/shared-image/2012-06-25-php-encoding-and-decoding-json.jpg"
i18n: "PHP - Encoding and decoding JSON"
title: "PHP - Codificando e decodificando JSON"
slug: "php-codificando-e-decodificando-json"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/trabalhando-com-json-no-php/"
---
JSON, JavaScript Object Notation, é um formato para transferência de dados, um subconjunto da notação de objeto de JavaScript, mas seu uso não requer JavaScript exclusivamente, podendo ser utilizado para comunicação entre aplicações por exemplo.

Se você acompanhou o artigo sobre serialização de dados no PHP não terá dificuldades para entender como funciona o processo de codificação e decodificação, afinal o que fazemos é serializar informações/dados, mas diferente da serialização apresentada anteriormente, podemos manipular informações codificadas/serializadas em formato JSON no lado do cliente utilizando JavaScript, caso seja necessário.

O formato JSON tem como fator chave de seu uso difundido sua simplicidade, sendo uma ótima alternativa ao XML. Empresas como Google e Yahoo adotaram o formato JSON para ambientes de grande troca de informação, cliente/servidor, evitando processamentos desnecessários, optando pela simplicidade do formato JSON para servir milhões de usuários.

## Exemplo de um objeto JSON

O formato JSON é construído através de duas estruturas.

Coleção de pares chave/valor, que na maioria das linguagens é reconhecido como um objeto, struct, dicionário, tabela hash ou array associativo.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-06-25-json-object.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Description</figcaption>
</figure>

Lista ordenada de valores, que na maioria das linguagens é reconhecido como um array, vetor, lista ou sequence.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2012-06-25-json-array.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Description</figcaption>
</figure>

Estas são estruturas de dados universais, praticamente todas as linguagens de programação modernas suportam essas estruturas de alguma forma. Faz sentido que um formato de dados que é permutável com linguagens de programação utilize essas estruturas.

[Confira todos os detalhes de sintaxe do formato JSON](http://www.json.org/)

## Funções disponíveis no PHP

{% highlight plaintext %}
string json_encode ( mixed $value )
{% endhighlight %}

Função responsável pela codificação de um determinado valor em string, semelhante ao método serialize(), mas retorna uma string contendo a representação json de um determinado valor. Podemos codificar qualquer tipo de valor, exceto resource.

Esta função funciona somente com dados que utilizam codificação UTF-8.

{% highlight php %}
<?php
$array = array ('name' => "Diogo Matheus", 'age' => 23);
echo json_encode($array);
// Resultado: {"name":"Diogo Matheus","age":23}
?>
{% endhighlight %}

Confira todos os detalhes da função json_encode
http://www.php.net/manual/pt_BR/function.json-encode.php

{% highlight plaintext %}
mixed json_decode ( string $json [, bool $assoc ] )
{% endhighlight %}

Função responsável pela análise e decodificação de uma string contendo uma representação json, retornando um objeto ou um array associativo. Normalmente será retornado um objeto, mas para retornar um array associativo, informamos o segundo parâmetro, que é opcional, como true.

Esta função irá retorna false se o dado codificado JSON possui mais que 127 elementos.

{% highlight php %}
<?php
$json = '{"name":"Diogo Matheus","age":23}';
 
var_dump(json_decode($json));
/* Resultado:
 * object(stdClass)[1]
 * public 'name' => string 'Diogo Matheus' (length=13)
 * public 'age' => int 23
 */
 
var_dump(json_decode($json, true));
/* Resultado:
 * array
 * 'name' => string 'Diogo Matheus' (length=13)
 * 'age' => int 23
 */
?>
{% endhighlight %}

[Confira todos os detalhes da função json_decode](http://www.php.net/manual/pt_BR/function.json-decode.php)

{% highlight plaintext %}
int json_last_error ( void )
{% endhighlight %}

Função responsável por verificar se ocorreu erro ao utilizar as funções json_encode ou json_decode. Essa função retorna um valor inteiro, que representa um determinado erro, estes erros estão disponíveis como constantes, confira os possíveis erros:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>JSON_ERROR_NONE</td>
        <td>Nenhum erro foi encontrado.</td>
      </tr>
      <tr>
        <td>JSON_ERROR_DEPTH</td>
        <td>A profundidade máxima da pilha foi excedida.</td>
      </tr>
      <tr>
        <td>JSON_ERROR_STATE_MISMATCH</td>
        <td>Representação JSON inválida ou mal codificada.</td>
      </tr>
      <tr>
        <td>JSON_ERROR_CTRL_CHAR</td>
        <td>Erro no caractere de controle, valor mal codificado.</td>
      </tr>
      <tr>
        <td>JSON_ERROR_SYNTAX</td>
        <td>Erro na sintaxe do valor informado.</td>
      </tr>
      <tr>
        <td>JSON_ERROR_UTF8</td>
        <td>Erro na codificação do valor informado.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight php %}
<?php
// JSON com formatação errada, utilizando ' ao invés de "
$json = "{'name': 'Diogo Matheus'}";

json_decode($json);
switch (json_last_error()) {
    case JSON_ERROR_NONE:
        echo 'No errors';
        break;
    case JSON_ERROR_DEPTH:
        echo 'Maximum stack depth exceeded';
        break;
    case JSON_ERROR_STATE_MISMATCH:
        echo 'Underflow or the modes mismatch';
        break;
    case JSON_ERROR_CTRL_CHAR:
        echo 'Unexpected control character found';
        break;
    case JSON_ERROR_SYNTAX:
        echo 'Syntax error, malformed JSON';
        break;
    case JSON_ERROR_UTF8:
        echo 'Malformed UTF-8 characters, possibly incorrectly encoded';
        break;
    default:
        echo 'Unknown error';
        break;
}
// Resultado: Syntax error, malformed JSON
?>
{% endhighlight %}

[Confira todos os detalhes da função json_last_error](http://www.php.net/manual/pt_BR/function.json-last-error.php)

## Referência(s)

- [http://www.json.org/]()
- [Documentação oficial, json_encode](http://www.php.net/manual/pt_BR/function.json-encode.php)
- [Documentação oficial, json_decode](http://www.php.net/manual/pt_BR/function.json-decode.php)
- [Documentação oficial, json_last_error](http://www.php.net/manual/pt_BR/function.json-last-error.php)