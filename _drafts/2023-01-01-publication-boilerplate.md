---
image: "assets/images/posts/shared-image/preview.jpg"
i18n: "Publication boilerplate"
title: "Publicação de exemplo"
slug: "publicacao-de-exemplo"
categories: [ "Category" ]
tags: []
---
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Section

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

## Components

**Bold**

*Italic*

[XPTO](https://www.google.com/)

<figure class="figure mx-auto d-block">
  <img src="{{ '/assets/images/posts/general/2010-05-09-zend-framework-mvc-overview.jpg' | prepend: site.baseurl }}" class="figure-img mx-auto d-block">
  <figcaption class="figure-caption text-center">Description</figcaption>
</figure>

<blockquote class="blockquote">
  <p class="mb-2 text-right">XPTO</p>
  <p class="blockquote-footer text-right">XPTO</p>
</blockquote>

<div class="table-responsive">
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <th scope="col">First</th>
        <th scope="col">Second</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>XPTO</td>
        <td>XPTO</td>
      </tr>
    </tbody>
  </table>
</div>

<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="first-tab" data-toggle="tab" data-target="#first-tabpanel" type="button" role="tab" aria-controls="first-tabpanel" aria-selected="true">First</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="second-tab" data-toggle="tab" data-target="#second-tabpanel" type="button" role="tab" aria-controls="second-tabpanel" aria-selected="false">Second</button>
  </li>
</ul>
<div class="tab-content">
  <div class="tab-pane active" id="first-tabpanel" role="tabpanel" aria-labelledby="first-tab">First</div>
  <div class="tab-pane" id="second-tabpanel" role="tabpanel" aria-labelledby="second-tab">Second</div>
</div>

{% highlight php %}
<?php echo 'Hello World'; ?>
{% endhighlight %}
https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers