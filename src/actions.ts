import { Note } from './notes/NoteService';
import * as NoteService from './notes/NoteService';

interface Action {type: string, payload: any}
type Dispatch = (action: Action) => any

function standardAction(type: string, buildPayload = (x: any) => x) {
  return (payload: any) => ({type, payload: buildPayload(payload)})
}

export const NOTE_SAVED = 'NOTE_SAVED';
const noteSaved = standardAction(NOTE_SAVED);

export const SAVE_NOTE = 'SAVE_NOTE';
export const saveNote = (note: Note) => (dispatch: Dispatch) =>
  NoteService.saveNote(note)
    .then((newNote: Note) => dispatch(noteSaved(newNote)))
