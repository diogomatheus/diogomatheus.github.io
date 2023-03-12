// alertbar later
$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 280) {
        $('.alertbar').fadeIn();
    } else {
        $('.alertbar').fadeOut();
    }
});

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('nav').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down            
        $('nav').removeClass('nav-down').addClass('nav-up'); 
        $('.nav-up').css('top', - $('nav').outerHeight() + 'px');
        
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {               
            $('nav').removeClass('nav-up').addClass('nav-down');
            $('.nav-up, .nav-down').css('top', '0px');             
        }
    }

    lastScrollTop = st;
}

$('.site-content').css('margin-top', $('header').outerHeight() + 'px');

$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide(1000);
        $('body').removeClass('modal-open');
    });
});
{% assign counter = 0 %}
var documents = [
    {% for page in site.posts %}
    {
        "id": {{ counter }},
        "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
        "title": "{{ page.title }}",
        "body": "{{ page.date | date: "%d/%m/%Y" }} - {{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}"{% assign counter = counter | plus: 1 %}
    }{% if forloop.last %}{% else %}, {% endif %}
    {% endfor %}
];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')
    documents.forEach(function (doc) { this.add(doc) }, this)
});

function lunr_search(term) {
    $('#lunrsearchresults').show( 1000 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Fechar</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Resultados da busca por '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        var results = idx.search(term);
        if(results.length>0){
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Desculpe, nenhum resultado encontrado. Feche e tente uma pesquisa diferente!</li>";
        }
    }
    return false;
}