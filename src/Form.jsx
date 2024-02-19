import React from 'react'
import Tab from './Tab'
import TabForm from './TabForm'

const Form = () => {

  const handleClick = (e) => {
    console.log(e.target.key)
  }
  return (
    <>
      <Tab key='personal' text='Personal' handleClick={handleClick} />
      <Tab key='academic' text='Academic' handleClick={handleClick}/>
      <Tab key='work' text='Work' handleClick={handleClick}/>
      <Tab key='projects' text='Projects' handleClick={handleClick}/>
      <Tab key='skills' text='Skills' handleClick={handleClick}/>
      <TabForm />
    </>
  )
}

export default Form
