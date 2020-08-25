import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search';
import Scroll from './components/scroll';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matched: [], //stores data from the searched query
      query: '', //stores text of the query
      display: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchApi = this.searchApi.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.searchApi();
    this.clearQuery();
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

  handleModal() {
    /* write functionality to update modal display */
    //update state to be the opposite value each time clicked
    let { display } = this.state;
    this.setState({
      display: !display
    });
  }

  clearQuery() {
    this.setState({
      query: ''
    })
  }

  render() {
    let { query, matched, display } = this.state;
    console.log('matched data:', matched);
    console.log('display:', display);
    return (
      <div className='serif'>
        <h1 className='f1 tc serif'>Discover Literature</h1>
        <Search change={this.handleChange} click={this.handleClick} />
        <Scroll>
        {matched.map(book => {
          return (
            <div className='bg-moon-gray dib br3 pa3 ma2 grow'>
              <img alt='book' key={book.id} src={book.volumeInfo.imageLinks.thumbnail} onClick={this.handleModal}/>
          </div>
          )
        })}
        </Scroll>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);