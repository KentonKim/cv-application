import React, { useContext } from 'react'
import Tab from './Tab'
import TabForm from './TabForm'
import { ResumeContext } from './App'

const Form = () => {
  const { setSelectedTab } = useContext(ResumeContext)
  const handleClick = (string) => {
    setSelectedTab(string)
  }

  return (
    <>
      <Tab key='personal' text='Personal' handleClick={() => handleClick('personal')} />
      <Tab key='academic' text='Academic' handleClick={() => handleClick('academic')}/>
      <Tab key='work' text='Work' handleClick={() => handleClick('work')}/>
      <Tab key='projects' text='Projects' handleClick={() => handleClick('projects')}/>
      <Tab key='skills' text='Skills' handleClick={() => handleClick('skills')}/>
      <TabForm />
    </>
  )
}

export default Form
