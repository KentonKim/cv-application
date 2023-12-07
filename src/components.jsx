import React, { useState, useEffect } from 'react';

const Section = ({data, onHandle, arrayOfInputs}) => {
  return(
    <form>{arrayOfInputs.map(inputObj => {
      return (
        <>
          <label key={`${inputObj.id}-label`} htmlFor={inputObj.id}>{inputObj.label}</label>
          { inputObj['isLongResponse'] ?
            <textarea
              type={(inputObj.type && inputObj.type)}
              id={inputObj.id}
              key={inputObj.id}
              placeholder={(inputObj.example && inputObj.example)}
              onChange={onHandle}
              required={inputObj.isRequired && inputObj.isRequired}
              value={data[inputObj.id]}
            ></textarea> :
            <input 
              type={(inputObj.type && inputObj.type)}
              id={inputObj.id}
              key={inputObj.id}
              placeholder={(inputObj.example && inputObj.example)}
              onChange={onHandle}
              required={inputObj.isRequired && inputObj.isRequired}
              value={data[inputObj.id]}
            ></input>}
          {inputObj != arrayOfInputs[arrayOfInputs.length - 1] && <br/>}
        </>
      )
    })}</form>
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