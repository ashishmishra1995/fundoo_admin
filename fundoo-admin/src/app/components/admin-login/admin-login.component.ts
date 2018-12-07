import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http/http.service";
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(public httpService: HttpService,
    private router: Router,
    private auth: AuthServiceService) { }

  ngOnInit() {
    $(document).ready(function () {
    
      const Url = "http://34.213.106.173/api/user/adminLogin";

      $("button").click(function () {
        var em = ''+$("#inputEmail").val();
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(em)) {
          $('#inputEmail').val('');
          $("h6").text("Invalid Email Format").show().fadeOut(8000);;

        }

        else if (($("#inputEmail").val() == '') && $("#inputPassword").val() == '') {

          $("h6").text("Email and Password cannot be empty").show().fadeOut(8000);;
        }
        else if ($("#inputEmail").val() == '') {
          $('#inputEmail').val('');
          $("h6").text("Email is empty").show().fadeOut(8000);
        }
        else if ($("#inputPassword").val() == '') {
          $('#inputPassword').val('');

          $("h6").text("Password is empty").show().fadeOut(8000);
        } else {
          var body = {
            "email": $("#inputEmail").val(),
            "password": $("#inputPassword").val()
          }
          $.ajax({
            url: Url,
            data: body,
            type: "POST",
            success: function (result) {
              console.log(result);
              localStorage.setItem('token', result.id);
              
              alert("Login Successful. Press 'OK' to continue to the Home Page");
              window.location.href = "/admin-home";
            },
            error: function (error) {
              console.log(error);
              alert("Please enter valid Email/Password");
              alert("Login failed");
            }
          })
        }

      });
    });
  }
}

