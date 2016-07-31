$('#birthdayField').pickadate({
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 38 // Creates a dropdown of 15 years to control year
});
$(document).ready(function() {
  $('select').material_select();
});
function send(){
  jsonForm = [];
  var tmp = {};
  var t;
  for(t of $("#K-form input")) {
      if(t.type=="radio"&&t.checked==false){
        continue;
      }
      tmp[t.name]=t.value;
  }
  tmp["dept"]=$('select[name="dept"]').val();
  tmp["clothingSize"]=$('select[name="clothingSize"]').val();
  tmp["bedding"]=$('select[name="bedding"]').val();
  tmp["moreInfo"]=$("#moreInfo").val();

  jsonForm = tmp;
  jsonForm = JSON.stringify(jsonForm);
  alert(jsonForm)



    //傳送資料
    $.ajax({
      url: location.protocol + "//" + location.host + "/api/1.0/user/",
      data: {"jsonForm":jsonForm},
      type: "POST",
      datatype: "json",

      success: function(msg) {alert(msg);},
      error: function(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        alert(url);
      }
    });


}
