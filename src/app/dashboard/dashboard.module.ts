import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularModulesModule } from '../angular-modules/angular-modules.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QueueComponent } from './queue/queue.component';
import { TopicComponent } from './topic/topic.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DashboardComponent, QueueComponent, TopicComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    AngularModulesModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
