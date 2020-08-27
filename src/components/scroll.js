import React from 'react';

const Scroll = (props) => {
  return(
    <div style={
      {
        overflowY: 'scroll',
        border: '1px solid white',
        height: '560px',
        paddingTop: '50px'
      }
      }>
      {props.children}
    </div>
  )
}

export default Scroll;