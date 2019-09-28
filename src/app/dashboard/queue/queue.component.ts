import { Component, OnInit, ViewChild } from '@angular/core';
import { JolokiaService } from 'src/app/service/jolokia.service';
import { QueueDetails } from 'src/app/interface/jolokia-interface';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.sass']
})
export class QueueComponent implements OnInit {
  loading = true;
  detailedInfo = false;
  displayedColumns: string[] = ['Name', 'DLQ', 'QueueSize', 'Actions'];
  dataSource = new MatTableDataSource<QueueDetails>();

  @ViewChild(MatSort) sort: MatSort;



  constructor(private jolokiaService: JolokiaService) {

  }

  ngOnInit() {
    this.getQueueList();
    this.dataSource.sort = this.sort;
  }

  detailInfoToggle($event) {
    this.detailedInfo = !this.detailedInfo;
    if (this.detailedInfo) {
      this.displayedColumns = ['Name', 'DLQ', 'QueueSize', 'MemoryUsagePortion', 'InFlightCount', 'CursorMemoryUsage', 'Actions'];
    } else {
      this.displayedColumns = ['Name', 'DLQ', 'QueueSize', 'Actions'];
    }
  }

  getQueueList() {
    this.loading = true;
    this.jolokiaService.getQueueList().then(data => {
      this.loading = false;
      this.dataSource.data = data;
    }).catch(error => {
      this.loading = false;
      console.error('[queuecomponent][getQueueList]', error);
      alert('Error occured');
    });
  }

}
