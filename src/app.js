import React from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search';
import Scroll from './components/scroll';

import './app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matched: [], //stores data from the searched query
      query: '', //stores text of the query
      display: false, //triggers false / true on book click
      selected: '' //stores value of book clicked
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

  handleModal(e) {
    /* write functionality to update modal display */
    //update state to be the opposite value each time clicked
    let { display } = this.state;
    let selected = e.target.alt;
    console.log(selected);
    this.setState({
      display: !display,
      selected: selected
    });
    console.log('selected',selected);
  }

  clearQuery() {
    this.setState({
      query: ''
    })
  }

  render() {
    let { matched, display, selected } = this.state;
    return (
      <div className='serif bg-dark-gray'>
        <h1 className='f1 tc moon-gray calisto'>DISCOVER LITERATURE</h1>
        <Search change={this.handleChange} click={this.handleClick} />
        <Scroll>
        {matched.map(book => {
          if (display === false) {
            return (
              <div className='dib br3 pa3 ma2 grow'>
                <img alt={book.volumeInfo.title} key={book.id} src={book.volumeInfo.imageLinks.thumbnail} onClick={this.handleModal}/>
             </div>
            )
          }
          else if (display === true && selected === book.volumeInfo.title) {
            return (
              <div className='tc fl w-100'>
                <img alt='book' className='mt4' value={book.volumeInfo.title} key={book.id} src={book.volumeInfo.imageLinks.thumbnail} onClick={this.handleModal}/><br/>
                <p className='tc f4 near-white ma4'>{book.volumeInfo.description}</p><br/>
                <a href={book.volumeInfo.infoLink} className='f4 near-white link underline-hover near-white grow'>Learn More</a>
             </div>
            )
          }
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