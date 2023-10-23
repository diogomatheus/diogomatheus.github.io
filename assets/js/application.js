var scrolled = false;
var lastScrollPosition = 0;

$(window).scroll(function(event) {
  var position = $(this).scrollTop();
  if (position > 280) {
    $('.publication-navigation').fadeIn();
  } else {
    $('.publication-navigation').fadeOut();
  }

  scrolled = true;
});

setInterval(scrollMonitoring, 250);

function scrollMonitoring() {
  if (scrolled) {
    scrollHandler();
    scrolled = false;
  }
}

function scrollHandler() {
  var position = $(this).scrollTop();
  if(Math.abs(lastScrollPosition - position) <= 5) return;
  
  // Control navbar with .nav-up and .nav-down to see what is "behind" the navbar.
  var navbarHeight = $('nav').outerHeight();
  if (position > lastScrollPosition && position > navbarHeight){         
    $('nav').removeClass('nav-down').addClass('nav-up'); 
    $('.nav-up').css('top', - navbarHeight + 'px');
  } else if (position + $(window).height() < $(document).height()) {               
    $('nav').removeClass('nav-up').addClass('nav-down');
    $('.nav-up, .nav-down').css('top', '0px');             
  }

  lastScrollPosition = position;
}