$(function() {
  // Disable the page until loaded.
  $(window).on('load', function() {
    $('load').remove();
  });
  //scrolling effect
  $.scrollIt({
    topOffset: -85
  });
});
//navbar controller
$(window).scroll(function() {
  if ($(document).scrollTop() >= $(window).height()/6) {
    $('nav').addClass('act2').removeClass('act1');
  } else {
    $('nav').addClass('act1').removeClass('act2');
  }
});
