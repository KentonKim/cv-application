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
              <textarea className='resize-none' {...attributes(data, inputObj, onHandle, i)}></textarea> :
              <input {...attributes(data, inputObj, onHandle, i)}></input>
            }
            { (inputObj != arrayOfPrompts[arrayOfPrompts.length - 1] || i != multiple - 1) && <br/> }
          </>
        )
      }
      formArray.push(
        <>
          <br/>
          {multiple < 5 && <button onClick={ () => setMultiple( multiple + 1 ) }><strong>+</strong></button>}
          {multiple > 1 && <button onClick={ () => setMultiple( multiple - 1 ) }><strong>-</strong></button>}
        </>
      )
    } else {
      formArray.push(
        <>
          <label key={`${inputObj.id}-label`} htmlFor={inputObj.id}>{inputObj.label}</label>
          { inputObj.isLongResponse ?
            <textarea className='resize-none' {...attributes(data, inputObj, onHandle)}></textarea> :
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

const convertDate = (inputDate) => {
  // Parse the date
  const parts = inputDate.split('-');
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Format the date
  const formattedDate = new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return formattedDate;
}

const Paper = ({personal, academic, work, projects, skills}) => {
  const arrayToJsx = (sectionArray) => {
    const mountArray = []
    let arrayOfDescriptions
    let header
    let location
    let time

    for (let sectionObj of sectionArray) {
      arrayOfDescriptions = []
      header = ''
      location = ''
      time = ''

      header += sectionObj.school ?? ""
      header += sectionObj.position ?? ""
      header += sectionObj.company ? ` at ${sectionObj.company}` : ""
      header += sectionObj.project ?? "" 
      location += sectionObj ?? ""
      time += sectionObj['start-date'] ? convertDate(sectionObj['start-date']) : ""
      time += sectionObj['end-date'] ? 
        sectionObj['start-date'] ? ` - ${convertDate(sectionObj['end-date'])}` : convertDate(sectionObj['end-date']) :
        sectionObj['start-date'] ? " - Present" : ""
      
      if (sectionObj.degree || sectionObj.study || sectionObj.gpa) {
        let academicDesc = "" 
        academicDesc += sectionObj.degree ?? ""
        academicDesc += `in ${sectionObj.study}` ?? ""
        academicDesc += `, ${sectionObj.gpa}` ?? ""
        arrayOfDescriptions.push(academicDesc)
      }
      if (sectionObj.minor) {
        arrayOfDescriptions.push(`Minor in ${sectionObj.minor}`)
      }
      Object.entries(sectionObj)
        .filter(([key]) => key.includes('description'))
        .map(( [ _, value]) => arrayOfDescriptions.push(value))


      mountArray.push(<div className='section-title'><strong>{header}</strong>{location}</div>)
      mountArray.push(<div className='section-date'>{time}</div>)
      for (let desc of arrayOfDescriptions) {
        mountArray.push(<div className='section-title'>{desc}</div>)
      }
    }
    return mountArray
  }

  return(
    <div className="w-[8.5in] h-[11in] border-2 shadow-lg font-serif pt-[0.5in] pl-[1in] pr-[1in] text-[12pt]">
      {/* Personal Section */}
      <div className='section personal'>
        <div>{personal[0].name && personal[0].name}</div>
        <div>{personal[0].email && personal[0].email}</div>
        <div>{personal[0].phone && personal[0].phone}</div>
      </div>
      {/* Academic Section */}
      <div><strong>Education</strong></div>
      <div className='section academic'>
        {/* {arrayToJsx(academic)} */}
      </div>
      {/* Work Section */}
      <div><strong>Work Experience</strong></div>
      <div className='section work'>
        {/* {arrayToJsx(work)} */}
      </div>
      {/* Projects Section */}
      <div><strong>Projects</strong></div>
      <div className='section projects'>
        {/* {arrayToJsx(projects)} */}
      </div>
      {/* Skills Section */}
      <div><strong>Skills</strong></div>
      <div className='section skills'>
        {arrayToJsx(skills)}
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