import { Component, OnInit, ViewChild } from '@angular/core';
import { JolokiaService } from 'src/app/service/jolokia.service';
import { QueueDetails } from 'src/app/interface/jolokia-interface';
import { MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';

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
  searchQueue = new FormControl();

  @ViewChild(MatSort) sort: MatSort;



  constructor(private jolokiaService: JolokiaService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getQueueList();
    this.dataSource.sort = this.sort;
    this.searchQueue.valueChanges.subscribe(data => {
      this.dataSource.filter = data;
    });
  }

  detailInfoToggle() {
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

  purge(name) {
    console.log('[queue.component][purge] name:', name);
    this.openSnackBar('Purging queue');
    this.jolokiaService.purgeQueue(name)
      .then(data => {
        this.openSnackBar('Queue purged');
        this.getQueueList();
      }).catch(error => {
        alert('Error Occured while purging');
        console.error(error);
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

}
