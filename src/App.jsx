import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Paper, Section } from './components'
import './App.css'
import { personalPromptData, schoolPromptData, workPromptData, projectsPromptData, skillsPromptData } from './promptData'

function App() {
  const [section, setSection] = useState('personal')
  const [personalData, setPersonalData] = useState({})
  const [academicData, setAcademicData] = useState({})
  const [workData, setWorkData] = useState({})
  const [projectsData, setProjectData] = useState({})
  const [skillsData, setSkillsData] = useState({})

  const handleDataChange = (e, func, data) => {
    func({
      ...data,
      [e.target.id] : e.target.value
    })
    console.log(data)
  }

  return (
    <div id='content' className="flex items-stretch justify-between gap-16">
      <div id='left-side' className="">
        <div> {/* form customizer */}
          <div> { /* form header */ }
            <button onClick={() => setSection('personal')}>Personal</button>
            <button onClick={() => setSection('academic')}>Academic</button>
            <button onClick={() => setSection('work')}>Work Experience</button>
            <button onClick={() => setSection('projects')}>Projects</button>
            <button onClick={() => setSection('skills')}>Skills</button>
          </div>
        </div>
        <div> { /* Holder for the information shit */ }
          {section === "personal" && 
          <Section 
            data={personalData} 
            onHandle={(e)=> {
              handleDataChange(e, setPersonalData, personalData)
            }} 
            arrayOfInputs={personalPromptData}
          />}
          {section === "academic" && 
          <Section
            data={academicData}
            onHandle={(e)=> {
              handleDataChange(e, setAcademicData, academicData)
            }} 
            arrayOfInputs={schoolPromptData}
          />} 
          {section === "work" &&
          <Section 
            data={workData} 
            onHandle={(e)=> {
              handleDataChange(e, setWorkData, workData)
            }} 
            arrayOfInputs={workPromptData}
          />}
          {section === "projects" &&
          <Section
            data={projectsData}
            onHandle={(e)=> {
              handleDataChange(e, setProjectData, projectsData)
            }} 
            arrayOfInputs={projectsPromptData}
          />}
          {section === "skills" &&
          <Section
            data={skillsData}
            onHandle={(e)=> {
              handleDataChange(e, setSkillsData, skillsData)
            }}
            arrayOfInputs={skillsPromptData}
          />}
        </div>
      </div>
      <div id='right-side'>
        {/* <Paper data={} /> */}
      </div>

    </div>
  )
}

export default App
