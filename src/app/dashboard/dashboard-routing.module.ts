import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { QueueComponent } from './queue/queue.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children:
      [{
        path: 'queue', component: QueueComponent
      }, {
        path: 'topic', component: TopicComponent
      }, {
        path: '', redirectTo: 'queue', pathMatch: 'full'
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
