import * as React from 'react';
import cls from 'classnames';

import { Note } from './notes/NoteService';
import './NoteList.css';

export interface DisplayNote extends Note {
  selected: boolean
}
function actionHandler(val: string, sh: StrHandler) {
  return (eh: React.MouseEvent) => {
    eh.preventDefault();
    eh.stopPropagation();
    sh(val);
  }
}
type StrHandler = (s: string) => void;
interface NoteListProps {
  notes: DisplayNote[],
  onLink: StrHandler,
  onDelete: StrHandler,
  onSelect: StrHandler
}
export default ({notes, onLink, onDelete, onSelect}: NoteListProps) =>
  <ul className="NoteList">
    {notes.map(note =>
      <li key={note.id}
        className={cls({'selected': note.selected})}
        onClick={actionHandler(note.id, onSelect)}>
        <h2>
          {note.title}
          <ul className="toolbar">
            <li><a href="link" onClick={actionHandler(note.id, onLink)}>Link</a></li>
            <li><a href="delete" onClick={actionHandler(note.id, onDelete)}>Delete</a></li>
          </ul>
        </h2>
        <div>
          {note.body}
        </div>
      </li>
    )}
  </ul>
