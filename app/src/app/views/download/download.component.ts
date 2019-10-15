import { Component, OnInit } from '@angular/core';
import { ConverterService } from 'src/app/services/converter.service';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { StoreState } from 'src/app/interfaces/state';
import { AddTracks } from 'src/app/store/actions';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  inProgress: boolean = false;

  constructor(
    private converterService: ConverterService,
    private snackBar: MatSnackBar,
    private store: Store<StoreState>
  ) { }

  ngOnInit() {
    this.converterService.onDone().subscribe(({ title, artist, category, date, length, id, path }) => {
      this.inProgress = false;
      this.store.dispatch(
        new AddTracks([
          new Track(
            {
              title,
              artist,
              category,
              date,
              length,
              id,
              path,
            }
          )
        ])
      );
      this.openSnackBar();
    });
  }

  processUrl(url: string): void {
    this.converterService.parseUrl(url);
    this.inProgress = true;
  }

  openSnackBar(): void {
    this.snackBar.open('Download completed!', 'Close', {
      duration: 3000,
    });
  }
}
