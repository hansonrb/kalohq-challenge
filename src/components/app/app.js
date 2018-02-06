import React, {PropTypes} from 'react';

import Button from '../button';
import Card from '../card';
import Text from '../text';

import './app.css';

function App() {
  return (
    <div className="app">
      <Button>Primary</Button>
      <Button color="tertiary">Secondary button</Button>
      <Card suit="club" value="jack" />
      <Text>Hello world!</Text>
      <Text size="huge">Hello world!</Text>
    </div>
  );
}

export default App;
