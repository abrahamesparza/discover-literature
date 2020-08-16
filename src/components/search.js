import React from 'react';

const Search = (props) => {
  return (
    <div className='tc'>
      <input type='text' className='fl w-60 pa2 tc ba b--near-white' placeholder='Search a Book or an Author'/>
      <button type='button' className="fl w-20 pa2 bg-light-silver tc">Submit</button>
      <select className="fl w-20 pa2">
        <option className='tc'>apply</option>
        <option className='tc'>drop</option>
        <option className='tc'>down</option>
        <option className='tc'>list</option>
      </select>
    </div>
  )
}

export default Search;