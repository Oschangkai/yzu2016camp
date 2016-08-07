$(document).ready(function(){
  if(navigator.userAgent.match("Firefox")){
    alert("請記得將 Firefox 更新到最新版本，不然會出問題唷!!");
  } else if (navigator.userAgent.match("Opera") || navigator.userAgent.match("OPR")) {
    alert("請記得將 Opera 更新到最新版本，不然會出問題唷!!");
  } else if (navigator.userAgent.match("Chrome")) {
    alert("請記得將 Chrome 更新到最新版本，不然會出問題唷!!");
  } else if (navigator.userAgent.match("Safari")) {
    alert("請記得將 Safari/iOS 更新到最新版本，不然會出問題唷!!");
  } else if (navigator.userAgent.match("MSIE")) {
    alert("本網頁完全不支援 IE，請換瀏覽器，不然絕對會出問題唷!!");
  } else {
    alert("請記得將瀏覽器更新到最新版本，不然會出問題唷!!");
  }
});
