import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { Track } from './models/track';
import { Store } from '@ngrx/store';
import { StoreState } from './interfaces/state';
import { AddTracks } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private store: Store<StoreState>
  ) { }

  ngOnInit() {
    this.httpService.getTracks().subscribe((tracks: Track[]) => {
      this.store.dispatch(new AddTracks(tracks));
    });
  }
}
