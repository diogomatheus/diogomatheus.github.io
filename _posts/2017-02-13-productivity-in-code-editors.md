---
image: "assets/images/posts/shared-image/2017-02-13-productivity-in-code-editors.jpg"
i18n: "Productivity in code editors"
title: "Produtividade em editores de código"
slug: "produtividade-em-editores-de-codigo"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/ferramentas/produtividade-no-eclipse/"
---
Desenvolvedores frequentemente enfrentam tarefas repetitivas e tediosas ao escrever código. Felizmente, os editores de código estão cada vez mais avançados, permitindo que os programadores aumentem sua produtividade.

Esse texto discute produtividade em editores de código e apresenta alguns comandos da IDE Eclipse. Porém, o conteúdo e a reflexão gerada é aplicável a qualquer editor de código.

## Produtividade no desenvolvimento de software

A produtividade é crucial para o progresso da indústria e do desenvolvimento profissional. Ser produtivo significa utilizar eficientemente o tempo, recursos e habilidades para realizar tarefas com sucesso e alcançar resultados positivos. É um atributo altamente valorizado no mercado de trabalho. A produtividade está intimamente ligada à eficiência, portanto, a seguir serão apresentadas algumas definições:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Termo</th>
        <th scope="col">Definição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Eficácia</td>
        <td>Capacidade de chegar ao objetivo, cumprir uma função ou meta.</td>
      </tr>
      <tr>
        <td>Eficiência</td>
        <td>Capacidade de realizar uma atividade com qualidade, excelência, utilizando os recursos disponíveis.</td>
      </tr>
      <tr>
        <td>Efetividade</td>
        <td>Habilidade de alcançar os resultados desejados de forma consistente e sustentável.</td>
      </tr>
    </tbody>
  </table>
</div>

As inovações tecnológicas têm impactado significativamente a rotina dos profissionais da área, com o surgimento constante de ferramentas de automação, como Vagrant e Docker para provisionamento de ambientes, linguagens de programação e frameworks robustos. Embora essas ferramentas tenham facilitado muitos aspectos do trabalho, a programação ainda é uma atividade que consome muito tempo. Por isso, é fundamental avaliar quais tarefas podem ser automatizadas.

<blockquote class="blockquote">
  <p class="mb-2 text-right">Não há nada tão inútil quanto fazer com grande eficiência algo que não deve ser feito.</p>
  <p class="blockquote-footer text-right">Peter Drucker</p>
</blockquote>

## IDE Eclipse

O Eclipse é uma IDE (Integrated Development Environment) de código aberto para desenvolvimento de software em diversas linguagens, incluindo Java, C++, Python, PHP e Ruby. Com recursos como depuração, autocompletar, refatoração de código, etc.

Confira alguns comandos de produtividade ofertados pela IDE Eclipse.

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="basic-tab" data-toggle="tab" data-target="#basic-tabpanel" type="button" role="tab" aria-controls="basic-tabpanel" aria-selected="true">Básico</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="search-tab" data-toggle="tab" data-target="#search-tabpanel" type="button" role="tab" aria-controls="search-tabpanel" aria-selected="false">Busca</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="format-tab" data-toggle="tab" data-target="#format-tabpanel" type="button" role="tab" aria-controls="format-tabpanel" aria-selected="false">Formatação</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="refactoring-tab" data-toggle="tab" data-target="#refactoring-tabpanel" type="button" role="tab" aria-controls="refactoring-tabpanel" aria-selected="false">Refatoração</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="basic-tabpanel" role="tabpanel" aria-labelledby="basic-tab">

{% highlight plaintext %}
# Maximizar área de edição
Ctrl + M
 
# Fechar arquivo sendo editado
Ctrl + W
 
# Fechar todos os arquivos sendo editados
Ctrl + Shift + W
 
# Criar arquivo pelo wizard
Ctrl + N
 
# Apagar linha inteira do arquivo
Ctrl + D
 
# Autocompletar nomes de classes, atributos e métodos
# Sugerir identificadores para variáveis, etc
Ctrl + Space
 
# Criar método main na classe
Digitar main + (ctrl + space)
 
# Digitar System.out.println();
Digitar syso + (ctrl + space)
{% endhighlight %}

  </div>
  <div class="tab-pane" id="search-tabpanel" role="tabpanel" aria-labelledby="search-tab">

{% highlight plaintext %}
# Buscar resources (arquivos, etc)
Ctrl + Shift + R
 
# Buscar types (classes, interfaces, etc)
Ctrl + Shift + T
 
# Buscar método ou atributo na classe local
Ctrl + O
 
# Buscar onde classes e métodos estão sendo usados
Ctrl + Shift + G
 
# Buscar locais onde objeto é usado e sua hierarquia
Ctrl + Alt + H
 
# Buscar trecho dentro do arquivo (default)
Ctrl + F
 
# Buscar trecho dentro dos arquivos do projeto
Ctrl + H
{% endhighlight %}

  </div>
  <div class="tab-pane" id="format-tabpanel" role="tabpanel" aria-labelledby="format-tab">

{% highlight plaintext %}
# Criar ou customizar um profile de organização
# Ideal para seguir os padrões de codificações
Window > Preferences > LINGUAGEM > Code Style > Formatter
 
# Organizar formatação de código
# Respeitando o profile de organização definido
Ctrl + Shift + F
 
# Organizar imports do arquivo
Ctrl + Shift + O
 
# Movimentar linha no arquivo
Clicar na linha + Alt + Seta (Cima/Baixo)
{% endhighlight %}

  </div>
  <div class="tab-pane" id="refactoring-tabpanel" role="tabpanel" aria-labelledby="refactoring-tab">

{% highlight plaintext %}
# Renomear classes, métodos e variáveis
# Realizar atualização dos locais que fazem referência
Clique na classe, método ou variávei, Alt + Shift + R
 
# Extrair método
# Substituir trecho pela referência do método criado
Selecionar trecho, Alt + Shift + M, nomear
{% endhighlight %}

  </div>
</div>

O botão direito do mouse oferece acesso rápido para alguns dos comandos citados nessa seção, sendo essa lista variável de acordo com o que está selecionado no código-fonte e contexto do projeto.

Para gerenciar seus atalhos no Eclipse, navegue pelas opções: *Window > Preferences > General > Keys*.

## Reflexão

Os recursos de produtividade disponíveis em editores de código, como atalhos e refatoração de código, podem transformar significativamente o fluxo de trabalho de um programador. Além de economizar tempo e esforço, evitando erros comuns. No entanto, é importante destacar que a disponibilidade desses recursos depende do editor de código escolhido.

Você está usando os recursos de produtividade do seu editor de código?

## Referência(s)

- [Using the Eclipse IDE for Java programming](http://www.vogella.com/tutorials/Eclipse/article.html)