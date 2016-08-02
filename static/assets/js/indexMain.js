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
//countdown
date1 = new Date(2016, 07, 22, 09, 00, 00, 00); //迎期開始
dateStart = date1.getTime(); //getTime() = milliseconds
delete date1;
date2 = new Date(2016, 07, 26, 17, 00, 00, 00); //迎期結束
dateEnd = date2.getTime();
delete date2;

function countDown(dStart, dEnd, objID) {
  dateTimeNow = new Date(); //現在時間
  toCampRemaining = dStart - dateTimeNow.getTime(); //距離迎期開始的時間
  campingRemaining = dEnd - dateTimeNow.getTime(); //距離迎期後的時間
  delete dateTimeNow;
  if (campingRemaining < 0) { //迎期結束
    document.getElementById(objID + 'Msg').innerHTML="距離三資迎新已經過了";
    campingRemaining = -(Math.floor(campingRemaining / 1000)); //milliseconds -> seconds
    counting(campingRemaining);
  }
  else { //還沒到迎期結束
    if (toCampRemaining < 0) { //迎期中
      document.getElementById(objID + 'Msg').innerHTML="三資迎新剩下";
      campingRemaining = Math.floor(campingRemaining / 1000); //milliseconds -> seconds
      counting(campingRemaining);
    } else { //還沒到迎期
      document.getElementById(objID + 'Msg').innerHTML="距離三資迎新還有";
      toCampRemaining = Math.floor(toCampRemaining / 1000); //milliseconds -> seconds
      counting(toCampRemaining);
    }
  }
  function counting (remaining) { //計算時間
    days = Math.floor(remaining / 86400); //天
    remaining = remaining % 86400;
    hours = Math.floor(remaining / 3600); //時
    remaining = remaining % 3600;
    mins = Math.floor(remaining / 60); //分
    remaining = remaining % 60;
    secs = Math.floor(remaining); //秒
    //如果只有一位數，補一位 0 上去
    if (days <= 9) {days = '0' + days}
    if (hours <= 9) {hours = '0' + hours}
    if (mins <= 9) {mins = '0' + mins}
    if (secs <= 9) {secs = '0' + secs}
  }
   document.getElementById(objID + 'D').innerHTML = days;
   document.getElementById(objID + 'H').innerHTML = hours;
   document.getElementById(objID + 'M').innerHTML = mins;
   document.getElementById(objID + 'S').innerHTML = secs;
   if (days <= 7) {
     $('.statistic').addClass('red');
   } else {
     $('.statistic').removeClass('red');
   }
   setTimeout(function(){countDown(dStart, dEnd, objID)}, 1000);
}
window.onload=function(){
     countDown(dateStart, dateEnd, 'countdown');
};
