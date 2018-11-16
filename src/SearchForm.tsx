import * as React from 'react';
import {ChangeEvent} from 'react';

export default ({onSearch}: {onSearch: (s: string) => any}) =>
  <form>
    <input type="text" name="search" onChange={changeHandler('search', onSearch)} />
  </form>

const changeHandler = (field: string, handler: (s: string) => any) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget.form || undefined);
    handler('' + formData.get(field));
  }
