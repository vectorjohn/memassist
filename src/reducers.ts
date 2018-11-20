import {NoteDatabase, newDatabase} from './notes/NoteService';
import {
  Action,
  NOTE_SAVED,
  NOTE_FORM_CHANGED,
  APP_INIT,
  NOTES_LOADED,
  SEARCH_CHANGED,
  LINK_STARTED,
  SELECT_NOTE,
  DELETE_NOTE
} from './actions';

export const notes = (state: NoteDatabase = newDatabase(), action: Action<any>) => {
  switch (action.type) {
    case NOTE_SAVED:
      return {...state, data: state.data.concat([action.payload])}
    case NOTES_LOADED:
      return action.payload || newDatabase();
    case APP_INIT:
      return newDatabase();
    case DELETE_NOTE:
      // TODO: delete from backing store
      return {...state, data: state.data.filter(n => n.id !== action.payload)}
  }
  return state;
}

interface NoteFormProps {title: string, body: string}
const defaultNoteForm = {title: '', body: ''}

export const noteForm = (state: NoteFormProps = defaultNoteForm, action: Action<any>) => {
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
export const filters = (state = defaultFilters, action: Action<any>) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return {...state, search: action.payload};
  }
  return state;
}

interface NoteLinkage {
  linking: boolean,
  fromId: string | null,
  toIds: string[],
  name: string
}

const defaultLinkage: NoteLinkage = {
  linking: false,
  fromId: null,
  toIds: [],
  name: ''
};
export const noteLinkage = (state = defaultLinkage, action: Action<any>): NoteLinkage => {
  switch (action.type) {
    case LINK_STARTED:
      return {
        ...state,
        linking: true,
        fromId: action.payload
      }
    // case SELECT_NOTE:
    //   if (!state.linking) {
    //     return state;
    //   }
    //   const index = state.toIds.findIndex(id => id === action.payload);
    //   const newIds = index >= 0 ?
    //     state.toIds.slice(0, index).concat(state.toIds.slice(index + 1))
    //     : state.toIds.concat([action.payload]);
    //   return {
    //     ...state,
    //     toIds: newIds
    //   };
  }

  return state;
}

export const selectedNotes = (state: string[] = [], action: Action<any>): string[] => {
  switch (action.type) {
    case SELECT_NOTE:
      const index = state.findIndex(id => id === action.payload);
      return index >= 0 ?
        state.slice(0, index).concat(state.slice(index + 1))
        : state.concat([action.payload]);
  }

  return state;
}
