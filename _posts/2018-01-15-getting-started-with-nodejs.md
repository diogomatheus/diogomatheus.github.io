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
Node.js é um runtime (i.e., ambiente de execução) específico para aplicações escritas na linguagem de programação JavaScript. Além de oferecer um ambiente de execução compatível com diferentes sistemas operacionais (i.e., multiplataforma), o Node.js disponibiliza recursos para apoiar o desenvolvimento de aplicações.

Criado por [Ryan Dahl](https://tinyclouds.org/), o Node.js é baseado no V8, interpretador JavaScript criado pelo Google e usado pelo navegador Google Chrome. Neste cenário, enquanto o V8 é focado na interpretação de código JavaScript, o Node.js se preocupa em oferecer um ambiente de execução multiplataforma.

## JavaScript & ECMAScript (ES)

Para compreender o Node.js é interessante conhecer a relação entre JavaScript e ECMAScript (ES). ECMAScript é uma especificação de linguagem de script, utilizada por diferentes linguagens, por exemplo JavaScript e ActionScript (Flash). Dessa forma, JavaScript é uma linguagem de programação baseada na especificação ECMAScript. Porém, existem diferentes versões da especificação ECMAScript. Consequentemente, diferentes engines (e.g., V8) são baseadas em diferentes versões da ECMAScript.

Escalabilidade é uma das características atribuídas ao Node.js, sendo base para que diferentes profissionais recomendem o uso de Node.js para o desenvolvimento de APIs, aplicações de tempo-real, etc. Porém, os principais diferenciais do Node.js estão relacionados com sua arquitetura baseada em eventos (Event-Loop), bem como ao seu I/O não bloqueante, focado em tarefas assíncronas. Além disso, por padrão Node.js funciona por meio de single-thread, embora seja possível trabalhar com multithreading.

## Principais benefícios

Quando desenvolvemos com Node.js, utilizamos uma abordagem baseada em eventos, o que exige mapear quais eventos podem ocorrer, bem como disponibilizar uma interface para ouvi-los, possibilitando executar operações específicas.

Estar preparado para trabalhar com interações de tempo real entre cliente e servidor é um diferencial interessante do Node.js. Neste ponto, destacam-se os pacotes SockJS, Socket.IO e Engine.IO. Estes pacotes são compatíveis com o protocolo WebSockets e permitem trafegar dados por meio de uma conexão bi-direcional, tratando as mensagens via eventos no JavaScript.

Por ser single-thread por padrão, podemos destacar o benefício de não ter deadlock.Por outro lado, o fator single-thread exige atenção, evitando bloco de código síncrono e demorado, sendo essencial analisar possíveis gargalos e refatorar visando tarefas assíncronas.

## Gerenciamento de pacotes com NPM

NPM é um gerenciador de pacotes para código JavaScript. Trata-se de um facilitador para reutilização de código compartilhado, onde pequenos pacotes são criados para solucionar problemas específicos. Dessa forma, desenvolvedores e engenheiros de software ficam responsáveis pela composição de soluções customizadas, combinando diferentes pacotes. Porém, dependências externas são perigosas e continua sendo necessário analisar o que está sendo adotado, bem como o envolvimento da comunidade e a disponibilidade de documentação do pacote.

Neste cenário, é importante conhecer as formas de instalar pacotes na aplicação (e.g., local e global). Quando o uso do pacote se limitar no apoio ao desenvolvimento de forma externa, este deve ser instalado de forma global. Por outro lado, caso o pacote faça parte do projeto, uma dependência para que os requisitos do projeto sejam realizados, este deve ser instalado localmente.

{% highlight shell %}
// Global
npm install -g swagger
 
// Local
npm install express --save
{% endhighlight %}

O gerenciamento dos pacotes instalados localmente na aplicação ocorre por meio do arquivo [package.json](https://docs.npmjs.com/getting-started/using-a-package.json), que organiza informações sobre o projeto, suas dependências e scripts de inicialização, etc.

Para descobrir pacotes ou obter mais informações, acesse o site [https://www.npmjs.com/](https://www.npmjs.com/).

## Boas práticas usando Node.js

- Instalar versão estável do Node.js (LTS);
- Compreender o versionamento de pacotes (Major, Minor e Patch);
- Pesquisar pacotes antes de implementar soluções específicas;
- Padronização do código e nomenclatura de arquivos;
- Considerar adoção de guia de estilo de código;
- Trabalhar de forma assíncrona (promise, async/await, etc).

## Gerenciamento de erros e processos

Colocar uma aplicação Node.js em produção exige alguns cuidados. Os principais estão relacionados ao gerenciamento de erros e exceções, bem como o gerenciamento automatizado de processos.

Quando ocorrem exceções ou rejeições não tratadas (uncaughtException ou unhandledRejection), o comportamento de uma aplicação Node.js torna-se imprevisível. Neste cenário, uma prática realizada pelos desenvolvedores é armazenar o log do erro/disparar email e finalizar o processo da aplicação para reiniciá-lo. Porém, o gerenciamento de processo da aplicação precisa ser automatizado, neste ponto, destacam-se os pacotes PM2 e Forever.

Existe muita discussão na comunidade sobre o gerenciamento de erros e exceções em aplicações Node.js, porém, não é uma boa prática manter uma aplicação Node.js após um erro crítico ser disparado. O uso dos eventos uncaughtException e unhandledRejection é bastante questionado, porém, na prática continua sendo utilizado para encerrar o processo da aplicação. Por fim, cabe aos desenvolvedores realizarem o tratamento em nível de código (try/catch, promise, etc).

Para mais informações, confira as [dicas oficiais do framework de aplicações web express](http://expressjs.com/pt-br/advanced/best-practice-performance.html).

## Pacotes interessantes

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
        <td>standardjs</td>
        <td>Guia de estilo JavaScript, com analisador e fixador de código automático.</td>
      </tr>
      <tr>
        <td>dotenv</td>
        <td>Pacote para carregar variáveis de ambiente.</td>
      </tr>
      <tr>
        <td>socket.io</td>
        <td>Framework para criação de aplicações de tempo real.</td>
      </tr>
      <tr>
        <td>swagger</td>
        <td>Pacote composto por ferramentas para projetar e criar APIs.</td>
      </tr>
      <tr>
        <td>express</td>
        <td>Framework minimalista para desenvolvimento de aplicações web.</td>
      </tr>
      <tr>
        <td>helmet</td>
        <td>Pacote de apoio para proteção de aplicações web.</td>
      </tr>
      <tr>
        <td>sequelize</td>
        <td>ORM para Node.js (Banco de dados relacionais).</td>
      </tr>
      <tr>
        <td>mongoose</td>
        <td>ODM para Node.js (MongoDB).</td>
      </tr>
      <tr>
        <td>winston</td>
        <td>Pacote para armazenar log assíncrono.</td>
      </tr>
      <tr>
        <td>morgan</td>
        <td>Pacote para armazenar log de requisição HTTP.</td>
      </tr>
      <tr>
        <td>supertest</td>
        <td>Pacote para teste em alto nível de requisições HTTP.</td>
      </tr>
      <tr>
        <td>mocha</td>
        <td>Pacote para teste unitário.</td>
      </tr>
    </tbody>
  </table>
</div>

## Listas da comunidade

- [Awesome List - Node.js](https://github.com/sindresorhus/awesome-nodejs)
- [Awesome List - NPM](https://github.com/sindresorhus/awesome-npm)
- [Awesome List - JavaScript](https://github.com/sorrycc/awesome-javascript)

## Conclusão

Node.js está conquistando muitos desenvolvedores, mas ainda existe debate sobre quando adotá-lo. Não existe bala de prata, continua sendo importante analisar os requisitos funcionais e não funcionais de cada projeto, bem como questões sobre capacitação dos desenvolvedores para construção e manutenção de aplicações. Reconhecer os limites de cada tecnologia bem como os principais cenários para sua aplicação é importante para evitar qualquer tipo de viés, seja gerencial ou técnico.

## Documentação oficial

[https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)