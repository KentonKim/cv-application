import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Paper, Section, DraggableButton} from './components'
import './App.css'
import { personalPromptData, schoolPromptData, workPromptData, projectsPromptData, skillsPromptData } from './promptData'

function App() {
  const [sectionArray, setSectionArray] = useState([
    {
      sectionName: "Personal",
      isSelected: true,
    },
    {
      sectionName: "Academic",
      isSelected: false,
    },
    {
      sectionName: "Work",
      isSelected: false,
    },
    {
      sectionName: "Projects",
      isSelected: false,
    },
    {
      sectionName: "Skills",
      isSelected: false,
    },

  ])
  const [personalData, setPersonalData] = useState({})
  const [academicData, setAcademicData] = useState({})
  const [workData, setWorkData] = useState({})
  const [projectsData, setProjectData] = useState({})
  const [skillsData, setSkillsData] = useState({})

  const handleDataChange = (e, setStateFunc, data) => {
    setStateFunc({
      ...data,
      [e.target.id] : e.target.value
    })
  }

  return (
    <div id='content' className="flex items-stretch justify-between gap-16">
      <div id='left-side' className="">
        <div> {/* form customizer */}
          <div> { /* form header */ }
            {sectionArray.map( sectionObj => (
              <DraggableButton key={sectionObj.sectionName} text={sectionObj.sectionName} handleClick={ () => {
                setSectionArray( sectionArray.map( obj => {
                  if (obj === sectionObj) {
                    return {...obj, 'isSelected':true}
                  } else {
                    return {...obj , 'isSelected':false}
                  }
                }))
              }}/>
            ))}
          </div>
        </div>
        <div> { /* Holder for the information shit */ }
          {sectionArray[0]['isSelected'] && 
          <Section 
            key={'personalSection'}
            data={personalData} 
            onHandle={(e)=> {
              handleDataChange(e, setPersonalData, personalData)
            }} 
            arrayOfInputs={personalPromptData}
          />}
          {sectionArray[1]['isSelected'] && 
          <Section
            key={'academicSection'}
            data={academicData}
            onHandle={(e)=> {
              handleDataChange(e, setAcademicData, academicData)
            }} 
            arrayOfInputs={schoolPromptData}
          />} 
          {sectionArray[2]['isSelected'] &&
          <Section 
            key={'workSection'}
            data={workData} 
            onHandle={(e)=> {
              handleDataChange(e, setWorkData, workData)
            }} 
            arrayOfInputs={workPromptData}
          />}
          {sectionArray[3]['isSelected'] &&
          <Section
            key={'projectsSection'}
            data={projectsData}
            onHandle={(e)=> {
              handleDataChange(e, setProjectData, projectsData)
            }} 
            arrayOfInputs={projectsPromptData}
          />}
          {sectionArray[4]['isSelected'] &&
          <Section
            key={'skillsSection'}
            data={skillsData}
            onHandle={(e)=> {
              handleDataChange(e, setSkillsData, skillsData)
            }}
            arrayOfInputs={skillsPromptData}
          />}
        </div>
        <div> { /* Show data  */}
          <div>{Object.entries(personalData).map(([keys,values])=> (<div>{`${keys}:${values}`}</div>))}</div>
          <div>{Object.entries(academicData).map(([keys,values])=> (<div>{`${keys}:${values}`}</div>))}</div>
          <div>{Object.entries(workData).map(([keys,values])=> (<div>{`${keys}:${values}`}</div>))}</div>
          <div>{Object.entries(projectsData).map(([keys,values])=> (<div>{`${keys}:${values}`}</div>))}</div>
          <div>{Object.entries(skillsData).map(([keys,values])=> (<div>{`${keys}:${values}`}</div>))}</div>
        </div>
      </div>
      <div id='right-side'>
        {/* <Paper data={} /> */}
      </div>

    </div>
  )
}

export default App
