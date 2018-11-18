import * as React from 'react';
import {connect} from 'react-redux';
import * as fuzzy from 'fuzzy';
import './App.css';

import Header from './Header';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import SearchForm from './SearchForm';
import { Note } from './notes/NoteService';
import { searchChanged } from './actions';

// import logo from './logo.svg';

function App({notes, onSearch}: {notes: Note[], onSearch: (s: string) => any}) {
  // tslint:disable-next-line:no-console

  return (
    <div className="App">
      <Header>
        <a href="list">Notes</a>
        <a href="add">Add</a>
      </Header>
      <NoteForm />
      <SearchForm onSearch={onSearch} />
      <NoteList notes={notes} />
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
const fuzzyOpts = {
  extract: (note: Note) => note.title + ' ' + note.body
}
const fuzzyMapToNotes = (r: fuzzy.FilterResult<Note>) => r.original;

const mapStateToProps = (state: {notes: {data: Note[]}, filters: {search: string}}) => ({
  // notes: state.notes.data.filter(n => n.title.match(new RegExp(state.search.filter)))
  notes: fuzzy.filter(state.filters.search, state.notes.data, fuzzyOpts).map(fuzzyMapToNotes)
});

const mapDispatchToProps = (dispatch: any) => ({
  onSearch: (s: string) => {
    return dispatch(searchChanged(s));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
