---
image: "assets/images/posts/shared-image/2012-03-19-php-regular-expressions.jpg"
i18n: "PHP - Regular expressions"
title: "PHP - Expressões regulares"
slug: "php-expressoes-regulares"
categories: [ "Programação" ]
tags: [ "featured" ]
redirect_from:
  - "/blog/php/expressoes-regulares-no-php/"
---
Expressão regular é uma forma de se especificar um padrão de texto e pode ser composta por símbolos, caracteres literais e caracteres com funções especiais, que agrupados formam uma expressão. Essa expressão é interpretada como uma regra, onde uma entrada de dados qualquer é bem sucedida somente se obedecer a essa regra.

Didaticamente podemos comparar expressões regulares com o brinquedo LEGO, onde temos várias opções de peças disponíveis e de diferentes tipos, que juntas possibilitam a construção de estruturas complexas.

Por exemplo, observe o conjunto de nomes abaixo:

{% highlight plaintext %}
{Diogo, Renato, Gomes, Thiago, Leonardo}
{% endhighlight %}

Se criarmos uma expressão regular para buscar pelo padrão “go”, sem diferenciar maiúsculas de minúsculas, ou seja, case-insensitive, iremos obter os seguintes nomes:

{% highlight plaintext %}
{Diogo, Gomes, Thiago}
{% endhighlight %}

Neste caso, todos os nomes que possuem “go” são válidos, afinal obedecem a regra, mas poderíamos ir mais além, definindo que queremos apenas os nomes que terminem com “go” ou iniciem, mas deixaremos isso mais para frente, antes conheceremos as peças disponíveis.

Geralmente expressões regulares são utilizadas no desenvolvimento de aplicações para validar entradas de dados, por exemplo, verificar se o CEP que um determinado usuário informou obedece aos padrões conhecidos de um CEP, se um email tem uma estrutura válida, etc.

## Conhecendo as peças disponíveis, os metacaracteres

Os metacaracteres estão divididos em grupos distintos, de acordo com características comuns.

## Representantes

Os metacaracteres representantes têm como função representar um ou mais caracteres, são como apelidos, todos metacaracteres deste tipo casam a posição de um único caractere.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Metacaractere</th>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>.</td>
        <td>Ponto</td>
        <td>Um caractere qualquer.</td>
      </tr>
      <tr>
        <td>[…]</td>
        <td>Lista</td>
        <td>Lista de caracteres permitidos.</td>
      </tr>
      <tr>
        <td>[^…]</td>
        <td>Lista negada</td>
        <td>Lista de caracteres proibidos.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight plaintext %}
e.tendido
Casa com: estendido, extendido, eztendido, ...
 
e[sx]tendido
Casa com: estendido, extendido
 
e[^x]tendido
Casa com: estendido, ...
Não casa com: extendido
{% endhighlight %}

Intervalo de caracteres

Os intervalos entre caracteres são representados por um traço entre dois caracteres, [0-9], [a-z], [A-Z].

{% highlight plaintext %}
[0-9]
Casa com: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
{% endhighlight %}

Classes de caracteres POSIX

São grupos definidos por tipo, POSIX é um padrão internacional que define determinado tipo de regra, sintaxe e etc.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">POSIX</th>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>[:upper:]</td>
        <td>[A-Z]</td>
        <td>Letras maiúsculas.</td>
      </tr>
      <tr>
        <td>[:lower:]</td>
        <td>[a-z]</td>
        <td>Letras minúsculas.</td>
      </tr>
      <tr>
        <td>[:alpha:]</td>
        <td>[A-Za-z]</td>
        <td>Letras maiúsculas e minúsculas.</td>
      </tr>
      <tr>
        <td>[:alnum:]</td>
        <td>[A-Za-z0-9]</td>
        <td>Letras e números.</td>
      </tr>
      <tr>
        <td>[:digit:]</td>
        <td>[0-9]</td>
        <td>Números.</td>
      </tr>
      <tr>
        <td>[:xdigit:]</td>
        <td>[0-9A-Fa-f]</td>
        <td>Números hexadecimais.</td>
      </tr>
      <tr>
        <td>[:punct:]</td>
        <td>[.,!?:…]</td>
        <td>Sinais de pontuação.</td>
      </tr>
      <tr>
        <td>[:blank:]</td>
        <td>[ \t]</td>
        <td>Espaço e TAB.</td>
      </tr>
      <tr>
        <td>[:space:]</td>
        <td>[ \t\n\r\f\v]</td>
        <td>Caracteres brancos.</td>
      </tr>
      <tr>
        <td>[:cntrl:]</td>
        <td>–</td>
        <td>Caracteres de controle.</td>
      </tr>
      <tr>
        <td>[:graph:]</td>
        <td>[^ \t\n\r\f\v]</td>
        <td>Caracteres imprimíveis.</td>
      </tr>
      <tr>
        <td>[:print:]</td>
        <td>[^\t\n\r\f\v]</td>
        <td>Imprimíveis e o espaço.</td>
      </tr>
    </tbody>
  </table>
</div>

Todas as opções a seguir são equivalentes, representando letras minúsculas, maiúsculas e números.

{% highlight plaintext %}
[A-Za-z0-9]
[[:upper:][:lower:][:digit:]]
[[:alpha:][:digit:]]
[[:alnum:]]
{% endhighlight %}

Classes de caracteres POSIX levam em conta a localidade do sistema, isso é importante para trabalhar com acentuação, ou seja, classes que trabalham com letras, englobam seus equivalentes com acentos.

## Quantificadores

Os metacaracteres quantificadores são utilizados para indicar o número de repetições permitidas para a entidade anterior, essa entidade pode ser um caractere ou metacaractere.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Metacaractere</th>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>?</td>
        <td>Opcional</td>
        <td>Zero ou um.</td>
      </tr>
      <tr>
        <td>*</td>
        <td>Asterisco</td>
        <td>Zero, um ou mais.</td>
      </tr>
      <tr>
        <td>+</td>
        <td>Mais</td>
        <td>Um ou mais.</td>
      </tr>
      <tr>
        <td>{n,m}</td>
        <td>Chaves</td>
        <td>De n até m.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight plaintext %}
Th?iago
Casa com: Thiago, Tiago
 
Diogo*
Casa com: Diog, Diogo, Diogoo, Diogooo, ...
 
Diogo+
Casa com: Diogo, Diogoo, Diogooo, ...
 
Diogo{1,2}
Casa com: Diogo, Diogoo
 
Diogo{2}
Casa com: Diogoo
{% endhighlight %}

## Âncoras

Os metacaracteres âncoras marcam uma posição específica na linha.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Metacaractere</th>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>^</td>
        <td>Circunflexo</td>
        <td>Início da linha.</td>
      </tr>
      <tr>
        <td>$</td>
        <td>Cifrão</td>
        <td>Fim da linha.</td>
      </tr>
      <tr>
        <td>\b</td>
        <td>Borda</td>
        <td>Início ou fim de palavra.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight plaintext %}
\bD[a-z]+
Casa com: Diogo, Dado, Dia, ...
 
^D[a-z]+
Casa com: Diogo, Dado, Dia, ...
 
[A-Za-z]+o$
Casa com: Thiago, Quadrado, Redondo, ...
{% endhighlight %}

Nos exemplos acima os metacaracteres \b e ^ possuem o mesmo efeito, isso porque estamos testando com palavras e nomes, em uma frase o \b verificaria palavra por palavra, já o ^ iria verificar apenas o início da frase.

## Outros

Além dos metacaracteres que vimos até agora, existem outros que possuem funções específicas e não relacionadas entre si, confira alguns abaixo:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Metacaractere</th>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>\c</td>
        <td>Escape</td>
        <td>Torna literal o caractere c.</td>
      </tr>
      <tr>
        <td>|</td>
        <td>Ou</td>
        <td>Ou um ou outro.</td>
      </tr>
      <tr>
        <td>(…)</td>
        <td>Grupo</td>
        <td>Delimita um grupo.</td>
      </tr>
      <tr>
        <td>\1…\9</td>
        <td>Retrovisor</td>
        <td>Texto casado nos grupos 1…9.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight plaintext %}
R\$
Casa com: R$
 
Diogo|Thiago
Casa com: Diogo, Thiago
 
boa-(tarde|noite)
Casa com: boa-tarde, boa-noite
 
(quero)-\1
Casa com: quero-quero
{% endhighlight %}

## Metacaracteres tipo barra-letra

São átomos representados por uma barra invertida \ seguida de uma letra qualquer, como \s. Dependendo da letra muda-se o significado do metacaractere.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Metacaractere</th>
        <th scope="col">POSIX</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>\d</td>
        <td>[[:digit:]]</td>
        <td>Digito.</td>
      </tr>
      <tr>
        <td>\D</td>
        <td>[^[:digit:]]</td>
        <td>Não-digito.</td>
      </tr>
      <tr>
        <td>\w</td>
        <td>[[:alnum:]_]</td>
        <td>Palavra.</td>
      </tr>
      <tr>
        <td>\W</td>
        <td>[^[:alnum:]_]</td>
        <td>Não-palavra.</td>
      </tr>
      <tr>
        <td>\s</td>
        <td>[[:space:]]</td>
        <td>Branco.</td>
      </tr>
      <tr>
        <td>\S</td>
        <td>[^[:space:]]</td>
        <td>Não-branco.</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight plaintext %}
\d
Casa com: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
{% endhighlight %}

Você pode usar o website [regexpal](http://regexpal.com/) para testar suas expressões regulares.

## Expressões regulares no PHP

Atualmente o PHP oferece duas maneiras distintas de trabalhar com expressões regulares, POSIX e PCRE, cada alternativa conta com um conjunto de funções, confira.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">POSIX</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ereg_replace</td>
        <td>Busca e substitui o que casar com a expressão.</td>
      </tr>
      <tr>
        <td>ereg</td>
        <td>Verifica se uma string casa com a expressão.</td>
      </tr>
      <tr>
        <td>eregi_replace</td>
        <td>Igual a ereg_replace, porém é case-insensitive.</td>
      </tr>
      <tr>
        <td>eregi</td>
        <td>Igual a ereg, porém é case-insensitive.</td>
      </tr>
      <tr>
        <td>split</td>
        <td>Divide uma string utilizando uma expressão.</td>
      </tr>
      <tr>
        <td>spliti</td>
        <td>Igual a split, porém é case-insensitive.</td>
      </tr>
      <tr>
        <td>sql_regcase</td>
        <td>Cria uma expressão regular para uma determinada entrada.</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">PCRE</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>preg_filter</td>
        <td>Busca e substitui, retornando as opções do array que casarem com a expressão.</td>
      </tr>
      <tr>
        <td>preg_grep</td>
        <td>Retorna as opções de um array que casarem com a expressão.</td>
      </tr>
      <tr>
        <td>preg_last_error</td>
        <td>Retorna o código de erro da última expressão executada.</td>
      </tr>
      <tr>
        <td>preg_match_all</td>
        <td>Retorna as ocorrências de uma string que casarem com a expressão.</td>
      </tr>
      <tr>
        <td>preg_match</td>
        <td>Verifica se uma string casa com a expressão.</td>
      </tr>
      <tr>
        <td>preg_quote</td>
        <td>Adiciona escape em caracteres da expressão.</td>
      </tr>
      <tr>
        <td>preg_replace_callback</td>
        <td>Busca e executa um callback nas opções que casarem com a expressão.</td>
      </tr>
      <tr>
        <td>preg_replace</td>
        <td>Busca e substitui, retornando todas as opções.</td>
      </tr>
      <tr>
        <td>preg_split</td>
        <td>Divide uma string utilizando uma expressão.</td>
      </tr>
    </tbody>
  </table>
</div>

## Diferença entre PCRE e POSIX

As funções preg (PCRE) utilizam a biblioteca PCRE, que a partir da versão 5.3 do PHP não pode ser desabilitada, sendo assim, estará sempre presente, essas funções são compatíveis com estilo PERL e possuem características não disponíveis nas funções ereg(POSIX).

A partir da versão 5.3 do PHP as funções ereg (POSIX) foram marcadas como deprecated, ou seja, tornaram-se obsoletas e seu uso é desencorajado, além disso toda vez que são utilizadas é lançado um notice do tipo E_DEPRECATED.

## Trabalhando com expressões regulares no PHP

Agora que conhecemos os principais metacaracteres para criar uma expressão regular e as funções PCRE, vamos praticar.

{% highlight php %}
<?php
$cep = '22710-045';
$names = array('Diogo', 'Renato', 'Gomes', 'Thiago', 'Leonardo');
$text = 'Lorem ipsum dolor sit amet, consectetuer adipiscing.';
 
// Validação de CEP
$er = '/^(\d){5}-(\d){3}$/';
if(preg_match($er, $cep)) {
    echo "O cep casou com a expressão.";
}
// Resultado: O cep casou com a expressão.
 
// Busca e substitui nomes que tenham "go", case-insensitive
$er = '/go/i';
$pregReplace = preg_replace($er, 'GO', $names);
print_r($pregReplace);
// Resultado: DioGO, Renato, GOmes, ThiaGO, Leonardo
 
// Busca e substitui nomes que terminam com "go"
$er = '/go$/';
$pregFilter = preg_filter($er, 'GO', $names);
print_r($pregFilter);
// Resultado: DioGO, ThiaGO
 
// Resgatar nomes que começam com "go", case-insensitive
$er = '/^go/i';
$pregGrep = preg_grep($er, $names);
print_r($pregGrep);
// Resultado: Gomes
 
// Divide o texto por pontos e espaços, que podem ser seguidos por espaços
$er = '/[[:punct:]\s]\s*/';
$pregSplit = preg_split($er, $text);
print_r($pregSplit);
// Resultado: Array de palavras
 
// callback, retorna em letras maiúsculas
$callback = function($matches) {
    return strtoupper($matches[0]);
};
 
// Busca e substitui de acordo com o callback
$er = '/(.*)go$/';
$pregCallback = preg_replace_callback($er, $callback, $names);
print_r($pregCallback);
// Resultado: DIOGO, Renato, Gomes, THIAGO, Leonardo
?>
{% endhighlight %}