import React from 'react'

function Slider({index}) {
  return (
    <div>
        <p>{index + 1/index.length}</p>
    </div>
  )
}

export default Slider