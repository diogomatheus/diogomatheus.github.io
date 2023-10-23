---
image: "assets/images/posts/shared-image/2011-10-31-understanding-pagination-with-zend-paginator.jpg"
i18n: "Understanding pagination with Zend_Paginator"
title: "Entendendo paginação com Zend_Paginator"
slug: "entendendo-paginacao-com-zend-paginator"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/trabalhando-com-paginacao-usando-zend_paginator/"
---
A paginação de coleções é um elemento crítico para interface de qualquer aplicação que forneça pesquisa ou outras formas de listagens, ao utilizar paginação, quebramos uma coleção em pedaços, onde cada pedaço é apresentado em uma página, impedindo que o usuário visualize uma quantidade exorbitante de itens, deixando a aplicação mais profissional.

O Zend Framework oferece um componente para realizar paginações, Zend_Paginator, que tem como princípio a flexibilidade, permitindo criar paginações a partir de vários tipos de coleções. Se você não trabalha utilizando frameworks, pode optar por desenvolver uma solução própria ou pesquisar uma solução na internet.

## Fundamentos do Zend_Paginator

Este componente como foi dito é flexível e aceita diversos tipos de coleções, mas não se limita a sua flexibilidade, confira os objetivos do Zend_Paginator:

- Paginar diversos tipos de dados, não apenas bancos de dados relacionais
- Buscar apenas os resultados que precisam ser exibidos
- Não forçar os usuários a utilizar apenas uma maneira de exibir os dados ou pagina-los
- Ser fracamente acoplado aos outros componentes do Zend Framework

Para cada tipo de coleção de dados, existe um adaptador, ou seja, uma classe que fica responsável por fornecer acesso aos dados e controles de paginação, confira os adaptadores disponíveis:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Tipo</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Array</td>
        <td>Utiliza um array como coleção de dados.</td>
      </tr>
      <tr>
        <td>DbSelect</td>
        <td>Utiliza uma instância DbSelect, retornando um array.</td>
      </tr>
      <tr>
        <td>DbTableSelect</td>
        <td>Utiliza uma instância DbTableSelect, retornando um rowset</td>
      </tr>
      <tr>
        <td>Iterator</td>
        <td>Utiliza uma instância Iterator</td>
      </tr>
      <tr>
        <td>Null</td>
        <td>Não manipula os dados, fornece apenas o controlador de páginas</td>
      </tr>
    </tbody>
  </table>
</div>

## Criando uma instância do Zend_Paginator

Para criar uma instância, primeiro devemos instanciar um tipo de adaptador, passando para o seu construtor nossa coleção, após instanciar nosso adaptador, basta instanciar o Zend_Paginator passando o adaptador como parâmetro no construtor da classe.

{% highlight php %}
<?php
// Action scope...
$array = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
$adapter = new Zend_Paginator_Adapter_Array($array);
$paginator = new Zend_Paginator($adapter);
?>
{% endhighlight %}

Visando facilitar a vida do programador e padronizar a maneira que instânciamos este componente, podemos utilizar o método estático factory($data), que fica responsável por verificar o tipo de coleção que está sendo passado como parâmetro e utilizar o adaptador correto.

{% highlight php %}
<?php
// Action scope...
$array = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
$paginator = Zend_Paginator::factory($array);
?>
{% endhighlight %}

Caso você utilize o adaptador do tipo Null, será necessário informar o número total de resultados, independente da maneira que você instanciar, seja pelo adaptador ou pelo método factory($data).

## Configurações básicas do Zend_Paginator

Para personalizar a maneira que nossos dados serão apresentados ao usuário, o Zend_Paginator fornece métodos para configuração da paginação, confira alguns métodos disponíveis:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Método</th>
        <th scope="col">Padrão</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>setCurrentPageNumber</td>
        <td>1</td>
        <td>Informa o número da página atual</td>
      </tr>
      <tr>
        <td>setItemCountPerPage</td>
        <td>10</td>
        <td>Informa o número de itens exibidos por página</td>
      </tr>
      <tr>
        <td>setPageRange</td>
        <td>10</td>
        <td>Informa a quantidade de páginas visíveis na paginação</td>
      </tr>
    </tbody>
  </table>
</div>

{% highlight php %}
<?php
// Action scope...
$paginator->setCurrentPageNumber($this->_getParam('page'))
          ->setItemCountPerPage(15)
          ->setPageRange(15);
?>
{% endhighlight %}

A quantidade de páginas pode variar dependendo do estilo escolhido, para esses casos este valor só será utilizado para iniciar o controle da paginação.

## Manipulando os dados através do Zend_Paginator

Para manipular os dados, precisamos primeiro enviar nossa instância do Zend_Paginator para view.

{% highlight php %}
<?php
// Action scope...
$this->view->assign('paginator', $paginator);
?>
{% endhighlight %}

Com essa instância disponível na view, basta iterar utilizando um foreach e imprimir seus resultados.

{% highlight php %}
// View scope...
<?php foreach ($this->paginator as $item): ?>
<p><?php echo $item ?></p>
<?php endforeach; ?>
{% endhighlight %}

Esse tipo de manipulação não irá funcionar caso você utilize um adaptador do tipo Null.

## Templates e estilos de rolagem

Até agora vimos como instanciar, configurar e manipular os dados da paginação, agora iremos dar uma olhada nos templates e estilos de rolagem utilizados para gerar os controladores de paginação.

Templates de paginação

O template de paginação é responsável por definir a estrutura utilizada para exibir as páginas disponíveis em uma determinada paginação, na documentação oficial deste componente são apresentadas algumas alternativas, mas você também pode criar seu próprio template.
Para isso contamos com uma série de propriedades disponíveis, confira:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Propriedade</th>
        <th scope="col">Tipo</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>first</td>
        <td>integer</td>
        <td>Número da primeira página</td>
      </tr>
      <tr>
        <td>firstItemNumber</td>
        <td>integer</td>
        <td>Número absoluto do primeiro item desta página</td>
      </tr>
      <tr>
        <td>firstPageInRange</td>
        <td>integer</td>
        <td>Primeira página do intervalo retornado pelo estilo de rolagem</td>
      </tr>
      <tr>
        <td>current</td>
        <td>integer</td>
        <td>Número da página atual</td>
      </tr>
      <tr>
        <td>currentItemCount</td>
        <td>integer</td>
        <td>Número de itens nesta página</td>
      </tr>
      <tr>
        <td>itemCountPerPage</td>
        <td>integer</td>
        <td>Número máximo de itens disponíveis para cada página</td>
      </tr>
      <tr>
        <td>last</td>
        <td>integer</td>
        <td>Número da última página</td>
      </tr>
      <tr>
        <td>lastItemNumber</td>
        <td>integer</td>
        <td>Número absoluto do último item desta página</td>
      </tr>
      <tr>
        <td>lastPageInRange</td>
        <td>integer</td>
        <td>Última página do intervalo retornado pelo estilo de rolagem</td>
      </tr>
      <tr>
        <td>next</td>
        <td>integer</td>
        <td>Número da página seguinte</td>
      </tr>
      <tr>
        <td>pageCount</td>
        <td>integer</td>
        <td>Número de páginas</td>
      </tr>
      <tr>
        <td>pagesInRange</td>
        <td>array</td>
        <td>Conjunto de páginas retornadas pelo estilo de rolagem</td>
      </tr>
      <tr>
        <td>previous</td>
        <td>integer</td>
        <td>Número da página anterior</td>
      </tr>
      <tr>
        <td>totalItemCount</td>
        <td>integer</td>
        <td>Número total de itens</td>
      </tr>
    </tbody>
  </table>
</div>

Estilos de rolagem

Além de permitir a criação de templates, o Zend_Paginator permite escolher estilos de rolagem para exibição das páginas, o estilo especifica como deve ser o comportamento do controlador enquanto navegamos pelas páginas.

Confira a lista de estilos disponíveis:

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">Tipo</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>All</td>
        <td>Exibirá todas as opções disponíveis</td>
      </tr>
      <tr>
        <td>Elastic</td>
        <td>Parecida com a paginação do google, variando de tamanho</td>
      </tr>
      <tr>
        <td>Jumping</td>
        <td>Exibe novas opções ao atingir o final das opções apresentadas</td>
      </tr>
      <tr>
        <td>Sliding</td>
        <td>Tenta manter a página atual no centro da paginação, mais utilizado</td>
      </tr>
    </tbody>
  </table>
</div>

## Imprimindo o controlador de paginação

Para imprimir o controlador de paginação temos duas alternativas.

(1) Utilizando o view helper paginationControl

{% highlight php %}
// View scope ...
<?php echo $this->paginationControl($this->paginator, 'Sliding', 'pagination.phtml'); ?>
// ...
{% endhighlight %}

(2) Configurando estilo e script no bootstrap ou action

{% highlight php %}
<?php
// Bootstrap or Action scope ...
Zend_Paginator::setDefaultScrollingStyle('Sliding');
Zend_View_Helper_PaginationControl::setDefaultViewPartial('pagination.phtml');
// ...
 
// View scope ...
<?php echo $this->paginator; ?>
// ...
?>
{% endhighlight %}

Caso seja adicionado no Bootstrap todos os paginators da aplicação serão configurados para utilizar esses valores como padrão, mas nada impede alterar casos específicos se necessário.

## Trabalhando com paginação usando Zend_Paginator

Agora que já conhecemos um pouco sobre o Zend_Paginator, vamos criar uma paginação simples, para botar em pratica os conhecimentos deste artigo, que visa introduzir este tema. Baseado na estrutura apresentada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, crie um projeto com nome de example-zend-paginator.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-10-31-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

No exemplo que será visto agora, iremos utilizar uma tabela no banco de dados, será a tabela “user”, com dois campos user_id e name, além disso vamos precisar de alguns registros cadastrados para listar os resultados, para facilitar essa tarefa, [acesse o script de criação e inserção de dados](https://gist.github.com/diogomatheus/1325337), copie este conteúdo, acesse o phpmyadmin, http://localhost/phpmyadmin, crie uma base de dados com o nome de “zf-paginator” e adicione o conteúdo do script para criar a tabela e seus registros.

Configure a aplicação para acessar o banco de dados “zf-paginator”, caso tenha dúvida, visualize o artigo Entendendo modelos no zend framework.

## Criando nosso modelo

Crie o arquivo User.php na pasta “application/models” e adicione o seguinte conteúdo:

User.php

{% highlight php %}
<?php
class User extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'user';
}
?>
{% endhighlight %}

## Criando nosso controller e action

Neste exemplo iremos criar o controlador UserController.php contendo uma action, nomeada de list( listAction ), ou seja, utilizaremos a view list.phtml, o template que vamos utilizar será do tipo search, disponível na documentação do componente.

Adicione o arquivo “UserController.php” na pasta “application/controllers” com o seguinte conteúdo:

UserController.php

{% highlight php %}
<?php
class UserController extends Zend_Controller_Action {
  public function listAction() {
    $page = $this->_getParam('page', 1);

    $userModel = new User();
    $users = $userModel->fetchAll();

    $paginator = Zend_Paginator::factory($users);
    $paginator->setCurrentPageNumber($page)
              ->setItemCountPerPage(10);

    Zend_Paginator::setDefaultScrollingStyle('Sliding');
    Zend_View_Helper_PaginationControl::setDefaultViewPartial('pagination.phtml');

    $this->view->assign('paginator', $paginator);
  }
}
?>
{% endhighlight %}

Agora vamos preparar nossa view, crie uma pasta nomeada de “user” em “application/views/scripts” e depois adicione o arquivo list.phtml com o seguinte conteúdo:

list.phtml

{% highlight php %}
<ul>
<?php if(sizeof($this->paginator)): ?>
  <?php foreach($this->paginator as $user): ?>
  <li><?php echo $this->escape($user->name); ?></li>
  <?php endforeach; ?>
<?php else: ?>
  <li>Nenhum usuário encontrado.</li>
<?php endif; ?>
</ul>
<?php echo $this->paginator; ?>
{% endhighlight %}

Nesse momento só falta nosso template de paginação, adicione o arquivo pagination.phtml em “application/views/scripts” com o seguinte conteúdo:

pagination.phtml

{% highlight php %}
<?php if ($this->pageCount): ?>
<div>
<!-- Previous page link -->
<?php if (isset($this->previous)): ?>
  <a href="<?php echo $this->url(array('page' => $this->previous)); ?>">
    &lt; Previous
  </a> |
<?php else: ?>
  <span>&lt; Previous</span> |
<?php endif; ?>
 
<!-- Numbered page links -->
<?php foreach ($this->pagesInRange as $page): ?>
  <?php if ($page != $this->current): ?>
    <a href="<?php echo $this->url(array('page' => $page)); ?>">
      <?php echo $page; ?>
    </a> |
  <?php else: ?>
    <?php echo $page; ?> |
  <?php endif; ?>
<?php endforeach; ?>
 
<!-- Next page link -->
<?php if (isset($this->next)): ?>
  <a href="<?php echo $this->url(array('page' => $this->next)); ?>">
    Next &gt;
  </a>
<?php else: ?>
  <span>Next &gt;</span>
<?php endif; ?>
</div>
<?php endif; ?>
{% endhighlight %}

Estrutura final do nosso projeto:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-10-31-final-project-structure.jpeg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Resultado

Ao acessar nossa action list do controller user, teremos o seguinte resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-10-31-pagination-first-page.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado, primeira página</figcaption>
</figure>

Caso seja clicado no link para página 2 ou em next, iremos obter outra lista de resultado, confira:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-10-31-pagination-second-page.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado, segunda página</figcaption>
</figure>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-paginator).

Este exemplo não está otimizado para casos de grande quantidade de registros, para saber como otimizar sua paginação, não deixe de visitar o próximo artigo: Otimizando paginações com Zend_Paginator.