import * as React from 'react';
import { Note } from './notes/NoteService';

export default ({notes}: {notes: Note[]}) =>
  <dl>
    {notes.map(note => (<React.Fragment key={note.id}><dt>{note.title}</dt><dd>{note.body}</dd></React.Fragment>))}
  </dl>
