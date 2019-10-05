import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APPLICATION_CONSTANTS } from '../constats';
import { AuthService } from './auth.service';
import { JolokiaInterface, QueueDetails } from '../interface/jolokia-interface';


@Injectable({
  providedIn: 'root'
})
export class JolokiaService {
  proxyHost = 'http://localhost:8081/proxy';
  baseurl: string = null;
  constructor(private http: HttpClient, private authService: AuthService) { }

  getToken() {
    const token = this.authService.token;
    if (!token) {
      return this.authService.logout();

    }
    return token;
  }

  getHeaders() {
    const token = this.getToken();
    console.log('[JolokiaService][getQueueList] auth token', token);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + token);
    headers = headers.append('X-Host', this.baseurl);
    return headers;
  }

  getQueueList(): Promise<QueueDetails[]> {
    const headers = this.getHeaders();
    return this.http.get(this.proxyHost +
      APPLICATION_CONSTANTS.JOLOKIA_READ +
      '/org.apache.activemq:type=Broker,brokerName=ActiveMQ_Prod_1,destinationType=Queue,destinationName=*/Name,DLQ,MemoryUsagePortion,QueueSize,InFlightCount,CursorMemoryUsage',
      { headers: headers })
      .toPromise().then((data: JolokiaInterface) => {
        let result: QueueDetails[] = null;
        if (data.value) {
          result = Object.values(data.value);
        } else {
          throw Error('value not found');
        }
        return result;
      });
  }

  purgeQueue(name) {
    if (!name || name === '*') {
      throw Error('invalid value');
    }
    const headers = this.getHeaders();
    return this.http.get(this.baseurl + APPLICATION_CONSTANTS.JOLOKIA_EXEC +
      `/org.apache.activemq:type=Broker,brokerName=ActiveMQ_Prod_1,destinationType=Queue,destinationName=${name}/purge`,
      { headers: headers })
      .toPromise();
  }
}

