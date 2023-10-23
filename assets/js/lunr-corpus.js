---
layout: null
---
var lunr_corpus = [
  {% for post in site.posts %}
  {
    "url": "{{ post.url | xml_escape }}",
    "title": "{{ post.title | xml_escape }}",
    "content": "{{ post.date | date: "%d/%m/%Y" }} - {{ post.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}"
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
];