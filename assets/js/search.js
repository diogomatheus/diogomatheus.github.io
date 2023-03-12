$(document).ready(function() {
  
  // Lunr bootstrap
  $.getJSON('/search-data.json', function(data) {
    console.log(typeof data);

    window.lunr_idx = lunr(function () {
      this.ref('id');
      this.field('title');
      this.field('content');
      $.each(data, function(index, value) { this.add( $.extend({ 'id': index }, value) ) });
      // documents.forEach(function (doc) { this.add(doc) }, this)
    });
  });

  // Lunr search
  $('#lunr-search-form').submit(function(event) {
    var query = $('#lunr-search-input').val();
    if(query) {
      $('#lunr-results').show(1000);
      $('body').addClass('modal-open');

      $('#lunr-results').html('<div id="resultsmodal" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="resultsmodal"><div class="modal-dialog shadow-lg" role="document"><div class="modal-content"><div class="modal-header" id="lunr-search-header"><button type="button" class="close close-lunr-search" data-dismiss="modal" aria-label="Close"> &times; </button></div><div class="modal-body"><ul class="mb-0"></ul></div><div class="modal-footer"><button type="button" class="btn btn-secondary btn-sm close-lunr-search" data-dismiss="modal">Fechar</button></div></div></div></div>');
      $('#lunr-search-header').prepend('<h5 class="modal-title">Resultados da busca por "' + query + '"</h5>');
      
      var results = window.lunr_idx.search(query);
      if (Array.isArray(results) && results.length) {
        results.forEach(function(resultitem) {
          var excerpt = resultitem.content.substring(0, 100) + '...';
          $('#lunr-results ul').append('<li class="lunr-resultitem"><a href="' + resultitem.url + '"><span class="title">' + resultitem.title + '</span><br /><small><span class="body">' + excerpt + '</span></small></a></li>');
        });
      } else {
        $('#lunr-results ul').html('<li class="lunr-resultitem">Desculpe, nenhum resultado foi encontado.</li>');
      }
    }
    event.preventDefault();
  });

  // Lunr modal close
  $("#lunr-results").on('click', '.close-lunr-search', function () {
    $('#lunr-results').hide(1000);
    $('body').removeClass('modal-open');
  });

});