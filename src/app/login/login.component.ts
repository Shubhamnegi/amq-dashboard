import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = null;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initiateLoginForm();
  }

  /**
   * @summary
   * Login form
   */
  initiateLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * To store basic auth token in storage
   */
  login() {
    const values = this.loginForm.value;
    this.authService.login(values.username, values.password);
    console.log('[login] basic auth token stored');
  }

}
