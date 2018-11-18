import * as React from 'react';
import { Note } from './notes/NoteService';
import './NoteList.css';

export default ({notes}: {notes: Note[]}) =>
  <dl className="NoteList">
    {notes.map(note => (<React.Fragment key={note.id}><dt>{note.title}</dt><dd>{note.body}</dd></React.Fragment>))}
  </dl>
