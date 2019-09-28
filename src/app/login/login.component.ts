import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { JolokiaService } from '../service/jolokia.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = null;
  constructor(private authService: AuthService, private router: Router, private jolokiaService: JolokiaService) { }

  ngOnInit() {
    this.initiateLoginForm();
  }

  /**
   * @summary
   * Login form
   */
  initiateLoginForm() {
    this.loginForm = new FormGroup({
      baseurl: new FormControl('http://localhost:3000/proxy', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * To store basic auth token in storage
   */
  login() {
    const values = this.loginForm.value;
    this.jolokiaService.baseurl = values.baseurl;
    this.authService.login(values.username, values.password);
    console.log('[login] baseurl', this.jolokiaService.baseurl);
    console.log('[login] basic auth token stored');

  }

}
