import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';
import { StoreState } from 'src/app/interfaces/state';
import { Track } from 'src/app/models/track';
import { DeleteTracks } from 'src/app/store/actions';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'artist', 'category', 'date', 'length'];
  dataSource = new MatTableDataSource([]);
  currentTrackId: string;
  audioPlaying: boolean = false;
  audioIcon: string = 'play_circle_outline';
  selectedTracks: string[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChildren('audio') audioElements: QueryList<{ nativeElement: HTMLAudioElement }>;

  constructor(
    private store: Store<StoreState>,
    private httpService: HttpService
  ) {
    this.store
      .select((reducers) => reducers.library)
      .subscribe(library => this.dataSource = new MatTableDataSource(library.tracks));
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onTrackSelect(e: Event, row: Track) {
    e.stopPropagation();

    if (!this.currentTrackId || this.currentTrackId === row.id && !this.audioPlaying) {
      this.currentTrackId = row.id;
      this.audioPlaying = true;
      this.audioElements.find(el => el.nativeElement.id === row.id).nativeElement.play();
    } else if (this.currentTrackId === row.id && this.audioPlaying) {
      this.audioElements.find(el => el.nativeElement.id === row.id).nativeElement.pause();
      this.audioPlaying = false;
    } else if (this.audioPlaying && this.currentTrackId !== row.id) {
      const currentAudio = this.audioElements.find(el => el.nativeElement.id === this.currentTrackId).nativeElement;
      currentAudio.pause();
      currentAudio.currentTime = 0;
      this.audioElements.find(el => el.nativeElement.id === row.id).nativeElement.play();
      this.currentTrackId = row.id;
    } else {
      // track's paused && play another
      const currentAudio = this.audioElements.find(el => el.nativeElement.id === this.currentTrackId).nativeElement;
      currentAudio.currentTime = 0;
      this.currentTrackId = row.id;
      this.audioElements.find(el => el.nativeElement.id === row.id).nativeElement.play();
      this.audioPlaying = true;
    }
  }

  onTimeUpdate(e) {
    // console.log(e)
  }

  onRowSelect(row: Track) {
    this.isSelected(row.id)
      ? this.selectedTracks.splice(this.selectedTracks.indexOf(row.id), 1)
      : this.selectedTracks.push(row.id);
  }

  onDelete() {
    this.httpService.deleteTracks(this.selectedTracks).subscribe(() => {
      this.store.dispatch(new DeleteTracks(this.selectedTracks));
      this.selectedTracks = [];
    });
  }

  getIcon(id: string): string {
    return this.currentTrackId === id && this.audioPlaying
      ? 'pause_circle_outline'
      : 'play_circle_outline';
  }

  isActive(id: string): boolean {
    return this.currentTrackId === id && this.audioPlaying;
  }

  isSelected(id: string): boolean {
    return this.selectedTracks.includes(id);
  }
}
