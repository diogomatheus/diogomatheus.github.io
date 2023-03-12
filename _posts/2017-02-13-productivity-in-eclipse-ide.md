---
image: "assets/images/posts/shared-image/2017-02-13-productivity-in-eclipse-ide.jpg"
i18n: "Productivity in Eclipse IDE"
title: "Produtividade na IDE Eclipse"
slug: "produtividade-na-ide-eclipse"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/ferramentas/produtividade-no-eclipse/"
---
Quem trabalha com desenvolvimento de software, em algum momento já se pegou realizando uma tarefa repetitiva ou massante na hora de codificar, porém, as ferramentas de IDE (Integrated Development Environment) disponíveis estão cada vez mais avançadas, sendo inadmissível ficar parado no tempo. Neste artigo irei falar um pouco sobre produtividade no Eclipse, que suporta diversas linguagens de programação. Caso você ainda esteja codificando em editores de texto convencionais, faça um favor para você mesmo, adote uma ferramenta que tenha pelo menos os recursos básicos para organização de projeto e código-fonte, visando trabalhar em equipe.

Este texto tem como objetivo apresentar o benefício dos recursos abordados, bem como centralizar alguns comandos para os programadores esquecidos. Por outro lado, os comandos que serão apresentados foram coletados visando o ambiente do Eclipse, mesmo que alguns destes funcionem em outras ferramentas, pesquise e confirme as teclas de atalhos e recursos disponíveis na sua ferramenta de trabalho.

## Produtividade no desenvolvimento de software

Produtividade é um fator fundamental para o crescimento da indústria e qualquer carreira profissional, uma pessoa produtiva é aquela que aproveita bem seu tempo, recursos e talentos para ser eficiente no desenvolvimento de determinada tarefa, entregando bons resultados, um perfil cobiçado e disputado no mercado de trabalho. Existe uma relação muito próxima entre o conceito de produtividade e eficiência, dessa forma vamos para algumas definições:

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
        <td>Capacidade de chegar ao objetivo proposto, cumprir uma função ou meta.</td>
      </tr>
      <tr>
        <td>Eficiência</td>
        <td>Capacidade de realizar uma atividade com qualidade, excelência, gerando um bom resultado que produz o efeito desejado.</td>
      </tr>
      <tr>
        <td>Efetividade</td>
        <td>Qualidade do que atinge seu objetivo, capacidade de funcionar regularmente, referência ao que é real e verdadeiro.</td>
      </tr>
    </tbody>
  </table>
</div>

No cenário de tecnologia, o surgimento quase diário de boas ferramentas de automação, estão mudando a rotina dos profissionais, seja para o provisionamento de ambientes com Vagrant e Docker, linguagens de programações e frameworks cada vez mais robustos, etc. Porém, programar ainda é uma atividade que exige bastante tempo na rotina dos colaboradores, seja na hora de realizar o desenvolvimento de um projeto ou manutenção, sendo essencial refletir sobre os tipos de tarefas que podem ser automatizadas, verificando se já existe suporte.

<blockquote class="blockquote">
  <p class="mb-2 text-right">Não há nada tão inútil quanto fazer com grande eficiência algo que não deve ser feito.</p>
  <p class="blockquote-footer text-right">Peter Drucker</p>
</blockquote>

## Lista de comandos

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

Alguns comandos citados nesta seção estão disponíveis através do botão direito do mouse, sendo essa lista variável de acordo com o que está selecionado no código-fonte e seu contexto no projeto.

## Conclusão

Este artigo teve como objetivo apresentar os benefícios dos recursos ofertados pelos atalhos disponíveis no Eclipse, para desenvolvedores de software iniciantes e motivado pela importância da produtividade em projetos de software. Não desperdice seu tempo em tarefas massantes, faça uso dos atalhos e recursos de produtividade para facilitar suas tarefas.

Você faz uso de algum atalho que não está no artigo? Deixe nos comentários para evoluir essa lista.

Para gerenciar seus atalhos no Eclipse, navegue pelas opções: *Window > Preferences > General > Keys*

## Referência(s)

[http://www.vogella.com/tutorials/Eclipse/article.html](http://www.vogella.com/tutorials/Eclipse/article.html)