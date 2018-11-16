import { Note } from './notes/NoteService';
import * as NoteService from './notes/NoteService';

export interface Action {type: string, payload: any}
export type Dispatch = (action: Action | Thunk) => any
type Thunk = (dispatch: Dispatch, getState: () => any) => any;

function standardAction(type: string, buildPayload = (x: any) => x) {
  return (payload?: any) => ({type, payload: buildPayload(payload)})
}

export const NOTE_SAVED = 'NOTE_SAVED';
const noteSaved = standardAction(NOTE_SAVED);

export const SAVE_NOTE = 'SAVE_NOTE';
const savedAction = standardAction(SAVE_NOTE);
export const saveNote = (note: Note) => (dispatch: Dispatch) => {
  dispatch(savedAction(note));
  return NoteService.saveNote(note)
    .then((newNote: Note) => dispatch(noteSaved(newNote)))
}

export const NOTE_FORM_CHANGED = 'NOTE_FORM_CHANGED';
export const noteFormChanged = standardAction(NOTE_FORM_CHANGED);

export const APP_INIT = 'APP_INIT';
export const appInit = standardAction(APP_INIT);

export const NOTES_LOADED = 'NOTES_LOADED';
export const notesLoaded = standardAction(NOTES_LOADED)

export const SEARCH_CHANGED = 'SEARCH_CHANGED';
export const searchChanged = standardAction(SEARCH_CHANGED);
