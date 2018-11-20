import { Note, UnsavedNote } from './notes/NoteService';
import * as NoteService from './notes/NoteService';

export interface Action<T> {type: string, payload: T | undefined}
export type Dispatch = (action: Action<any> | Thunk) => any
type Thunk = (dispatch: Dispatch, getState: () => any) => any;

function standardAction<T>(type: string, buildPayload = (x: T | undefined) => x): (p?: T) => Action<T> {
  return (payload?: T) => ({type, payload: buildPayload(payload)})
}

export const NOTE_SAVED = 'NOTE_SAVED';
const noteSaved = standardAction(NOTE_SAVED);

export const SAVE_NOTE = 'SAVE_NOTE';
const savedAction = standardAction(SAVE_NOTE);
export const saveNote = (note: UnsavedNote) => (dispatch: Dispatch) => {
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
export const searchChanged = standardAction<string>(SEARCH_CHANGED);

export const SELECT_NOTE = 'SELECT_NOTE';
export const selectNote = standardAction<string>(SELECT_NOTE);

export const LINK_STARTED = 'LINK_STARTED';
export const linkStarted = standardAction<string>(LINK_STARTED);

export const DELETE_NOTE = 'DELETE_NOTE';
export const deleteNote = standardAction<string>(DELETE_NOTE);
