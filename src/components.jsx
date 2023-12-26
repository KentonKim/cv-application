import React, { useState, useEffect } from 'react';
import dropdown from './assets/dropdown.svg'

const convertDate = (inputDate) => {
  // Parse the date
  const parts = inputDate.split('-');
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);

  // Format the date
  const formattedDate = new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  return formattedDate;
}

const Section = ({data, onHandle, onDescDel, arrayOfPrompts, isMultiSection}) => {
  const [multiple, setMultiple] = useState(2)
  const [isShowing, setShow] = useState(true)
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
            <label 
              key={`${inputObj.id}${i == 0 ? '-' : `-${i}-`}label`}
              htmlFor={`${inputObj.id}${i == 0 ? '' : `-${i}` }`}
              className='inline-block w-32 align-top m-1'
            >{inputObj.label}</label>
            <textarea className='h-[100px] resize-none w-60 mt-1' {...attributes(data, inputObj, onHandle, i)}></textarea>
            { (inputObj != arrayOfPrompts[arrayOfPrompts.length - 1] || i != multiple - 1) && <br/> }
          </>
        )
      }
      formArray.push(
        <>
          <br/>
          {multiple < 5 && <button onClick={ () => setMultiple( multiple + 1 ) }><strong>Add Description</strong></button>}
          {multiple > 1 && multiple < 5 && <>{' / '}</>}
          {multiple > 1 && 
            <button onClick={ () => {
              setMultiple( multiple - 1)
              if (data[`description-${multiple-1}`]) { // check that the desc to be deleted is not empty
                onDescDel()
              }
            }}><strong>Remove Description</strong></button>
          }
        </>
      )
    } else {
      formArray.push(
        <>
          <label 
            key={`${inputObj.id}-label`}
            htmlFor={inputObj.id}
            className='inline-block w-32 m-1'
          >{inputObj.label}</label>
          <input className='w-60' {...attributes(data, inputObj, onHandle)}></input>
          { inputObj != arrayOfPrompts[arrayOfPrompts.length - 1] && <br/> }
        </>
      )
    }
  })

  return(
    <div className='section-container'>
      {isMultiSection && 
      <div className='section-title-container flex justify-between px-4'>
        <div className='section-title align-middle text-2xl truncate w-96 text-left'>
          {data.school || data.company || data.project}
        </div>
        {/* <button onClick={() => setShow(!isShowing)}>{dropdown}</button> */}
        <button className=' p-0' onClick={() => setShow(!isShowing)}>
          <img src={dropdown} className='w-10 h-10'/>
        </button>
      </div>
      }
      {isShowing && <form className='pl-0'>{formArray}</form>}
    </div>
  )
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
      header += sectionObj.position ? `${sectionObj.position} at ` :  ""
      header += sectionObj.company ?? ""
      header += sectionObj.project ?? "" 
      location += sectionObj.location ? ` - ${sectionObj.location}` : ""
      time += sectionObj['start-date'] ? convertDate(sectionObj['start-date']) : ""
      time += sectionObj['end-date'] ? 
        sectionObj['start-date'] ? ` - ${convertDate(sectionObj['end-date'])}` : convertDate(sectionObj['end-date']) :
        sectionObj['start-date'] ? " - Present" : ""
      
      if (sectionObj.degree || sectionObj.study || sectionObj.gpa) {
        let academicDesc = "" 
        academicDesc += sectionObj.degree ?? ""
        academicDesc += sectionObj.study ? ` in ${sectionObj.study}` : ""
        academicDesc += sectionObj.gpa ? `, GPA:${sectionObj.gpa}` : ""
        arrayOfDescriptions.push(academicDesc)
      }
      if (sectionObj.minor) {
        arrayOfDescriptions.push(`Minor in ${sectionObj.minor}`)
      }

      Object.entries(sectionObj)
        .filter(([key]) => key.includes('description'))
        .map(( [ _, value]) => arrayOfDescriptions.push(value))

      if (header != "") {
        mountArray.push(<div className='section-header'><strong>{header}</strong>{location}</div>)
      }
      if (time != "") {
        mountArray.push(<div className='section-date'>{time}</div>)
      }

      mountArray.push(
        <ul className='section-description-list basis-full mb-3'>
          {arrayOfDescriptions.map( desc => (
            <li key={desc} className='section-description text-left'>{`• ${desc}`}</li>
          ))}
        </ul>
      )
    }
    return mountArray
  }

  return(
    <div className="w-[8.5in] h-[11in] border-2 shadow-lg font-serif pt-[0.5in] pl-[1in] pr-[1in] text-[12pt]">
      {/* Personal Section */}
      <div className='section personal'>
        <div className='text-2xl'>{personal[0].name && personal[0].name}</div>
        <div className='inline'>{personal[0].email && personal[0].email}</div>
        <div className='inline'>{(personal[0].email && personal[0].phone) && "  "}</div>
        <div className='inline'>{personal[0].phone && personal[0].phone}</div>
      </div>
      {/* Academic Section */}
      <div className="text-left border-b-2 text-lg my-1"><strong>Education</strong></div>
      <div className='section academic flex flex-wrap justify-between'>
        {arrayToJsx(academic)}
      </div>
      {/* Work Section */}
      <div className='text-left border-b-2 text-lg mb-1'><strong>Work Experience</strong></div>
      <div className='section work flex flex-wrap justify-between'>
        {arrayToJsx(work)}
      </div>
      {/* Projects Section */}
      <div className='text-left border-b-2 text-lg mb-1'><strong>Projects</strong></div>
      <div className='section projects flex flex-wrap justify-between'>
        {arrayToJsx(projects)}
      </div>
      {/* Skills Section */}
      <div className='text-left border-b-2 text-lg mb-1'><strong>Skills</strong></div>
      <div className='section skills flex flex-wrap justify-between'>
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
      className='tab'
      onMouseDown={() => {
        document.addEventListener('mouseup', handleMouseUp)
      }}
    >{text}</button>
  );
};

export {Section, Paper, DraggableButton}