import React from 'react'

const InputShort = ({promptObj}) => {
  return (
    <input 
      className='flex-2'
      placeholder={promptObj.example}
      type={
        promptObj.type && promptObj.type
      }
    />
  )
}

export default InputShort
