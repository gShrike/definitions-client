import React from 'react'

function Loading({ name, className = `` }) {
  return (
    <button className={`button is-medium is-outlined is-loading  ${className}`}>Loading</button>
  )
}

export default Loading
