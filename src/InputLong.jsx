import React from 'react'

const InputLong = ({promptObj}) => {
  return (
    <textarea
      className='flex-2'
      placeholder={promptObj.example}
    />
  )
}

export default InputLong
