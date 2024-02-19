import React, { createContext, useContext, useEffect, useState } from 'react'
import Tab from './Tab'
import TabForm from './TabForm'
import { ResumeContext } from './App'
import { personalPromptData, projectsPromptData, schoolPromptData, skillsPromptData, workPromptData } from './promptData'

const DataContext = createContext(null)

const Form = () => {
  const { 
    selectedTab,
    setSelectedTab,
    personalData,
    setPersonalData,
    academicData,
    setAcademicData,
    workData,
    setWorkData,
    projectsData,
    setProjectsData,
    skillsData,
    setSkillsData,
  } = useContext(ResumeContext)
  const handleClick = (string) => {
    setSelectedTab(string)
  }
  const [referenceData, setReferenceData] = useState(personalData)
  const [referenceDataSetter, setReferenceDataSetter] = useState(setPersonalData)
  const [prompt, setPrompt] = useState([])

  useEffect(() => {
    switch (selectedTab) {
    case 'personal':
      setReferenceData(personalData)
      setReferenceDataSetter(setPersonalData)
      setPrompt(personalPromptData)
      break
    case 'academic':
      setReferenceData(academicData)
      setReferenceDataSetter(setAcademicData)
      setPrompt(schoolPromptData)
      break
    case 'work':
      setReferenceData(workData)
      setReferenceDataSetter(setWorkData)
      setPrompt(workPromptData)
      break
    case 'projects':
      setReferenceData(projectsData)
      setReferenceDataSetter(setProjectsData)
      setPrompt(projectsPromptData)
      break
    case 'skills':
      setReferenceData(skillsData)
      setReferenceDataSetter(setSkillsData)
      setPrompt(skillsPromptData)
      break
    default:
      throw new Error(`selected tab has unexpected value: ${selectedTab}`)
    }
  }, [selectedTab, personalData, academicData, workData, projectsData, skillsData])

  return (
    <div className='flex flex-col'>
      <div>
        <Tab key='personal' text='Personal' handleClick={() => handleClick('personal')} />
        <Tab key='academic' text='Academic' handleClick={() => handleClick('academic')}/>
        <Tab key='work' text='Work' handleClick={() => handleClick('work')}/>
        <Tab key='projects' text='Projects' handleClick={() => handleClick('projects')}/>
        <Tab key='skills' text='Skills' handleClick={() => handleClick('skills')}/>
      </div>
      <DataContext.Provider value={{
        referenceData, 
        referenceDataSetter,
        prompt
      }}>
        <TabForm />
      </DataContext.Provider>
    </div>
  )
}

export default Form
