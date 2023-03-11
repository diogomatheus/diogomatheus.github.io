---
image: "assets/images/posts/shared-image/2015-11-23-php-the-right-way.jpg"
i18n: "PHP the right way"
title: "PHP do jeito certo"
slug: "php-do-jeito-certo"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/php/php-do-jeito-certo/"
---
Este artigo é um texto sobre a importância do projeto [PHP the right way](http://br.phptherightway.com/), que já foi traduzido para vários idiomas. Para os programadores mais jovens é um texto orientador que pode abrir diversos caminhos e antecipar muita coisa que está por vir na sua vida profissional, então não tenha vergonha de ler mais de uma vez, procurar materiais de apoio e até mesmo cursos baseados nesse conteúdo para entender melhor essas possibilidades, que cobre de padrões de codificação até virtualização, cache e automação.

<blockquote class="blockquote">
  <p class="mb-2 text-right">A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.</p>
  <p class="blockquote-footer text-right">Albert Einstein</p>
</blockquote>

Antes de falar sobre este guia e seu conteúdo, quero parabenizar os estudantes da linguagem PHP, que apesar de sua fama e muitas vezes desvalorização, conseguem visualizar seu valor e agilidade, uma dica que posso passar é sejam inconformados, enquanto estiver desenvolvendo um projeto, busque alternativas e melhores práticas para os próximos. Todas as dicas presente no PHP the right way são aplicáveis em outras linguagens, recomendo fortemente o estudo de mais de uma linguagem em paralelo aos iniciantes no PHP, de preferência uma fortemente tipada, seja curioso mas tenha foco na produtividade, pois não adianta conhecer 10 frameworks, 20 ferramentas e no final do ano não ter suas ideias implementadas.

## O que é o PHP the right way?

PHP the right way é um projeto que fornece informações atualizadas sobre boas práticas e ferramentas disponíveis na linguagem PHP, uma referência fácil de ler, que introduz os desenvolvedores no cenário de forma rápida, sem informações obsoletas.

As informações disponíveis são ótimas para os iniciantes e desenvolvedores com certa experiência, não se trata de uma receita, mas um guia de sugestões que conta com múltiplas opções, sendo considerado um documento vivo que continuará sendo atualizado.

## Boas práticas de codificação

De maneira genérica o projeto aborda três temas diferentes, guia de estilo de código que fala sobre as PSR e padrões de codificação, práticas de codificação que envolve padrões de projeto e alguns recursos essenciais, além dos destaques da linguagem como namespaces e SPL.

Muitos ignoram os benefícios dos guias de estilo de código, principalmente quando se trabalha sozinho, mas quando se trata de trabalho coletivo a falta da padronização pode gerar inconsistências e muitas dores de cabeça entre os colaboradores, então acostume-se com os guias de estilo de código.

## Gerenciamento de dependência

Gerenciamento de dependência é algo relativamente recente no PHP quando se diz respeito as dependência de um projeto específico, graças ao [Composer](https://getcomposer.org/) podemos especificar quais componentes são usados pelos nossos projetos, uma lista das opções disponíveis pode ser encontrada no Packagist. Além de gerenciar as dependências o Composer também trabalha no gerenciamento das configurações, armazenando as versões usadas de cada componente, o que possibilita aos colaboradores replicar o ambiente do projeto.

Uma opção para gerenciar as dependências do sistema/ambiente de execução é o [PEAR](http://pear.php.net/packages.php).

## Segurança

Na seção de segurança o projeto foca na existência de pessoas ruins prontas para invadir suas aplicações, sendo então importante tomar medidas para reforçar a segurança, indicando o texto da [OWASP](https://www.owasp.org/index.php/Guide_Table_of_Contents), que lista problemas de seguranças conhecidos e como se proteger contra eles, uma leitura obrigatória.

Além dessa indicação também é abordado o uso de senhas no PHP, sugerindo o uso da função password_hash(), que usa o BCrypt internamente o algorítimo mais forte suportado pelo PHP hoje.

Para fechar também é indicado o uso e os benefícios dos filtros de dados e outras práticas.

## Servidores e publicação

Nesta seção diversas opções de servidores e plataformas de publicação são apresentadas, os tempos mudaram, não temos apenas o servidor local e a hospedagem como opções amarradas, as plataformas de publicação hoje são ótimas para criar aplicações com escalabilidade um diferencial princialmente para prestadores de serviço.

No texto os iniciantes terão ciência de que o apache tem concorrente e diversas ferramentas de automação estão disponíveis do [Phing](http://www.phing.info/) ao [Travis CI](https://travis-ci.org/), está na hora de avançar e aproveitar as tecnologias e recursos disponíveis.

## Conclusão

Para os iniciantes da linguagem PHP que estão procurando uma direção técnica sobre recursos e ferramentas que empresas sérias de software usam em seus projetos o PHP the right way é uma ótima fonte de conhecimento. Estude e tenha domínio dessas ferramentas e tecnologias, procure aplicar em seus projetos pessoais e levar para suas empresas, colabore para mudar a visão da linguagem que você trabalha criando projetos estruturados e automatizados.

O objetivo deste artigo foi meramente disseminar o projeto e seus benefícios, cobrindo apenas alguns pontos do conteúdo oficial, não deixe de acessar o projeto para conferir o texto na integra.