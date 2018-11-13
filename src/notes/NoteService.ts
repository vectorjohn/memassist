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

function newDatabase(): NoteDatabase {
  return {data: []};
}

let noteDatabase = newDatabase();

function commit() {
  sessionStorage.setItem(SESSION_DB_KEY, JSON.stringify(noteDatabase));
}

function rollback() {
  noteDatabase = JSON.parse(sessionStorage
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
