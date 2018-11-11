import {EventHandler, FormEvent} from 'react';
import * as React from 'react';

export default ({onSubmit}: {onSubmit: EventHandler<FormEvent<HTMLFormElement>>}) =>
  <form onSubmit={onSubmit}>
    <input type="text" name="title" />
    <textarea name="body" />
    <input type="submit" value="Submit" />
  </form>
