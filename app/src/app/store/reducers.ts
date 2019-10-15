import { BaseAction, ActionTypes } from './actions';
import { State } from '../interfaces/state';
import { Track } from '../models/track';

export const initialState: State = {
  tracks: [],
  libraryPath: ''
};

export const libraryReducer = (state: State = initialState, action: BaseAction) => {
  switch (action.type) {
    case ActionTypes.FETCH_LIBRARY:
      return { ...state, tracks: action.payload };

    case ActionTypes.ADD_TRACKS:
      return { ...state, tracks: [...state.tracks, ...action.payload] };

    case ActionTypes.DELETE_TRACKS:
      return { ...state, tracks: state.tracks.filter((track: Track) => !action.payload.includes(track.id)) };

    default:
      return state;
  }
}