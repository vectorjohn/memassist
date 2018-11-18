import {NoteDatabase, newDatabase} from './notes/NoteService';
import {
  Action,
  NOTE_SAVED,
  NOTE_FORM_CHANGED,
  APP_INIT,
  NOTES_LOADED,
  SEARCH_CHANGED
} from './actions';

export const notes = (state: NoteDatabase = newDatabase(), action: Action) => {
  switch (action.type) {
    case NOTE_SAVED:
      return {...state, data: state.data.concat([action.payload])}
    case NOTES_LOADED:
      return action.payload || newDatabase();
    case APP_INIT:
      return newDatabase();
  }
  return state;
}

interface NoteFormProps {title: string, body: string}
const defaultNoteForm = {title: '', body: ''}

export const noteForm = (state: NoteFormProps = defaultNoteForm, action: Action) => {
  switch (action.type) {
    case NOTE_SAVED:
      return defaultNoteForm;
    case NOTE_FORM_CHANGED:
      const formData: FormData = action.payload;
      return {
        title: formData.get('title'),
        body: formData.get('body')
      };
  }
  return state;
}

interface Filters {
  search: string,
  maxAge: Date | null
}

const defaultFilters: Filters = {search: '', maxAge: null};
export const filters = (state = defaultFilters, action: Action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return {...state, search: action.payload};
  }
  return state;
}
