import { useContext } from 'react'
import Tab from './Tab'
import TabForm from './TabForm'
import { ResumeContext } from './App'
import { personalPromptData, projectsPromptData, schoolPromptData, skillsPromptData, workPromptData } from './promptData'

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
  
  return (
    <div className='flex flex-col'>
      <div>
        <Tab key='personal' text='Personal' handleClick={() => setSelectedTab('personal')} />
        <Tab key='academic' text='Academic' handleClick={() => setSelectedTab('academic')}/>
        <Tab key='work' text='Work' handleClick={() => setSelectedTab('work')}/>
        <Tab key='projects' text='Projects' handleClick={() => setSelectedTab('projects')}/>
        <Tab key='skills' text='Skills' handleClick={() => setSelectedTab('skills')}/>
      </div>
      { selectedTab === 'personal'
        ? <TabForm data={personalData} setData={setPersonalData} prompt={personalPromptData} />
        : (selectedTab === 'academic'
          ? <TabForm data={academicData} setData={setAcademicData} prompt={schoolPromptData} />
          : (selectedTab === 'work'
            ? <TabForm data={workData} setData={setWorkData} prompt={workPromptData} />
            : (selectedTab === 'projects'
              ? <TabForm data={projectsData} setData={setProjectsData} prompt={projectsPromptData} />
              : <TabForm data={skillsData} setData={setSkillsData} prompt={skillsPromptData} />)))
      }
    </div>
  )
}

export default Form
