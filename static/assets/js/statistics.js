var data;
$(document).ready(function(){

    var table;
    var auth1=prompt("please enter the password1");
    var auth2=prompt("please enter the password2");
    var jsonForm={};
    jsonForm["auth1"]=auth1;
    jsonForm["auth2"]=auth2;
    jsonForm = JSON.stringify(jsonForm);
   $.ajax({
      url: location.protocol + "//" + location.host + "/api/1.0/user/",
      data: {"jsonForm":jsonForm},
      type: "GET",
      datatype: "json",

      success: function(msg) {
        msg=JSON.parse(msg);
        data=msg;
        if(msg["statusCode"]==200){

         }
         else{
            alert(msg["statusCode"]);
            alert(msg["descript"]);

         }

      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        alert(url);
      }
   });
});

function draw(Data){

    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: Data["title"]
      },
      animationEnabled: true,
      axisY: {
        title: "人數"
      },
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      theme: "theme2",
      data: [

      {
        type: "column",
        showInLegend: true,
        legendMarkerColor: "blue",
        legendText: "人數 = 1 人 / 1 單位",
        dataPoints: Data["data"]
      }
      ]
    });

    chart.render();

}

$("button").click(function(){
    Data={};
    Data["title"]=$(this).text();
    Data["data"]=[];
    var tmp={}
    tmp.y=data["UserList"].length;
    tmp.label="總人數";
    Data["data"].push(tmp);
    for(var x of data["UserList"]){
        for(var y of Data["data"]){
            if(typeof(x[$(this).attr("id")])=="boolean"){
                x[$(this).attr("id")]=x[$(this).attr("id")].toString();
            }
            //had in the array
            if(x[$(this).attr("id")]==y.label){
                y.y+=1;
                break;

            }

            if(Data["data"].indexOf(y)==Data["data"].length-1){
                var tmp={};
                tmp.y=1;
                tmp.label=x[$(this).attr("id")];
                Data["data"].push(tmp);
                break;
            }
        }

    }//end of double for
    draw(Data);
});