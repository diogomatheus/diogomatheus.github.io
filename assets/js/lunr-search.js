$(document).ready(function() {
  
  var lunr_idx = lunr(function () {
    this.ref('id');
    this.field('title');
    this.field('content');

    if (Array.isArray(lunr_corpus) && lunr_corpus.length) {
      lunr_corpus.forEach(
        function(value, index) {
          this.add($.extend({ 'id': index }, value))
        },
        this
      );
    }
  });

  // Lunr init search
  $('#lunr-search-form').submit(function(event) {
    var query = $('#lunr-search-input').val();
    if(query) {
      $('#lunr-results').show(1000);
      $('body').addClass('modal-open');

      $('#lunr-results').html('<div id="resultsmodal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="resultsmodal"><div class="modal-dialog shadow-lg" role="document"><div class="modal-content"><div class="modal-header" id="lunr-search-header"><button type="button" class="close close-lunr-search" data-dismiss="modal" aria-label="Close"> &times; </button></div><div class="modal-body"><ul class="mb-0"></ul></div><div class="modal-footer"><button type="button" class="btn btn-secondary btn-sm close-lunr-search" data-dismiss="modal">Fechar</button></div></div></div></div>');
      $('#lunr-search-header').prepend('<h5 class="modal-title">Resultados da busca por "' + query + '"</h5>');
      
      if (lunr_idx) {
        var results = lunr_idx.search(query);
        if (Array.isArray(results) && results.length) {
          results.forEach(
            function(result) {
              var post = lunr_corpus[result.ref];
              var excerpt = post.content.substring(0, 100) + '...';
              $('#lunr-results ul').append('<li class="lunr-resultitem"><a href="' + post.url + '"><span class="title">' + post.title + '</span><br /><small><span class="body">' + excerpt + '</span></small></a></li>');
            }
          );
        } else {
          $('#lunr-results ul').html('<li class="lunr-resultitem">Desculpe, nenhum resultado foi encontado.</li>');
        }
      } else {
        $('#lunr-results ul').html('<li class="lunr-resultitem">Não foi possível realizar sua pesquisa.</li>');
      }
    }
    event.preventDefault();
  });

  // Lunr close modal
  $("#lunr-results").on('click', '.close-lunr-search', function () {
    $('#lunr-results').hide(1000);
    $('body').removeClass('modal-open');
  });

});