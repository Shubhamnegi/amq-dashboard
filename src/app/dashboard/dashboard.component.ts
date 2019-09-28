import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { JolokiaService } from '../service/jolokia.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  baseurl = null;
  constructor(private router: Router, private authService: AuthService, private jolokiaService: JolokiaService) { }

  ngOnInit() {
    this.baseurl = this.jolokiaService.baseurl;
  }

  logout() {
    this.authService.logout();
  }

  navigateToQueue() {
    this.router.navigate(['dashboard', 'queue']);
  }

  navigateToTopic() {
    this.router.navigate(['dashboard', 'topic']);
  }

}
