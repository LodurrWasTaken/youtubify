import { Action } from '@ngrx/store';

export enum ActionTypes {
    FETCH_LIBRARY = 'FETCH_LIBRARY',
    ADD_TRACKS = 'ADD_TRACKS',
    DELETE_TRACKS = 'DELETE_TRACKS',
}

export class BaseAction implements Action {
    readonly type: string;
    payload: any;
}

export class FetchLibrary implements BaseAction {
    readonly type = ActionTypes.FETCH_LIBRARY;

    constructor(public payload: any) { }
}

export class AddTracks implements BaseAction {
    readonly type = ActionTypes.ADD_TRACKS;

    constructor(public payload: any) { }
}

export class DeleteTracks implements BaseAction {
    readonly type = ActionTypes.DELETE_TRACKS;

    constructor(public payload: any) { }
}