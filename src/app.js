import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div>
        <h1 className='f1 tc serif'>Discover Literature</h1>
        <Search/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);