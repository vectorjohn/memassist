import * as React from 'react';
import {connect} from 'react-redux';
import * as fuzzy from 'fuzzy';
import './App.css';

import Header from './Header';
import NoteForm from './NoteForm';
import NoteList, { DisplayNote } from './NoteList';
import SearchForm from './SearchForm';
import { Note } from './notes/NoteService';
import { searchChanged, linkStarted, deleteNote, selectNote } from './actions';

// import logo from './logo.svg';
type StrHandler = (s: string) => void;
interface AppProps {
  notes: DisplayNote[],
  onSearch: StrHandler,
  onLink: StrHandler,
  onDelete: StrHandler,
  onSelectNote: StrHandler
}
function App({notes, onSearch, onLink, onDelete, onSelectNote}: AppProps) {
  // tslint:disable-next-line:no-console

  return (
    <div className="App">
      <Header>
        <a href="list">Notes</a>
        <a href="add">Add</a>
      </Header>
      <NoteForm />
      <SearchForm onSearch={onSearch} />
      <NoteList
        notes={notes}
        onLink={onLink}
        onDelete={onDelete}
        onSelect={onSelectNote}/>
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
const toDisplayNotes = (notes: Note[], selectedIds: string[]) => notes
  .map(n => ({
    ...n,
    selected: !!selectedIds.find(id => id === n.id)
  }))

const fuzzyOpts = {
  extract: (note: Note) => note.title + ' ' + note.body
}
const fuzzyMapToNotes = (r: fuzzy.FilterResult<Note>) => r.original;

interface State {
  notes: {data: Note[]},
  filters: {search: string},
  selectedNotes: string[]
}

const mapStateToProps = (state: State) => ({
  // notes: state.notes.data.filter(n => n.title.match(new RegExp(state.search.filter)))
  notes: toDisplayNotes(
    fuzzy.filter(state.filters.search, state.notes.data, fuzzyOpts).map(fuzzyMapToNotes),
    state.selectedNotes
  )
});

const mapDispatchToProps = (dispatch: any) => ({
  onSearch: (s: string) => {
    return dispatch(searchChanged(s));
  },
  onLink: (id: string) => {
    return dispatch(linkStarted(id));
  },
  onDelete: (id: string) => {
    return dispatch(deleteNote(id));
  },
  onSelectNote: (id: string) => {
    return dispatch(selectNote(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
