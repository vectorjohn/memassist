export interface Note {
  id?: string,
  title: string,
  body: string,
  created?: Date
}

export interface NoteDatabase {
  data: Note[]
}

const SESSION_DB_KEY = 'noteDatabase';

export function newDatabase(): NoteDatabase {
  return {data: []};
}

// TODO: This is can later save to a server. Everything should return promises.
let noteDatabase = newDatabase();
const storage = localStorage;

function commit() {
  storage.setItem(SESSION_DB_KEY, JSON.stringify(noteDatabase));
}

function rollback() {
  noteDatabase = JSON.parse(storage
    .getItem(SESSION_DB_KEY) || 'null') || newDatabase();
}

export const saveNote = (note: Note) => {
  return new Promise((complete, err) => {
    const newNote = Object.assign({}, note);
    newNote.id = '' + Math.floor(Math.random() * 1000000000);
    noteDatabase = {...noteDatabase,
      data: noteDatabase.data.concat([newNote])
    }
    if (false && 'some error occurred') {
      rollback();
    }
    commit();
    complete(newNote);
  })
}

export const fetchAllNotes = () => {
  return new Promise((complete, err) => {
    rollback();
    complete(noteDatabase);
  })
}
