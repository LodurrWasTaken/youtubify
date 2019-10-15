import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  host: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private _url(path: string) {
    return `${this.host}/${path}`;
  }
  private _get(path: string) {
    return this.http.get(this._url(path));
  }
  private _delete(path: string, body: string[]) {
    path = `${path}?ids=${body.join(',')}`;
    return this.http.delete(this._url(path));
  }

  getTracks() {
    return this._get('tracks');
  }

  deleteTracks(ids: string[]) {
    return this._delete('tracks', ids);
  }
}
