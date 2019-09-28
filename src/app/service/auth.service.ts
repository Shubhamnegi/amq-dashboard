import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string) {
    const token = window.btoa(`${username}:${password}`);
    localStorage.setItem('auth_token', token);
    console.log('[authservice][login] token', token);
  }
  logout() {
    localStorage.clear();
  }

}
