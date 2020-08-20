import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matched: [], //stores data from the searched query
      query: '' //stores text of the query
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchApi = this.searchApi.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.searchApi();
  }

  searchApi() {
    // handle request to book api
    let { query } = this.state;
    let data = { q: query }
    fetch(`http://localhost:3000/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Success:', data);
      this.setState({
        matched: data
      })
    })
    .catch((err) => {
      console.error(err);
    })
    // this.getData(data)
  }

  // getData(data) {
  //   this.setState({
  //     matched: data
  //   })
  // }

  handleChange(e) {
    let q = e.target.value;
    // console.log('q in handleChange', q);
    this.setState({
      query: q
    });
  }

  render() {
    let { query, matched } = this.state;
    console.log('query', query);
    console.log('matched data:', matched);
    return (
      <div>
        <h1 className='f1 tc serif'>Discover Literature</h1>
        <Search change={this.handleChange} click={this.handleClick} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);