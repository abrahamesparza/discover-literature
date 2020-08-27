import React from 'react';

const Search = (props) => {
  return (
    <div className='tc'>
      <form className='tc'>
        <input type='text' className='fl w-80 pa2 tc ba b--near-white' placeholder='Search a keyword to discover new books' onChange={props.change}/>
        <button type='button' className="fl w-20 pa2 bg-light-gray tc" onClick={props.click}>Submit</button>
      </form>
    </div>
  )
}

export default Search;