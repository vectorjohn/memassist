import * as React from 'react';
import './App.css';

import Header from './Header';
import NoteForm from './NoteForm';

// import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header>
          <a href="list">Notes</a>
          <a href="add">Add</a>
        </Header>
        <NoteForm onSubmit={submitted}/>
      </div>
    );
  }
}

function submitted(event: React.FormEvent<HTMLFormElement>) {
  const formData = new FormData(event.currentTarget);
  // tslint:disable-next-line:no-console
  console.log('I submitted!', formData.get('body'))
  event.preventDefault();
}

export default App;
