import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = null;

  constructor(private router: Router) { }


  login(username: string, password: string) {
    const token = window.btoa(`${username}:${password}`);
    this.token = token;
    console.log('[authservice][login] token', this.token);
    this.router.navigate(['dashboard']);
  }
  logout() {
    this.token = null;
    this.router.navigate(['login']);
  }

}
