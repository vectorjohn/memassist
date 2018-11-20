
export interface NoteLink {
  noteId: string,
  name: string
}

export interface UnsavedNote {
  title: string,
  body: string,
  tags: string[],
  links: NoteLink[]
}

export interface Note extends UnsavedNote {
  id: string,
  created: string
}

export interface NoteDatabase {
  data: Note[]
}

const SESSION_DB_KEY = 'noteDatabase';

type FormVal = string | File | null;

export function newNote(title: FormVal, body: FormVal): UnsavedNote {
  return {
    title: '' + title,
    body: '' + body,
    tags: [],
    links: []
  };
}

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

export const findNote = (id: string): Promise<Note> => {
  return new Promise((res, rej) => {
    const foundNote = noteDatabase.data.find(note => note.id === id);
    if (foundNote) {
      res(foundNote);
    }
    else {
      rej('Note not found');
    }
  });
}

export const saveNote = (note: UnsavedNote): Promise<Note> => {
  return new Promise((complete, err) => {
    const savedNote = Object.assign({}, note, {
      id: '' + Math.floor(Math.random() * 1000000000),
      created: (new Date()).toString()
    });

    noteDatabase = {...noteDatabase,
      data: noteDatabase.data.concat([savedNote])
    }
    if (false && 'some error occurred') {
      rollback();
      err('an error happened');
    }
    commit();
    complete(savedNote);
  });
}

export const linkNote = (fromId: string, toIds: string[], linkName: string) => {
  const links: NoteLink[] = toIds.map(id => ({
    noteId: id,
    name: linkName
  }));

  return findNote(fromId)
    .then(note => ({
      ...note,
      links: note.links.concat(links)
    }))
    .then(saveNote);
}

export const fetchAllNotes = () => {
  return new Promise((complete, err) => {
    rollback();
    complete(noteDatabase);
  })
}
