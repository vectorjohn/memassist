import * as React from 'react';
export default ({children, ...props}: {children: JSX.Element[]}) => (
  <nav {...props}>
    <ol>
      {React.Children.map(children, child)}
    </ol>
  </nav>
);

const child = (e: JSX.Element) => (
  <li>{e}</li>
);
