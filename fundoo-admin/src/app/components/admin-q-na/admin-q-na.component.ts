import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-admin-q-na',
  templateUrl: './admin-q-na.component.html',
  styleUrls: ['./admin-q-na.component.css']
})
export class AdminQNaComponent implements OnInit {

  constructor() { }
  

  ngOnInit() {

    /**calling jQuery's $ function, passing to it the document object */
    /** ready event occurs when the DOM loaded */
    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var    questionArray = [];

      /**AJAX is a technique for accessing web servers from a web page. */
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType: "json",
        headers: {
          'Authorization': token,
        },
      
        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */

        success: function (response) {
          var questionId=[];
          console.log("successfull");
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            questionArray.push([i+1, response.data[i].message]);
            questionId.push(response.data[i])
          }

          var questionArray1 = $('#example').DataTable({
            data: questionArray,
            
            "columnDefs": [ {
              "targets": -1,
              "defaultContent": 
              '<div class="btn-group">'+
              '<button class="newBtn btn btn-info btn-sm mx-3" type="button">Approve</button>'+'<div>'+'</div>'
              + '<button class="Mybtn btn btn-info btn-sm"  type="button">Reject</button>'
              +'</div>'
         } ]
          });
    var parent;
    $('#example').on('click', '.newBtn', function () {

      var RowIndex = $(this).closest('tr');
      var data = questionArray1.row(RowIndex).data();

      for (var i = 0; i < questionId.length; i++) {
     if(data[1] == questionId[i].message){
        parent=questionId[i].id;
        questionArray1.splice(i, 1)

      }

      }

      $.ajax({
        type: 'POST',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/'+parent,
        dataType: "json",
        // isApproved:true,
        headers: {
          'Authorization': token,
        },
       
  
        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */
        success: function (response) {
          $(this).addClass('row_selected');
          alert('Question approved successfully'); 

        }

      });
     
    
  });
  var  parentNew;
  $('#example').on('click', '.Mybtn', function (e) {

    var RowIndex = $(this).closest('tr');
    var data = questionArray1.row(RowIndex).data();
    console.log('questioniduyhj',data);
    console.log('questionid...',questionId[0].parentId);

    for (var i = 0; i < questionId.length; i++) {
   if(data[1] == questionId[i].message){
      parentNew=questionId[i].id;

    }

    }
    console.log('questionid...',parentNew);

    $.ajax({
      type: 'POST',
      url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/'+parentNew,
      dataType: "json",
      headers: {
        'Authorization': token,
      },
    
      /**error callback of $.ajax if error occcurs */
      error: function (response) {
        console.log('error');
        return false;

      },/**success is callback of $.ajax */
      success: function (response) {
        console.log('success',response);
        console.log(response.data);
        // $(this).find(".complete-tick").css('display','block');
        // e.preventDefault();
        alert('Question rejected successfully')
        // location.reload(true); 


      }

    });
   
  
});

          return false;

        },

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