import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthServiceService {

   constructor(private router: Router) { }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

}