import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private readonly socket: Socket) { }

  parseUrl(url: string): void {
    this.socket.emit('onConvert', url);
  }

  onDone(): Observable<any> {
    return this.socket.fromEvent('onDone');
  }
}
