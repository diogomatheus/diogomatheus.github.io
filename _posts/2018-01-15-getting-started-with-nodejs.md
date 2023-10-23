---
image: "assets/images/posts/shared-image/2018-01-15-getting-started-with-nodejs.jpg"
i18n: "Getting started with Node.js"
title: "Introdução ao Node.js"
slug: "introducao-ao-nodejs"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/javascript/introducao-ao-node-js/"
---
Node.js é um ambiente de execução projetado especificamente para aplicações escritas em JavaScript. Criado por [Ryan Dahl](https://tinyclouds.org/), ele utiliza o interpretador JavaScript V8 do Google, usado pelo navegador Google Chrome, para oferecer um ambiente de execução multiplataforma, permitindo que desenvolvedores escrevam código JavaScript para execução no servidor.

Além disso, o Node.js disponibiliza recursos para construção de aplicações robustas e escaláveis.

## JavaScript & ECMAScript (ES)

Para entender melhor o Node.js, é importante compreender a relação entre JavaScript e a especificação ECMAScript (ES). O ECMAScript é uma especificação de linguagem de script que é usada por diferentes linguagens, incluindo o JavaScript e o ActionScript (Flash). O JavaScript é uma linguagem de programação que é baseada na especificação ECMAScript. No entanto, existem diferentes versões da especificação ECMAScript, o que significa que diferentes interpretadores (e.g., V8) são baseados em diferentes versões da especificação.

## Benefícios

Uma das características mais notáveis do Node.js é a sua escalabilidade, o que faz com que muitos profissionais recomendem o uso do Node.js para o desenvolvimento de APIs, aplicações em tempo real, entre outras. No entanto, os principais diferenciais do Node.js estão relacionados à sua arquitetura baseada em eventos (Event-Loop) e ao seu I/O não bloqueante, que se concentra em tarefas assíncronas. Além disso, por padrão, o Node.js funciona em single-thread, mas é possível trabalhar com multithreading.

Quando desenvolvemos com Node.js, utilizamos uma abordagem baseada em eventos, o que exige mapear quais eventos podem ocorrer, bem como disponibilizar uma interface para ouvi-los. Isso nos permite executar operações específicas em resposta a esses eventos.

O Node.js é uma excelente escolha para lidar com interações em tempo real entre cliente e servidor. Existem pacotes como SockJS, Socket.IO e Engine.IO que são compatíveis com o protocolo WebSocket e permitem o tráfego de dados por meio de uma conexão bidirecional, tratando as mensagens por meio de eventos em JavaScript.

Uma das vantagens de usar o Node.js é que, por padrão, ele é single-threaded, o que significa que não há possibilidade de deadlock. No entanto, essa abordagem requer cuidado para evitar o bloqueio de código síncrono e lento. É fundamental realizar uma análise cuidadosa para identificar possíveis gargalos e, se necessário, refatorar o código para implementar tarefas assíncronas.

## Gerenciamento de pacotes com NPM

O NPM é um gerenciador de pacotes para código JavaScript que simplifica a reutilização de código compartilhado. É possível criar pequenos pacotes que resolvem problemas específicos, permitindo que desenvolvedores e engenheiros de software combinem diferentes pacotes para criar soluções personalizadas. No entanto, é importante ter em mente que dependências externas podem ser perigosas e é necessário analisar cuidadosamente o pacote antes de adotá-lo, avaliando a disponibilidade de documentação e o envolvimento da comunidade.

Compreender as formas de instalação de pacotes é fundamental, incluindo as opções global e local. Pacotes globais ficam disponíveis na máquina como um todo, independentemente do projeto. Já os pacotes locais só são acessíveis no projeto em que foram instalados, através do arquivo "[package.json](https://docs.npmjs.com/getting-started/using-a-package.json)".

{% highlight shell %}
// Global
npm install -g swagger
 
// Local
npm install express --save
{% endhighlight %}

O arquivo "[package.json](https://docs.npmjs.com/getting-started/using-a-package.json)" gerencia as dependências do projeto, divididas em duas categorias principais: "dependencies" e "devDependencies". As "dependencies" são as dependências necessárias para a execução da aplicação em produção, enquanto as "devDependencies" são usadas apenas durante o processo de desenvolvimento. É importante distinguir essas categorias para manter o projeto organizado e funcionando corretamente.

## Práticas recomendadas para um desenvolvimento eficiente com Node.js

- Instalar a versão estável do Node.js (LTS), garantindo assim um ambiente de execução mais estável e seguro;
- Compreender o versionamento de pacotes, distinguindo as diferentes versões Major, Minor e Patch, para garantir a compatibilidade entre as dependências do projeto;
- Realizar pesquisas sobre os pacotes antes de implementar soluções específicas, a fim de garantir a escolha da solução mais adequada para o projeto;
- Adotar padrões de codificação e nomenclatura de arquivos, a fim de manter a clareza e a organização do código;
- Considerar a adoção de um guia de estilo de código, para manter a consistência e a uniformidade do código em todo o projeto;
- Trabalhar de forma assíncrona, utilizando recursos como promessas (i.e., promise), async/await, entre outros, a fim de garantir uma execução mais eficiente e evitar bloqueios desnecessários.

## Gerenciamento de erros e processos

Ao colocar uma aplicação Node.js em produção, é importante tomar cuidados específicos, principalmente em relação ao gerenciamento de erros e exceções, bem como a automação do gerenciamento de processos.

Quando ocorrem exceções ou rejeições não tratadas (e.g., uncaughtException, unhandledRejection), o comportamento da aplicação Node.js se torna imprevisível. Nesse caso, uma prática comum é armazenar o log de erros ou enviar um email e finalizar o processo da aplicação para reiniciá-lo. Porém, o gerenciamento de processos da aplicação precisa ser automatizado, e para isso existem pacotes como o PM2 e o Forever.

Apesar de haver muitas discussões na comunidade sobre o gerenciamento de erros e exceções em aplicações Node.js, não é considerada uma boa prática manter a aplicação Node.js em funcionamento após um erro crítico. Embora o uso dos eventos uncaughtException e unhandledRejection seja bastante questionado, ainda é comum utilizá-los para encerrar o processo da aplicação. Cabe aos desenvolvedores realizar o tratamento adequado em nível de código (e.g., utilizando try/catch, promises, entre outros).

Confira as [dicas oficiais do framework express](http://expressjs.com/pt-br/advanced/best-practice-performance.html).

## Sugestões de pacotes úteis

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Pacote</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>express</td>
        <td>Framework minimalista para construir aplicações web e APIs em Node.js.</td>
      </tr>
      <tr>
        <td>NestJS</td>
        <td>Framework para criar aplicações Node.js escaláveis, com suporte a TypeScript.</td>
      </tr>
      <tr>
        <td>socket.io</td>
        <td>Biblioteca para criar aplicações em tempo real com comunicação bidirecional entre o cliente e o servidor.</td>
      </tr>
      <tr>
        <td>axios</td>
        <td>Biblioteca para fazer requisições HTTP a APIs externas.</td>
      </tr>
      <tr>
        <td>Sequelize</td>
        <td>ORM para Node.js que suporta vários bancos de dados relacionais e permite que você interaja com bancos de dados usando métodos orientados a objetos.</td>
      </tr>
      <tr>
        <td>Mongoose</td>
        <td>Biblioteca para modelagem de dados em MongoDB, um banco de dados NoSQL amplamente utilizado.</td>
      </tr>
      <tr>
        <td>Mocha</td>
        <td>Framework de teste para Node.js que fornece uma estrutura robusta para escrever e executar testes automatizados em JavaScript.</td>
      </tr>
      <tr>
        <td>Jest</td>
        <td>Framework de teste para Node.js que é fácil de configurar e usar. O Jest suporta vários recursos, como testes de snapshot, testes de integração e testes de unidade.</td>
      </tr>
      <tr>
        <td>PM2</td>
        <td>Gerenciador de processos para Node.js que facilita a execução de aplicações Node.js em produção.</td>
      </tr>
      <tr>
        <td>Forever</td>
        <td>Ferramenta de gerenciamento de processos Node.js semelhante ao PM2, que permite manter seus aplicações Node.js em execução continuamente.</td>
      </tr>
    </tbody>
  </table>
</div>

## Listas da comunidade

- [Awesome List - Node.js](https://github.com/sindresorhus/awesome-nodejs)
- [Awesome List - NPM](https://github.com/sindresorhus/awesome-npm)
- [Awesome List - JavaScript](https://github.com/sorrycc/awesome-javascript)

## Reflexão

A adoção do Node.js ainda é objeto de debate na comunidade de desenvolvedores. É fundamental avaliar cuidadosamente os requisitos funcionais e não-funcionais de cada projeto, além das habilidades da equipe responsável pela construção e manutenção da aplicação. É importante reconhecer as limitações de cada tecnologia e identificar os cenários mais adequados para sua aplicação, a fim de evitar possíveis vieses gerenciais ou técnicos. Não há soluções universais para todos os casos, e cada projeto deve ser avaliado de forma individual.

## Documentação oficial

- [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)