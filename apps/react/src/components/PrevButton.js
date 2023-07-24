import React from 'react'

function PrevButton({ dispatch, answer}) {
    if(answer === null) return null
    const handleNextButton = () =>{
        dispatch({ type: "prevQuestion"})
    }
  return (
    <button className='btn btn-ui' onClick={handleNextButton}>PrevButton</button>
  )
}

export default PrevButton 