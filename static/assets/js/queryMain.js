function check(){
  if (document.getElementById('paymentRadio').checked) {
      document.getElementById('paymentField').disabled = false;
  } else if (document.getElementById('queryRadio').checked) {
      document.getElementById('paymentField').disabled = true;
  }
}
function send(){
  jsonForm = [];
  var tmp = {};
  var t;
  for(t of $("#K-form input")) {
      tmp[t.name]=t.value;
  }

  jsonForm = tmp;
  jsonForm = JSON.stringify(jsonForm);
  var method = $("input[name='choose']:checked").val(); //radio 取值，注意寫法
  alert(method)

  if(method) {

    alert(jsonForm);
    if(method == "query") {
      var sendtype = "GET";
    } else if(method == "register") {
      var sendtype = "POST";
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

  }
}
