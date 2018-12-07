import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'bootstrap'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {


      const userUrl = "http://34.213.106.173/api/user/getAdminUserList";
      var token= localStorage.getItem('token');
      
      $.ajax({
        url: userUrl,
        type: "GET",
        success: function (result) {
          console.log(result);
          var users = [];
          for (var i = 0; i < result.data.data.length; i++) {
            users.push([i,result.data.data[i].firstName, result.data.data[i].lastName, result.data.data[i].email, result.data.data[i].service]);
          }

          var dataTable= $('#reg_users').DataTable({
            data: users,
            responsive:true,
            "columnDefs": [
            {
                "render": function ( data, type, row, meta ) {
                    return "<button type='button' class='btn btn-secondary btn-lg' data-toggle='modal' data-target='#myModal'>Click for details</button>"
                },
                "targets": 5
            }]
          });
          $('#reg_users').on( 'click' ,'tr', function(){
                  var rowIndex = dataTable.row(this).index()
                
                  $('#name').html('<h4>'+result.data.data[rowIndex].firstName+' '+result.data.data[rowIndex].lastName+'</h4>');
                  $('#content1').html('<p> PhoneNumber : '+result.data.data[rowIndex].phoneNumber+'</p>');
                  $('#content2').html('<p> Role : '+result.data.data[rowIndex].role+'</p>');
                  $('#content3').html('<p> Service : '+result.data.data[rowIndex].service+'</p>');
                  $('#content4').html('<p> Created Date : '+result.data.data[rowIndex].createdDate+'</p>');
                  $('#content5').html('<p> Username : '+result.data.data[rowIndex].username+'</p>');
                  $('#content6').html('<p> Email : '+result.data.data[rowIndex].email+'</p>');
                  $('#content7').html('<p> Email Verified : '+result.data.data[rowIndex].emailVerified+'</p>');
                  
            
              
            
              })
        },
        error: function (error) {
          console.log(error);

        }
      });
      const cardUrl = "http://34.213.106.173/api/user/UserStatics";
      $.ajax({
        headers:{
          'Authorization': token
        },
        url: cardUrl,
        type:"GET",
        success: function(response){
          
          var arr= response.data.details;
          var html="";
          for(var i=0;i<arr.length;i++){
            html += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'><div class='card' style='margin-top:10%; height:200px; width:150px'>";
            html += "<div class='card-header' style='padding-top:10%; background-color:#F4B400'><h4>"+arr[i].service+"</h4></div>";
            html += "<div class='card-body' style='padding-bottom:10%; background-image: linear-gradient(white, #563d7c);'>number of users: "+arr[i].count+"</div>";
            html += "</div></div>";
          }
          $("#services").html(html);
        }
      });
      const logoutUrl="http://34.213.106.173/api/user/logout";
      $("#logout").click(function(){
        $.ajax({
          url: logoutUrl,
          headers:{
            'Authorization': token
          },
          type: "POST",
          success: function (result) {
            
            alert("Successfully Logged Out. Press 'OK' to redirect to Login Page");
            localStorage.removeItem('token');
            $(location).attr('href', 'admin-login')

          },
          error: function (error) {
            
            alert("Admin Logout Failed");
          }
        })
      })
    });
  }

}
