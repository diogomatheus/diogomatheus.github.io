---
image: "assets/images/posts/shared-image/2011-12-19-optimizing-paginations-with-zend-paginator.jpg"
i18n: "Optimizing paginations with Zend_Paginator"
title: "Otimizando paginações com Zend_Paginator"
slug: "otimizando-paginacoes-com-zend-paginator"
categories: [ "Programação" ]
tags: []
redirect_from:
  - "/blog/zend-framework/otimizando-paginacoes-com-zend_paginator/"
---
Nesse artigo, irei falar sobre as melhores práticas para criar paginações usando Zend_Paginator, afinal não precisamos resgatar todos os registros de uma tabela para exibir N itens em cada página.

Confira os princípios de uma páginação otimizada:

- Buscar apenas os resultados que precisam ser exibidos
- Limitar registros retornados
- Ignorar registros já exibidos
- Obter total de registros afetados

## O que tinha de errado na paginação do último artigo?

Basicamente no último artigo para criar a paginação foram resgatados todos os registros da tabela, através de um fetchAll(), dependendo do caso essa tabela poderia ter poucos registros ou milhares e o pior, pode ser que não esteja no mesmo servidor da aplicação, o que iria gerar mais lentidão para trazer todos esses registros.

Além disso, definimos o script e o tipo de paginação na action, o que fica um pouco deselegante, como diria Sandra Annenberg, no exemplo desse artigo iremos configurar no bootstrap da aplicação.

O fetchAll() não é recomendado para criar paginações, porque resgata todos os registros e consequentemente utiliza o adaptador Iterator para controlar os itens de cada página e de preferência defina script e tipo de paginação no bootstrap ou na view.

## Solução: Adaptadores DbSelect e DbTableSelect

A solução básica para otimizar paginações de dados vindos do banco de dados com Zend_Paginator é utilizar os adaptadores DbSelect e DbTableSelect, a diferença entre eles é que o DbSelect retorna um array, já o DbTableSelect retorna um objeto rowset.

Como utilizar?

Para utilizar esses adaptadores, devemos passar um objeto da classe Zend_Db_Select ou Zend_Db_Table_Select como parâmetro, seja intanciando um dos adaptadores ou através do método estático factory() da classe Zend_Paginator.

Qual a vantagem desses adaptadores?

A grande vantagem é que o objeto passado como parâmetro é manipulado por esses adaptadores visando a página que será exibida, adicionando limite de registros baseado na configuração de itens por página e ignorando registros já exibidos caso seja necessário.

Mas ao fazer isso nosso resultado é limitado, se nossa paginação estiver configurada para 10 itens por página, será resgatado 10 itens apenas da tabela, logo, como iremos montar o controle de paginação? se só temos base em 10 registros. Agora entra a outra grande sacada, esses adaptadores criam uma query dinâmica apenas para calcular qual seria o total de itens afetados pela query original, ou seja, um count para calcular essa quantidade, com isso temos todos os ingredientes para uma paginação otimizada.

Confira os passos realizados pelos adaptadores:

(1) Primeiro precisamos de um objeto Zend_Db_Select ou Zend_Db_Table_Select.

{% highlight php %}
// Basic query
$users = $userModel->select()
                   ->from('user');
// SELECT `user`.* FROM `user`
{% endhighlight %}

(2) Quando o adaptador recebe esse objeto, ele verifica qual página será exibida, quantos itens por página deve buscar e manipula a query original para limitar a quantidade de registros que serão resgatados.

{% highlight plaintext %}
// Manipulating the query to retrieve only the necessary
SELECT `user`.* FROM `user` LIMIT 20, 10
{% endhighlight %}

(3) Além disso o adaptador gera uma segunda query dinamicamente, baseada na original, para verificar quantos registros seriam afetados.

{% highlight plaintext %}
// Dynamic counter to basic queries
SELECT COUNT(1) AS zend_paginator_row_count
FROM `user`
 
// Dynamic counter to complex queries
SELECT COUNT(1) AS zend_paginator_row_count
FROM ( SELECT `user`.* FROM `user` )
{% endhighlight %}

Podemos optar por uma contagem personalizada de registros afetados, para isso devemos utilizar o método setRowCount() do adaptador, onde podemos passar uma um objeto select ou um inteiro para forçar um determinado número como quantidade de registros afetados, nesse caso o adaptador não gera a query dinâmica.

## Solução alternativa: Adaptador Null

Uma solução alternativa mas um pouco mais arriscada e complexa é utilizar o adaptador Null, que deixa quase tudo na mão do programador, resgatar os dados corretamente, enviar para view e iterar os dados. O adaptador fica responsável apenas por exibir o controle da paginação, para isso é necessário informar o total de registros afetados pela pesquisa na hora de instanciar o adaptador ou utilizar o método estático factory() da classe Zend_Paginator.

## Dicas para melhorar a paginação

O que vimos até agora nada mais é do que o modo correto de criar uma paginação proveniente de banco de dados, que por mais simples que pareça é difícil encontrar exemplos na internet, mas não deixa de ser o uso otimizado de paginações, porque é mais do que pegar todos os dados e exibir determinados registros por páginas.

Para melhorar ainda mais nossas paginações podemos:

- Utilizar cache nas paginações
- Criar índices otimizados para as tabelas

Essas dicas ficarão para outro artigo, mas nada impede de você começar a pesquisar sobre o uso otimizado de índices ou cache.

## Trabalhando com paginações otimizadas

Agora que já temos uma base de como otimizar paginações com Zend_Paginator, vamos criar uma paginação otimizada, para botar em pratica os conhecimentos deste artigo. Baseado na estrutura apresentada no tópico Preparando o ambiente para desenvolvimento com Zend Framework, crie um projeto com nome de example-advanced-paginator.

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-12-19-project-structure.gif' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura do projeto</figcaption>
</figure>

No exemplo que será visto agora, iremos utilizar uma tabela no banco de dados, será a tabela “user”, com dois campos user_id e name, além disso vamos precisar de alguns registros cadastrados para listar os resultados, para facilitar essa tarefa, [acesse o script de criação e inserção de dados](https://gist.github.com/diogomatheus/1325337), copie este conteúdo, acesse o phpmyadmin, http://localhost/phpmyadmin, crie uma base de dados com o nome de “zf-paginator” e adicione o conteúdo do script para criar a tabela e seus registros, caso você tenha realizado o último exemplo pode pular essa parte.

Configure a aplicação para acessar o banco de dados “zf-paginator”.

## Criando nosso modelo

No artigo anterior criamos um modelo básico, mas dessa vez como queremos enviar um objeto da classe Zend_Db_Table_Select para ser manipulado pelo paginator, iremos criar um método.

User.php

{% highlight php %}
<?php
class User extends Zend_Db_Table_Abstract {
  /**
  * The default table name
  */
  protected $_name = 'user';

  /**
    * getAll function
    *
    * @desc basic query to retrieve all the data
    * @param boolean $paginate
    */
  public function getAll($paginate = false) {
    $select = $this->select()
                    ->from($this->_name);

    return ($paginate) ? $select : $this->fetchAll($select);
  }
}
?>
{% endhighlight %}

## Definindo um padrão para as paginações

Nesse momento vamos definir um padrão no bootstrap da aplicação de como deverão ser as paginações, mas nada impede que isso seja alterado em casos específicos, de preferência utilizando o view helper paginationControl() quando necessário.

Bootstrap.php

{% highlight php %}
<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {
  /**
  * Init Autoloader
  */
  protected function _initAutoload() {
    $loader = Zend_Loader_Autoloader::getInstance();
    $loader->setFallbackAutoloader(true);
  }

  /**
    * Init Paginator
    */
  protected function _initPaginator() {
    Zend_Paginator::setDefaultScrollingStyle('Sliding');
    Zend_View_Helper_PaginationControl::setDefaultViewPartial('pagination.phtml');
  }
}
?>
{% endhighlight %}

## Criando nosso controller e action

Neste exemplo iremos criar o controlador UserController.php contendo uma action, nomeada de list( listAction ), ou seja, utilizaremos a view list.phtml, o template de paginação que vamos utilizar será do tipo search, disponível na documentação do componente.

Adicione o arquivo “UserController.php” na pasta “application/controllers” com o seguinte conteúdo:

UserController.php

{% highlight php %}
<?php
class UserController extends Zend_Controller_Action
{
    public function listAction()
    {
        $page = $this->_getParam('page', 1);
 
        $userModel = new User();
        // Returns an instance of the class Zend_Db_Table_Select
        $users = $userModel->getAll(true);
 
        // Returns a rowset
        // $users = $userModel->getAll();
 
        // First option to use Zend_Paginator_Adapter_DbTableSelect
        $adapter = new Zend_Paginator_Adapter_DbTableSelect($users);
        // $adapter->setRowCount($customCount);
        $paginator = new Zend_Paginator($adapter);
 
        // Second option to use Zend_Paginator_Adapter_DbTableSelect
        // $paginator = new Zend_Paginator($users);
        // Note: You cannot customize the count in this option
 
        $paginator->setCurrentPageNumber($page)
                  ->setItemCountPerPage(10);
 
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

Só falta nosso template de paginação, adicione o arquivo pagination.phtml em “application/views/scripts” com o seguinte conteúdo:

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

Estrutura final do nosso exemplo:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-12-19-final-project-structure.gif' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Estrutura final do projeto</figcaption>
</figure>

## Resultado

Ao acessar nossa action list do controller user, teremos o seguinte resultado:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-12-19-pagination-first-page.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado, primeira página</figcaption>
</figure>

Caso seja clicado no link para página 2 ou em next, iremos obter outra lista de resultado, confira:

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2011-12-19-pagination-second-page.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Resultado, primeira página</figcaption>
</figure>

Confira o código-fonte do exemplo no [GitHub](https://github.com/diogomatheus/zend-framework-advanced-paginator).

Aparentemente nada mudou, mas em questão de desempenho, nossa aplicação agradece, isso pode ser calculado verificando o tempo de execução dos scripts, não esqueça de adicionar bastantes registros antes de fazer os cálculos para ver a diferença.

## Referência(s)

- [Advanced Usage Of Zend Paginator](http://www.slideshare.net/norm2782/20090828-php-benelux-bbq-advanced-usage-of-zend-paginator)