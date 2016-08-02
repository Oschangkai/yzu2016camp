function check(){
  if (document.getElementById('paymentRadio').checked) {
      document.getElementById('paymentField').disabled = false;
  } else if (document.getElementById('queryRadio').checked) {
      document.getElementById('paymentField').disabled = true;
      $("#paymentDIV").children("label").attr("class","");
      $("#paymentField").attr("class","validate");
  }
}
function send(){
  jsonForm = [];
  var tmp = {};
  var t;
  var method = $("input[name='choose']:checked").val();
  for(t of $("#K-form input")) {
      tmp[t.name]=t.value;

      if(t.className=="validate invalid"){
        sweetAlert("你知道多寫防呆機制很累嗎?", "回去檢查你的資料有沒有錯!!!", "error");
        return;
      }


  }

  jsonForm = tmp;
  jsonForm = JSON.stringify(jsonForm);

  if(method) {

    alert(jsonForm);
    if(method == "query") {
      var sendtype = "GET";
      if(tmp["email"]=="") {
        $("#emailField").attr("class","validate invalid");
        $("#emailDIV").children("label").attr("class","active");
        sweetAlert("你知道多寫防呆機制很累嗎?", "電子信箱記得寫......", "error");
        return;
      }
    } else if(method == "register") {
      var sendtype = "POST";
      if(tmp["email"]=="") {
        $("#emailField").attr("class","validate invalid");
        $("#emailDIV").children("label").attr("class","active");
        sweetAlert("你知道多寫防呆機制很累嗎?", "電子信箱記得寫......", "error");
        return;
      }
      if(tmp["payment"]=="") {
        $("#paymentField").attr("class","validate invalid");
        $("#paymentDIV").children("label").attr("class","active");
        sweetAlert("你知道多寫防呆機制很累嗎?", "都填了電子信箱，帳號後五碼也記得寫一下嘛.....", "error");
        return;
      }
    }

    //傳送資料
    $.ajax({
      url: location.protocol + "//" + location.host + "/api/1.0/pay/",
      data: {"jsonForm":jsonForm},
      type: sendtype,
      datatype: "json",

      success: function(msg) {alert(msg);},
      error: function(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        alert(url);
      }
    });

  } else {
    sweetAlert("你知道多寫防呆機制很累嗎?", "要登記還是查詢選一下啊!!!!!", "error");
  }

}
