import React from 'react';

const Search = (props) => {
  return (
    <div className='tc'>
      <form className='tc'>
        <input type='text' className='fl w-60 pa2 tc ba b--near-white' placeholder='Search a Book or an Author' onChange={props.change}/>
        <button type='button' className="fl w-20 pa2 bg-light-gray tc" onClick={props.click}>Submit</button>
        <select className="tc fl w-20 pa2 bg-light-gray">
        </select>
      </form>
    </div>
  )
}

export default Search;