//Remove elements when mobile
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  $('.desktop').attr('id', 'mobile');
}
$(window).resize(function() {
  if ($(window).width() < 760){
    $('.desktop').attr('id', 'mobile');
  } else {
    $('.desktop').removeAttr('id');
  };
});
