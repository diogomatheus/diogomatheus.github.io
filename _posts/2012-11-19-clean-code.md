---
image: "assets/images/posts/shared-image/2012-11-19-clean-code.jpg"
i18n: "Clean code"
title: "Código limpo"
slug: "codigo-limpo"
categories: [ "Referência" ]
tags: []
redirect_from:
  - "/blog/resenha-de-livros/codigo-limpo/"
---
Todo programador em algum momento já se perguntou se realmente está gerando bons códigos, na verdade esse pensamento deveria existir toda vez em que escrevemos qualquer trecho de código, mas visando melhorar meu entendimento sobre o que é um bom código comprei o livro Código Limpo, do autor Robert C. Martin, neste livro são apresentadas práticas boas e ruins de desenvolvimento, um ótimo lugar para aprender algumas práticas que sempre criaram dúvidas, confira alguns exemplos de perguntas que serão respondidas após a leitura.

Será que comento esse bloco de código?
Minha função está objetiva?
Será que esse nome de variável ficou bom?
TDD atrapalha na expansão de um projeto?

O autor tenta deixar bem claro que o objetivo não é vender seu padrão de desenvolvimento como uma verdade absoluta, ao invés disso Robert tenta mostrar como trabalha e o que acha uma boa prática, além de mostrar o que não gosta e consultar programadores responsáveis por projetos e linguagens conhecidas para reforçar seu ponto de vista.

O grande ponto de reflexão é não se contentar em fazer um código funcionar, pois segundo o autor, fazer um código funcionar é muito fácil, mas utilizar padrões e facilitar o entendimento de um código é o que realmente faz de você um bom programador.

## Sumário

1. Prefácio
2. Introdução
3. Sobre a Capa
4. Código Limpo
5. Nomes Significativos
6. Funções
7. Comentários
8. Formatação
9. Objetos e Estruturas de Dados
10. Tratamento de Erro
11. Limites
12. Testes de Unidades
13. Classes
14. Sistemas
15. Emergência
16. Concorrência
17. Refinamento Sucessivo
18. Características Internas do JUnit
19. Refatorando o SerialDate
20. Odores e Heurísticas

## Capítulo – Nomes Significativos

Nesse capítulo o autor apresenta motivos para se escolher bons nomes, ou seja, nomes significativos para o contexto do código, desde variáveis até classes, sempre passando dicas e fazendo comparações de códigos com nomes significativos e códigos com nomes confusos.

Confira algumas dessas dicas:

- Evitar informações erradas
- Faça distinções significativas
- Use nomes pronunciáveis
- Não utilize abreviações

## Capítulo – Funções

Pequenas, é o que todas as funções devem ser, além disso cada função deve fazer apenas uma coisa. Basicamente se sua função está grande ou faz mais de uma coisa, refatore seu código, extraia funcionalidades diferentes de dentro da sua função e crie uma nova, se for private coloque em baixo da função que utilizar. Um ponto interessante nesse capítulo é quando o autor fala sobre os parâmetros das funções, deixando bem claro que quanto menos parâmetros melhor, sendo que nenhum parâmetro é o ideal, mesmo que isso seja difícil de ocorrer.

## Capítulo – Comentários

Os pontos citados pelo autor sobre comentários em código são ótimos, em muitos casos comentários são adicionados para aliviar a consciência do programador após ter feito um código ruim, sendo assim, ao invés de escrever um comentário, reescreva seu código. Também posso destacar a passagem de comentários redundantes, principalmente em códigos que não serão disponibilizados como API pública, logo não é necessário utilizar documentação, Ex: Javadoc, ainda mais em variáveis, coisa que o autor considera horrível.

## Capítulo – Classes

Este capítulo tem alguns detalhes parecidos com os que foram vistos para funções, por exemplo, devemos seguir o princípio da responsabilidade única, ou seja, cada classe só pode ser responsável por uma coisa, se você precisar descrever uma classe e utilizar as palavras “se”, “e”, “ou” ou “mas”, tenho más notícias para você, refatore seu código, além disso também é recomendado organizar o código de tal forma que faça valer o princípio de aberto-fechado, onde as classes são abertas para expansão, mas fechadas para alterações.

## Conclusão

Este livro não visa melhorar seus conhecimentos em uma determinada linguagem, mas irá ajudar muito na maneira de pensar antes de programar em qualquer linguagem, em diversos pontos do livro é esclarecido que a verdadeira documentação de um projeto é o seu código, documentação técnica, comentários e etc, tudo isso está sujeito a erros, principalmente em códigos que são alterados com frequência. O legado de seu projeto é o seu código, sendo assim, torne este mais legível, não tente programar para provar que você conhece recursos que ninguém mais conhece, programe para o projeto e para sua equipe.