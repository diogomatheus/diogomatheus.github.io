---
image: "assets/images/posts/shared-image/2014-08-18-the-theory-of-visible-complexity-in-tasks.jpg"
i18n: "The theory of visible complexity in tasks"
title: "Teoria da complexidade visível em tarefas"
slug: "teoria-da-complexidade-visivel-em-tarefas"
categories: [ "Governança e gerenciamento" ]
tags: [ "featured" ]
redirect_from:
  - "/blog/gerenciamento-de-projetos/teoria-da-complexidade-visivel-em-tarefas/"
---
Em nossos projetos estamos sempre sujeitos ao perigo da complexidade visível em tarefas, optando por tarefas de acordo com nossa percepção de dificuldade, intuitivamente priorizando as mais simples, procrastinando as mais complexas, em alguns momentos causando até mesmo conflito entre os colaboradores, mas o que classifica uma tarefa como complexa?

Complexidade é uma ilusão causada pela ignorância, que nesse contexto é representada pela falta de conhecimento ou compreensão sobre todo trabalho que precisa ser empreendido, para que determinado problema seja resolvido.

## Aplicabilidade em projetos

Qualquer lista de atividades com variação de complexidade visível aos colaboradores, terá suas tarefas mais complexas realizadas por último, principalmente em equipes juniores, que não tenha uma figura de liderança que possa influenciar e delegar tarefas aos demais, resultando em possíveis atrasos, pois teremos uma sensação falsa de andamento, onde os desafios serão identificados apenas na reta final da fase de execução do projeto.

## Mitigando tarefas complexas

Para mitigar o nível de complexidade das tarefas é preciso aplicar de maneira correta os conhecimentos dos colaboradores mais experientes, sendo importante para isso um organograma bem definido e compartilhado entre os membros da equipe do projeto.

Organograma é um gráfico que representa a estrutura formal de uma organização ou projeto, que ao contrário do que muitos pensam não serve apenas para o ego dos colaboradores que estão no topo, mas para deixar claro aos que estão na base as pessoas nas quais eles devem solicitar auxílio, aqueles que são responsáveis direto pelo trabalho que será realizado.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2014-08-18-organogram.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Organograma</figcaption>
</figure>

Na figura é apresentado um organograma visando projeto de software, para mitigar tarefas complexas é preciso respeitar os níveis definidos no organograma, com objetivo de que os colaboradores da base, nesse caso, programadores jr., sejam responsáveis por tarefas direcionadas, sem necessidade de análise.

O quadro abaixo representa um fluxo que utiliza as definições do organograma visto anteriormente, simulando um cenário no qual é solicitado pelo cliente novos relatórios no software em desenvolvimento, resultando em uma cascata de atividades pelo organograma.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Ator</th>
        <th scope="col">Responsabilidade</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Gerente</td>
        <td>Identificar junto ao cliente que novos relatórios precisam ser criados, delegando essa atividade aos analistas funcionais e técnicos, reforçando o propósito das novas funcionalidades.</td>
      </tr>
      <tr>
        <td>Analista Funcional</td>
        <td>Especificar funcionalmente os relatórios, organizando as informações junto ao cliente, delegando tarefas menores aos analistas jr., visando compor documentos detalhados.</td>
      </tr>
      <tr>
        <td>Analista Jr.</td>
        <td>Reunir as informações solicitadas e gerar especificações funcionais, para aprovação do analista funcional.</td>
      </tr>
      <tr>
        <td>Analista Técnico</td>
        <td>Desenvolver os relatórios, analisando as especificações funcionais, questionando possíveis ambiguidades, realizando planejamento da arquitetura técnica e delegando tarefas aos programadores sr.</td>
      </tr>
      <tr>
        <td>Programador Sr.</td>
        <td>Implementar os relatórios, seguindo o planejamento técnico realizado pelo analista técnico, delegando tarefas direcionadas aos programadores jr.</td>
      </tr>
      <tr>
        <td>Programador Jr.</td>
        <td>Implementar as tarefas solicitadas pelos programadores sr., visando atingir resultados coletivos para conclusão dos relatórios.</td>
      </tr>
    </tbody>
  </table>
</div>

Para que esse fluxo de trabalho seja estabelecido, é preciso implantar uma cultura de liderança, demonstrando aos colaboradores que saber orientar é tão importante quanto saber realizar as atividades, exigindo mais trabalho coletivo e menos individualismo na execução dos projetos.

## Influência do caos na formação de líderes

Para aqueles que se sentem preparados para contribuir mais, o caos pode ser um momento oportuno. Isso inclui sinalizar perigos, analisar, delegar ou executar tarefas para resolver problemas, especialmente aqueles que afetam várias áreas da organização. Gerentes frequentemente simulam ambientes de caos criativo para aumentar o comprometimento e a sensação de desconforto dos funcionários, na busca por melhores resultados.

Ambientes caóticos muitas vezes geram novas lideranças e colaboradores que se preocupam em realizar um bom trabalho, identificando e resolvendo problemas.

## Reflexão

Delegar tarefas não é trivial, mas deveria ser, é o que justifica um modelo hierárquico nas empresas e projetos, mas infelizmente muitos acreditam que delegar é o mesmo que se livrar do problema, repassar determinada preocupação para outro colaborador e simplesmente cobrar resultados, o que sem dúvida é um erro, para delegar é preciso mitigar, decompor e compartilhar, visando obter resultados coletivos, que possibilite os colaboradores experientes participarem de mais tarefas, enquanto os colaboradores iniciantes executam atividades já direcionadas e analisadas.