import {EventHandler, FormEvent, ChangeEvent} from 'react';
import * as React from 'react';

export default ({onSubmit, onChange, title, body}: {onSubmit: EventHandler<FormEvent<HTMLFormElement>>, onChange: EventHandler<ChangeEvent>, title: string, body: string}) =>
  <form onSubmit={onSubmit}>
    <input type="text" name="title" value={title} onChange={onChange}/>
    <textarea name="body" value={body} onChange={onChange} />
    <input type="submit" value="Submit" />
  </form>
