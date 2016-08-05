$('#birthdayField').pickadate({
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 38 // Creates a dropdown of 15 years to control year
});
$(document).ready(function() {
  $('select').material_select();
});



function nullValue(obj){

         $("#"+obj+"Field").attr("class","validate invalid");
         $("#"+obj+"DIV").children("label").attr("class","active");
         sweetAlert({
            title: "這位施主~",
            text: "你眼睛業障重嗎? <br>有東西沒填就想矇混關?<br>想太美了ლ(́◕◞౪◟◕‵ლ)",
            html: true ,
            type: "error",});
}


function send(){
  jsonForm = [];
  var tmp = {};
  var t;
  for(t of $("#K-form input")) {
      if(t.type=="radio"&&t.checked==false){
        continue;
      }
      if(t.disabled==true){
        continue;
      }
      tmp[t.name]=t.value;
      if(t.className=="validate invalid"){
        sweetAlert("你知道多寫防呆機制多辛苦嗎?", "回去檢查你的資料有沒有錯!!!", "error");
        return;
      }

      //check nullable
      if(t.name!="nickName" && t.value==""){
        t.className="validate invalid";
         $("#"+t.name+"DIV").children("label").attr("class","active");
         sweetAlert({
            title: "這位施主~",
            text: "你眼睛業障重嗎? <br>有東西沒填就想矇混關?<br>想太美了ლ(́◕◞౪◟◕‵ლ)",
            html: true ,
            type: "error",});
         return;
      }//end of if
  }//end of for
  tmp["dept"]=$('select[name="dept"]').val();
  if(tmp["dept"]==""){
    nullValue("dept");
    return;
  }
  tmp["clothingSize"]=$('select[name="clothingSize"]').val();
  if(tmp["clothingSize"]==""){
    nullValue("clothingSize");
    return;
  }
  tmp["bedding"]=$('select[name="bedding"]').val();
  if(tmp["bedding"]==""){
    nullValue("bedding");
    return;
  }
  tmp["moreInfo"]=$("#moreInfo").val();
  delete tmp[""];
  if((!tmp["transportation"])||(!tmp["eatingPerf"])||(!tmp["gender"])){
            sweetAlert({
            title: "這位施主~",
            text: "你眼睛業障重嗎? <br>有選項沒填就想矇混關?<br>想太美了ლ(́◕◞౪◟◕‵ლ)",
            html: true ,
            type: "error",});
         return;
  }
  //check null
  for(var i in tmp){
    if(tmp[i]==""||tmp[i]==null){
        if(!(i=="nickName"||i=="moreInfo")){
        sweetAlert({
            title: "這位施主~",
            text: "你眼睛業障重嗎? <br>有選單沒填就想矇混過關?<br>想太美了ლ(́◕◞౪◟◕‵ლ)",
            html: true ,
            type: "error",});
         return;
        }
    }
  }


  jsonForm = tmp;
  jsonForm = JSON.stringify(jsonForm);
  //alert(jsonForm)



    //傳送資料
    $.ajax({
      url: location.protocol + "//" + location.host + "/api/1.0/user/",
      data: {"jsonForm":jsonForm},
      type: "POST",
      datatype: "json",

      success: function(msg) {
        msg=JSON.parse(msg);
        if(msg["statusCode"]==500){
            sweetAlert("Unknown Error","","error");
        }
        else if(msg["statusCode"]==449){
            sweetAlert("資料錯誤","請檢查你的資料或者是你已經報名過了","error");
        }
        else if(msg["statusCode"]==200){
            sweetAlert ({
              title: "報名成功",
              text: "以ATM繳費同學記得填寫後五碼唷~~",
              type: "success"
            },
            function(){
              window.location.href = "https://yzu2016camp.itaclub.asia";
            });
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        alert(url);
      }
    });


}

//focus check
//**************************************
// 台灣身份證檢查簡短版 for Javascript
//**************************************
function checkTwID(id){
    //建立字母分數陣列(A~Z)
    var city = new Array(
         1,10,19,28,37,46,55,64,39,73,82, 2,11,
        20,48,29,38,47,56,65,74,83,21, 3,12,30
    )
    id = id.toUpperCase();
    // 使用「正規表達式」檢驗格式
    if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
        sweetAlert({
            title: "這位大哥~",
            text: "國家養你這麼久了<br>不要連身分證字號都不知道喔ξ( ✿＞◡❛)",
            html: true ,
            type: "error",});
        return false;
    } else {
        //將字串分割為陣列(IE必需這麼做才不會出錯)
        id = id.split('');
        //計算總分
        var total = city[id[0].charCodeAt(0)-65];
        for(var i=1; i<=8; i++){
            total += eval(id[i]) * (9 - i);
        }
        //補上檢查碼(最後一碼)
        total += eval(id[9]);
        //檢查比對碼(餘數應為0);
        return ((total%10 == 0 ));
    }
}

//check userID
$("#userIDField").blur(function(){
    if(!checkTwID($("#userIDField")[0].value)){
        sweetAlert({
            title: "這位大哥~",
            text: "國家養你這麼久了<br>不要連身分證字號都不知道喔ξ( ✿＞◡❛)",
            html: true ,
            type: "error",});
        $("#userIDField").attr("class","validate invalid");
        $("#userIDDIV").children("label").attr("class","active");
    }

});//end of userID

//check cellphone
$("#cellphoneField").blur(function(){
    var value=$("#cellphoneField")[0].value;
    //if error
    if(!value){
        $("#cellphoneField").attr("class","validate invalid");
        $("#cellphoneDIV").children("label").attr("class","active");
        return;
    }
    if(value.search(/^(09)[0-9]{8}$/)==-1){
        sweetAlert({
            title: "格式錯誤~",
            text: "電話號碼覺得難過<br>但電話號碼不說",
            html: true ,
            type: "error",
            });
        $("#cellphoneField").attr("class","validate invalid");
        $("#cellphoneDIV").children("label").attr("class","active");
        return;
    }



});//end of cellphone

$("#parentCellphoneField").blur(function(){
    var value=$("#parentCellphoneField")[0].value;
    //if error
    if(value.search(/^(09)[0-9]{8}$/)==-1){
        sweetAlert({
            title: "格式錯誤~",
            text: "電話號碼覺得難過<br>但電話號碼不說",
            html: true ,
            type: "error",
            });
        $("#parentCellphoneField").attr("class","validate invalid");
        $("#parentCellphoneDIV").children("label").attr("class","active");
    }



});//end of cellphone

$("#yzuIDField").blur(function(){
    var value=$("#yzuIDField")[0].value;
    //if error
    if(value.search(/^(105)(16|17|14|15|33|18|20)[0-9]{2}/)==-1){
        sweetAlert({
            title: "Oops~",
            text: "請到元智確認一下你的學號有沒有正確喔ξ( ✿＞◡❛)",
            html: true ,
            type: "error",
            });
        $("#yzuIDField").attr("class","validate invalid");
        $("#yzuIDDIV").children("label").attr("class","active");
    }


});//end of cellphone
