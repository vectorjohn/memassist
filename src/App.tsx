import * as React from 'react';
import {connect} from 'react-redux';
import './App.css';

import Header from './Header';
import NoteForm from './NoteForm';
import { Note } from './notes/NoteService';

// import logo from './logo.svg';

function App({notes = []}: {notes: Note[]}) {
  // tslint:disable-next-line:no-console

  return (
    <div className="App">
      <Header>
        <a href="list">Notes</a>
        <a href="add">Add</a>
      </Header>
      <NoteForm />
      <br />
      <dl>
        {notes.map(note => (<React.Fragment key={note.id}><dt>{note.title}</dt><dd>{note.body}</dd></React.Fragment>))}
      </dl>
    </div>
  );
}

/*
function submitted(event: React.FormEvent<HTMLFormElement>) {
  const formData = new FormData(event.currentTarget);
  // tslint:disable-next-line:no-console
  console.log('I submitted!', formData.get('body'))
  event.preventDefault();
}
*/

export default connect((state: {notes: {data: Note[]}}) => ({notes: state.notes.data}), null)(App);
