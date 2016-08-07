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
        if(msg["statusCode"]==200){
        createTable(msg["UserList"]);
        table= $('#datatable').DataTable( {
                        "scrollX": true,
                        dom: 'Bfrtip',
                        buttons: [
                            'copy', 'excel'/*,
                            {
                                extend: 'excel',
                                text: 'Current2Excel',
                                exportOptions: {
                                    modifier: {
                                        page: 'current'
                                    }
                                }
                            }*/
                        ]
                    } );
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

   $('#showController input:checkbox.SandH').on( 'click', function (e) {
        //e.preventDefault();


        // Get the column API object
        var column = table.column( $(this).attr('data-column') );

        // Toggle the visibility
        column.visible( ! column.visible() );

        //setTimeout(function(){$(this).prop('checked', true);},0);
    } );

    $("#table").on( 'click' ,'.sendData', function(e){
    //avoid stupid
    if(!$("#edit")[0].checked==true){
        alert("你無此權限");
        return;
    }
        var jsonForm={};
        jsonForm["email"]=$(this).parent().parent().find('#email').text();
        jsonForm["isPay"]=$(this)[0].checked
        jsonForm["auth1"]=auth1;
        jsonForm["auth2"]=auth2;
        jsonForm = JSON.stringify(jsonForm);
        var tmp=this;

        //alert(jsonForm);
       $.ajax({

          url: location.protocol + "//" + location.host + "/api/1.0/pay/",
          data: {"jsonForm":jsonForm},
          type: "PUT",
          datatype: "json",

          success: function(msg) {

            msg=JSON.parse(msg);
            if(msg["statusCode"]!=200){
            alert("fail to do this operate plaese refresh and try again");
            alert(msg["statusCode"]);
            alert(msg["descript"]);
            return;

            }
           // $(tmp).parent()[0].innerText=$(tmp)[0].checked.toString();
           $(tmp).parent()[0].innerText = Boolean(msg["isPay"]).toString();



          },
          error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);

          }
        });
    });


       $("#table").on( 'click' ,'td', function(e){
       var jsonForm={};
       if(e.target.nodeName=="INPUT"){
        return;
       }


       if($("#edit")[0].checked==true){
           jsonForm["Bemail"]=$(this).parent().find('#email').text();
           for (var i of $(this).parent().children()){
                jsonForm[i.id]=i.textContent;
           }
           var input=prompt("please enter the value you want to change",$(this).context.textContent);
           if(input==null){
            return;
           }
           jsonForm[$(this).attr("id")]=input;





        jsonForm["auth1"]=auth1;
        jsonForm["auth2"]=auth2;
        jsonForm = JSON.stringify(jsonForm);
        var tmp=this;

        //alert(jsonForm);
       $.ajax({

          url: location.protocol + "//" + location.host + "/api/1.0/user/",
          data: {"jsonForm":jsonForm},
          type: "PUT",
          datatype: "json",

          success: function(msg) {

            msg=JSON.parse(msg);
            if(msg["statusCode"]!=200){
            alert("fail to do this operate plaese refresh and try again");
            alert(msg["statusCode"]);
            alert(msg["descript"]);
            return;

            }
            $(tmp).context.textContent = input;



          },
          error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);

          }
        });
        }
    });

 });


 function createTable(jsonArray){
    for (var i in jsonArray){
        addRow(jsonArray[i]);
    }

 }

 function addRow(data){

    var table="";
    var tag=$("#tag th");
    for(var i of tag){
    if(i.id=="isPay" && data[i.id]==false){
        table+="<td><input type='checkbox' class='sendData'>"+data[i.id]+"</td>"
        continue;
    }

        table+="<td id='"+i.id+"'>"+data[i.id]+"</td>";
    }
    $("table").append(
        $("<tr>").append(
            table
        )
    )//end of table append
 }//end of addRow

 $("#edit").click(function(){
    if($("#edit")[0].checked==false){
        return;
    }
    var pass = prompt("password3");
    if(pass!="邱比特"){
        alert("密碼錯誤");
        $("#edit")[0].checked=false;
        return;
    }


 })