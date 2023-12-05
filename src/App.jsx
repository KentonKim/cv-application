import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Section from './components'
import './App.css'
import { personalData, schoolData, workData, projectsData, skillsData } from './data'

function App() {
  const [section, setSection] = useState('personal')

  return (
    <>
      <div id='left-side'>
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
          <Section arrayOfInputs={personalData}/>}
          {section === "academic" && 
          <Section arrayOfInputs={schoolData}/>} 
          {section === "work" &&
          <Section arrayOfInputs={workData}/>}
          {section === "projects" &&
          <Section arrayOfInputs={projectsData}/>}
          {section === "skills" &&
          <Section arrayOfInputs={skillsData}/>}
        </div>
      </div>
      <div id='right-side'>
      </div>

    </>
  )
}

export default App
