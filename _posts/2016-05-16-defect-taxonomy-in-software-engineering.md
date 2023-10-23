---
image: "assets/images/posts/shared-image/2016-05-16-defect-taxonomy-in-software-engineering.jpg"
i18n: "Defect taxonomy in Software Engineering"
title: "Taxonomia de defeito na Engenharia de Software"
slug: "taxonomia-de-defeito-na-engenharia-de-software"
categories: [ "Engenharia de software" ]
tags: []
redirect_from:
  - "/blog/engenharia-de-software/taxonomia-de-defeitos-na-engenharia-de-software/"
---
Defeitos estão presente em projetos de software por anos e apesar de todo esforço investido para apoiar sua identificação e eliminação, continuam sendo um desafio para os engenheiros de software. De acordo com IEEE Std. 1044-2009 defeito é uma imperfeição ou deficiência em um produto de trabalho, onde esse produto de trabalho não cumpre suas exigências ou especificações e precisa ser reparado ou substituído.

O combate aos defeitos de software é dificultado por fatores como complexidade implícita no desenvolvimento de software, prazos curtos, etc. Na indústria, quando adotado, este combate não ocorre de forma sistemática na maioria dos casos, o que dificulta seu entendimento.

Para combater os defeitos de software de forma sistemática, criar ou adotar uma taxonomia de defeito é uma das atividades mais relevantes para o sucesso deste combate, taxonomia essa que será o pilar para classificação dos defeitos encontrados no processo de desenvolvimento, possibilitando um melhor entendimento sobre os principais defeitos presente nos projetos de software.

Este artigo não visa apresentar as taxonomias de defeitos existentes, seu foco está na apresentação do conceito e papel da taxonomia visando combate sistemático aos defeitos.

## Definição de taxonomia

Taxonomia é uma ciência que estuda e define grupos com base em características comuns, dando nome para estes grupos. Originalmente seu objetivo foi classificar organismos vivos na biologia, mas atualmente é aplicada de forma abrangente, principalmente pelas diversas ciências que fazem uso de taxonomias para classificar seus objetos de estudo. Cada grupo definido pela taxonomia recebe uma nota, estes grupos podem ser agregados para formar supergrupos de maior pontuação, criando uma classificação hierárquica.

Um exemplo do uso da taxonomia ocorre quando um cientista precisa classificar uma nova espécie de animal, para isto o cientista classifica este dentro de uma das categorias já existentes, baseado em uma lógica previamente estabelecida, verificando sua família e outras características para no final atribuir um nome adequado à nova espécie encontrada.

O processo de criação de uma taxonomia exige profunda análise, seguida pela síntese do conhecimento adquirido e por fim uma definição, geralmente este processo envolve diversas revisões. Uma taxonomia deve ser sempre expansível, se adaptando ao surgimento de novas categorias, pois taxonomias em constante evolução tendem a ser mais úteis e atuais, pelo simples fato de que construir uma taxonomia perfeita na primeira tentativa é muito difícil.

## Taxonomia de defeito

Na engenharia de software o uso de taxonomias é amplamente adotado, um dos cenários que faz uso de taxonomia visa classificar defeitos encontrados no processo de desenvolvimento, citado como taxonomia de defeito. Taxonomia de defeito pode ser definido como um sistema hierárquico de categorias projetado para ajudar na classificação de faltas e falhas.

Uma boa taxonomia de defeito é uma ferramenta útil para informar os iniciantes sobre os tipos de defeitos que podem ser encontrados. O principal fator que influencia na adoção ou criação de uma taxonomia de defeito são suas categorias de nível superior, que podem ser genéricas ou específicas para determinado domínio.

O uso de taxonomia de defeito fornece informações sobre a distribuição de faltas e falhas em um projeto de software, sendo de grande valia para aprender sobre os tipos de defeitos que estão ocorrendo no processo de desenvolvimento.

Confira três taxonomias de defeitos e seus respectivos objetivos.

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col"></th>
        <th scope="col"><strong>Beizer</strong></th>
        <th scope="col"><strong>McGraw et al.</strong></th>
        <th scope="col"><strong>Marchetto et al.</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Objetivo</strong></td>
        <td>Defeitos do processo de desenvolvimento</td>
        <td>Defeitos de codificação de segurança</td>
        <td>Defeitos de aplicações web</td>
      </tr>
      <tr>
        <td><strong>Motivação</strong></td>
        <td>Combater defeitos na engenharia de software</td>
        <td>Apoiar desenvolvedores de software e profissionais de segurança</td>
        <td>Apoiar testadores de software na criação de casos de teste</td>
      </tr>
      <tr>
        <td><strong>Nível de generalidade</strong></td>
        <td>Genérica</td>
        <td>Específica</td>
        <td>Específica</td>
      </tr>
    </tbody>
  </table>
</div>

## Papel da taxonomia de defeitos

O papel executado pelas taxonomias de defeitos está diretamente ligado ao combate sistemático dos defeitos, pois para conseguir criar uma estratégia eficaz de combate, precisamos primeiro entender quais tipos de defeitos estão afetando nossos projetos, classificá-los e posteriormente pensar qual melhor maneira de eliminá-los.

Tendo conhecimento dos tipos de defeitos, leia-se categorias, podemos analisar a distribuição dos defeitos que ocorrem nos projetos, visando planejar uma ação corretiva, como um treinamento para o time técnico ou adicionar/modificar uma etapa formal de inspeção de artefatos.

Basicamente na maioria dos cenários, criar ou adotar uma taxinomia é o passo inicial para trabalhar de forma sistemática.

## Referência(s)

- Beizer, B. **Software testing techniques**. Thomson Computer Press (1990).
- Felderer, Michael, and Armin Beer. **Using defect taxonomies to improve the maturity of the system test process: results from an industrial case study**. software quality. Increasing value in software and systems development. Springer Berlin Heidelberg, 2013. 125-146.
- Felderer, Michael, Armin Beer, and Bernhard Peischl. **On the role of defect taxonomy types for testing requirements: Results of a controlled experiment**. Software Engineering and Advanced Applications (SEAA), 2014 40th EUROMICRO Conference on. IEEE, 2014.
- Felderer, Michael, and Armin Beer. **Using defect taxonomies for testing requirements**. Software, IEEE 32.3 (2015): 94-101.
- Horta Travassos, Guilherme. **Software Defects: Stay Away from Them. Do Inspections!** QUATIC, 2014 9th International Conference on the. IEEE, 2014.
- IEEE Computer Society 1990. **Standard glossary of software engineering terminology**. ANSI/IEEE Standard 610.12-1990. IEEE Press, New York (1990)
- ISTQB, **Standard glossary of terms used in software testing**. International Software Testing Qualifications Board, Glossary Working Party, 2010.
- Judd, W. S. et al. (2007) **Taxonomy. In Plant Systematics – A Phylogenetic Approach**, Third Edition. Sinauer Associates, Sunderland.
- Tsipenyuk, Katrina, Brian Chess, and Gary McGraw. **Seven pernicious kingdoms: A taxonomy of software security errors**. Security & Privacy, IEEE 3.6 (2005): 81-84.
- Vijayaraghavan, Giri, and Cem Kaner. **Bug taxonomies: Use them to generate better tests**. STAR EAST (2003).