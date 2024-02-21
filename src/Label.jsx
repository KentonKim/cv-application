import React from 'react'

const Label = ({promptObj}) => {
  return (
    <label
      className='flex-1'
    >
      {promptObj.label}
    </label>
  )
}

export default Label
