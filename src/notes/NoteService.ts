export interface Note = {
  id: string,
  title: string,
  body: string,
  created: date
}

export interface NoteDatabase = {
  data: Note[]
}

let noteDatabase: NoteDatabase = {
  data: []
}

export const saveNote = (note: Note) => {
  return new Promise((complete, err) => {
    const newNote = Object.assign({}, note);
    newNote.id = Math.floor(Math.random() * 1000000000);
    noteDatabase = {...noteDatabase,
      data: noteDatabase.data.concat([newNote])
    }
    complete(newNote);
  })
}
