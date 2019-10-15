import { Track } from '../models/track';

export interface State {
    tracks: Track[];
    libraryPath: string;
}

export interface StoreState {
    library: State
}