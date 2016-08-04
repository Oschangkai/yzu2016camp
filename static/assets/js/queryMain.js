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
        sweetAlert("你知道嗎~", "就跟你說有錯了還要送!!!", "error");
        return;
      }


  }

  jsonForm = tmp;
  jsonForm = JSON.stringify(jsonForm);

  if(method) {

    //alert(jsonForm);
    if(method == "query") {
      var sendtype = "GET";
      if(tmp["email"]=="") {
        $("#emailField").attr("class","validate invalid");
        $("#emailDIV").children("label").attr("class","active");
        sweetAlert("你知道多寫防呆機制多辛苦嗎?", "回去檢查你的資料有沒有錯!!!", "error");
        return;
      }
    } else if(method == "register") {
      var sendtype = "POST";
      if(tmp["email"]=="") {
        $("#emailField").attr("class","validate invalid");
        $("#emailDIV").children("label").attr("class","active");
        sweetAlert("你知道多寫防呆機制多辛苦嗎?", "回去檢查你的資料有沒有錯!!!", "error");
        return;
      }
      if(tmp["payment"]=="") {
        $("#paymentField").attr("class","validate invalid");
        $("#paymentDIV").children("label").attr("class","active");
        sweetAlert("你知道多寫防呆機制多辛苦嗎?", "回去檢查你的資料有沒有錯!!!", "error");
        return;
      }
    }

    //傳送資料
    $.ajax({
      url: location.protocol + "//" + location.host + "/api/1.0/pay/",
      data: {"jsonForm":jsonForm},
      type: sendtype,
      datatype: "json",

      success: function(msg) {
        msg=JSON.parse(msg);
        if(msg["statusCode"]==500){
            sweetAlert("Unknown Error","","error");
        }
        else if(msg["statusCode"]==449){

            if(method == "register"){
                sweetAlert("資料錯誤","請檢查你的資料或者是你已經報名過了","error");
            }
            else{

                sweetAlert("孩子~","請先填寫後五碼好嗎?","error");
                return;
            }
        }

        else if(msg["statusCode"]==200){
            if(method == "register"){
                sweetAlert("報名成功","","success");
            }
            else{
                if(msg["isPay"]){
                sweetAlert("繳費成功","","success");
                return;
                }
                sweetAlert("尚未繳費","","error");
                return;
            }
        }
        //no register
        else if(msg["statusCode"]==487){
            if(method == "register"){
              sweetAlert({
                title: "這位施主~",
                text: "請先<a href='https://web-yzu2016camp.rhcloud.com/portal/register'>註冊</a>好嗎ლ(́◕◞౪◟◕‵ლ)",
                html: true ,
                type: "error",});
                }
            else{
                if(msg["isPay"]){
                sweetAlert("繳費成功","","success");
                return;
                }
                sweetAlert("繳費失敗","","error");
                return;
            }
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);

      }
    });

  } else {
    sweetAlert("你知道多寫防呆機制多辛苦嗎?", "你是要登記還是查詢啊啊!!!!!", "error");
  }

}
