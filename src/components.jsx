import React, { useState, useEffect } from 'react';

const Section = ({data, onHandle, arrayOfPrompts}) => {
  const [multiple, setMultiple] = useState(2)
  const attributes = (data, inputObj, onHandle, version = 0 ) => {
    const conditionalType = (inputObj.type && inputObj.type)
    const conditionalPlaceholder = (inputObj.example && inputObj.example)
    const conditionalRequired = (inputObj.isRequired && inputObj.isRequired)
    const conditionalIdAndKey = ( version == 0 ? inputObj.id : `${inputObj.id}-${version}` )
    return {
      type: conditionalType,
      id: conditionalIdAndKey,
      key: conditionalIdAndKey,
      placeholder: conditionalPlaceholder,
      onChange: onHandle,
      required: conditionalRequired,
      value: data[conditionalIdAndKey],
    }
  }

  const formArray = []
  arrayOfPrompts.map(inputObj => {
    if (inputObj.isMultiple) {
      for (let i = 0; i < multiple; i += 1) {
        formArray.push(
          <>
            <label key={`${inputObj.id}${i == 0 ? '-' : `-${i}-`}label`} htmlFor={`${inputObj.id}${i == 0 ? '' : `-${i}` }`}>{inputObj.label}</label>
            { inputObj.isLongResponse ?
              <textarea {...attributes(data, inputObj, onHandle, i)}></textarea> :
              <input {...attributes(data, inputObj, onHandle, i)}></input>
            }
            { (inputObj != arrayOfPrompts[arrayOfPrompts.length - 1] || i != multiple - 1) && <br/> }
          </>
        )
      }
      formArray.push(
        <>
          <br/>
          {multiple < 5 && <button onClick={()=> setMultiple(multiple + 1)}><strong>+</strong></button>}
          {multiple > 1 && <button onClick={() => setMultiple(multiple-1)}><strong>-</strong></button>}
        </>
      )
    } else {
      formArray.push(
        <>
          <label key={`${inputObj.id}-label`} htmlFor={inputObj.id}>{inputObj.label}</label>
          { inputObj.isLongResponse ?
            <textarea {...attributes(data, inputObj, onHandle)}></textarea> :
            <input {...attributes(data, inputObj, onHandle)}></input>
          }
          { inputObj != arrayOfPrompts[arrayOfPrompts.length - 1] && <br/> }
        </>
      )
    }
  })

  return(
    <form>{formArray}</form>
  )
}

const Paper = ({personal, academic, work, projects, skills}) => {
  return(
    <div className="w-[510px] h-[660px] bg-white text-black font-serif">
      <div className="border-solid border-black border-2">
        {Object.entries(data).map(([key,value]) => (
          <div key={key}>{value}</div>
        ))}
      </div>
    </div>
  )
}

const DraggableButton = ({handleClick, text}) => {
  const buttonRef = React.createRef();
  const handleMouseUp = (event) => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    if (event.clientX < buttonRect.left ) {
      // switch tabs left 
    } else if (event.clientX > buttonRect.right) {
      // switch tabs right
    }

    document.removeEventListener('mouseup', handleMouseUp)
  }
  return (
    <button 
      ref={buttonRef}
      onClick={handleClick}
      onMouseDown={() => {
        document.addEventListener('mouseup', handleMouseUp)
      }}
    >{text}</button>
  );
};

export {Section, Paper, DraggableButton}


/*
mouse down
- adds event listener for mouseup
mouse up
- clears event listener
- if the mouse is to the left or right of button, change order
*/