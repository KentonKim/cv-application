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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseDownInsideButton, setIsMouseDownInsideButton] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = React.createRef();
  
  useEffect(() => {
    const handleMouseDown = (event) => {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const isMouseDownInsideButton =
          event.clientX >= buttonRect.left &&
          event.clientX <= buttonRect.right &&
          event.clientY >= buttonRect.top &&
          event.clientY <= buttonRect.bottom;
  
      setIsMouseDown(true);
      setIsMouseDownInsideButton(isMouseDownInsideButton);
  
      // If the mouse down is inside the button, update the position
      if (isMouseDownInsideButton) {
        setPosition({ x: event.clientX - buttonRect.left, y: event.clientY - buttonRect.top });
      }
    };
  
    const handleMouseUp = () => {
      setIsMouseDown(false);
      setIsMouseDownInsideButton(false);
    };
  
    const handleMouseMove = (event) => {
      if (isMouseDown) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const isMouseOutsideButton =
            event.clientX < buttonRect.left ||
            event.clientX > buttonRect.right ||
            event.clientY < buttonRect.top ||
            event.clientY > buttonRect.bottom;
  
        if (isMouseOutsideButton && isMouseDownInsideButton) {
          // Update the position based on mouse movement
          setPosition({ x: event.clientX - buttonRect.left, y: event.clientY - buttonRect.top });
        }
      }
    };
  
    const handleMouseUpOutsideButton = () => {
      setIsMouseDown(false);
      setIsMouseDownInsideButton(false);
    };
  
  
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUpOutsideButton);
  
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpOutsideButton);
    };
  }, [isMouseDown, isMouseDownInsideButton]);
  
  return (
    <button style={{ position: 'absolute', left: position.x, top: position.y }}
      ref={buttonRef}
      onClick={handleClick}
    >{text}</button>
  );
};

export {Section, Paper, DraggableButton}