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
  }

  handleChange(e) {
    let q = e.target.value;
    this.setState({
      query: q
    });
  }

  render() {
    let { query, matched } = this.state;
    console.log('matched data:', matched);
    return (
      <div>
        <h1 className='f1 tc serif'>Discover Literature</h1>
        <Search change={this.handleChange} click={this.handleClick} />
        {matched.map(book => {
          return (
            <div className='bg-moon-gray dib br3 pa3 ma2 grow'>
              <a href={book.volumeInfo.infoLink}><img alt='book' href="http://books.google.com/books?id=XfFvDwAAQBAJ&dq=habits&hl=&source=gbs_api" src={book.volumeInfo.imageLinks.thumbnail}/></a>
          </div>
          )
        })}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);