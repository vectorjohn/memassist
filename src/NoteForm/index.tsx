import {connect} from 'react-redux';
import {FormEvent, ChangeEvent} from 'react';
import {saveNote, noteFormChanged} from '../actions';
import NoteForm from './NoteForm';
import {newNote} from '../notes/NoteService';

function mapStateToProps(state: any) {
  return {
    title: state.noteForm.title,
    body: state.noteForm.body
  };
}

// TODO: can I type dispatch? Seems like it should be type Dispatch.
function mapDispatchToProps(dispatch: any) {
  return {
    onSubmit: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const note = newNote(formData.get('title'), formData.get('body'));
      return dispatch(saveNote(note));
    },
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      return dispatch(noteFormChanged(new FormData(event.currentTarget.form || undefined)));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
