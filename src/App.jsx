import { useState, useEffect, createContext } from 'react'
import { Paper, Section, DraggableButton} from './components'
import './App.css'
import { personalPromptData, schoolPromptData, workPromptData, projectsPromptData, skillsPromptData } from './promptData'
import Form from './Form'

export function CrApp() {
  const [tabArray, setTabArray] = useState([
    {
      tabName: "Personal",
      isSelected: true,
    },
    {
      tabName: "Academic",
      isSelected: false,
      amount: 1
    },
    {
      tabName: "Work",
      isSelected: false,
      amount: 1
    },
    {
      tabName: "Projects",
      isSelected: false,
      amount: 1
    },
    {
      tabName: "Skills",
      isSelected: false,
    },
  ])

  const [personalData, setPersonalData] = useState([{}])
  const [academicData, setAcademicData] = useState([{}])
  const [workData, setWorkData] = useState([{}])
  const [projectsData, setProjectData] = useState([{}])
  const [skillsData, setSkillsData] = useState([{}])

  // takes in array of objects and returns new array of new objects, then alters one property of one object
  const handleDataChange = (e, setStateFunc, data, index = 0) => {
    const newDataArray = data.map(sectionObj => { return {...sectionObj}})
    newDataArray[index] = { 
      ...newDataArray[index],
      [e.target.id] : e.target.value
    }
    setStateFunc(newDataArray)
  }

  const handleDescDel = (setStateFunc, data, index = 0) => {
    const newDataArray = data.map(sectionObj => { return {...sectionObj}})
    const sectionObj = newDataArray[index]
    const arrayDescProps = Object.keys(sectionObj).filter(word => word.includes('description'))
    console.log(arrayDescProps)
    delete sectionObj[arrayDescProps[arrayDescProps.length - 1]] // delete last description
    setStateFunc(newDataArray)
  }

  // onClick function for adding/deleting sections within tab
  const onSectionAmountChange = (tabArray, setData, data, tabObj, isAdd) => {
    setTabArray( tabArray.map( obj => {
      if (obj === tabObj) {
        return isAdd ? {...obj, 'amount':tabObj.amount + 1} : {...obj, 'amount':tabObj.amount - 1}
      } else {
        return {...obj}
      }
    }))
    const newData = data.map(dataObj => {return {...dataObj}}) 
    if (isAdd) {
      setData([...newData, {}])
    } else {
      newData.pop()
      setData(newData)
    }
  }

  const createSectionArray = (tabData, tabNumber, key, data, setData, arrayOfPrompts, isMultiSection = true) => {
    const tabObj = tabData[tabNumber]
    const sectionArray = []
    if (tabObj.amount) {
      for (let i = 0; i < tabObj.amount; i += 1) {
        sectionArray.push(
          <Section 
            key = {`${key}${i == 0 ? '' : `-${i}`}`}
            data = {data[i]}
            onHandle = {(e) => {handleDataChange(e, setData, data, i)}}
            onDescDel= {() => {handleDescDel(setData, data, i)}}
            arrayOfPrompts = {arrayOfPrompts}
            isMultiSection = {isMultiSection}
            // onDescDel={() => handleDescDel(setData, data, i)}
          />
        )
      }
      sectionArray.push(
        <>
          {tabObj.amount < 5 && <button onClick={() => onSectionAmountChange(tabArray, setData, data, tabObj, true)}><strong>{`Add ${tabObj.tabName} Section`}</strong></button>}
          {tabObj.amount > 1 && tabObj.amount < 5 && <>{" / "}</>}
          {tabObj.amount > 1 && <button onClick={() => onSectionAmountChange(tabArray, setData, data, tabObj, false)}><strong>Remove Section</strong></button>}
        </>
      )
    } else {
      sectionArray.push(
        <Section 
          key = {key} 
          data = {data[0]}
          onHandle = {(e) => {handleDataChange(e, setData, data)}}
          onDescDel= {() => {handleDescDel(setData, data)}}
          arrayOfPrompts = {arrayOfPrompts}
        />
      )
    }
    return sectionArray
  }



  return (
    <div id='content' className="flex items-stretch justify-between gap-16">
      <div id='left-side' className="">
        <div className='tab-container flex'> { /* form header */ }
          {tabArray.map( tabObj => (
            <DraggableButton key={tabObj.tabName} text={tabObj.tabName} handleClick={ () => {
              setTabArray( tabArray.map( obj => {
                if (obj === tabObj) {
                  return {...obj, 'isSelected':true}
                } else {
                  return {...obj , 'isSelected':false}
                }
              }))
            }}/>
          ))}
        </div>
        {tabArray[0]['isSelected'] && 
          createSectionArray(tabArray, 0, 'personalSection', personalData, setPersonalData, personalPromptData, false)
        }
        {tabArray[1]['isSelected'] && 
          createSectionArray(tabArray, 1, 'academicSection', academicData, setAcademicData, schoolPromptData)
        } 
        {tabArray[2]['isSelected'] &&
          createSectionArray(tabArray, 2, 'workSection', workData, setWorkData, workPromptData)
        }
        {tabArray[3]['isSelected'] &&
          createSectionArray(tabArray, 3, 'projectsSection', projectsData, setProjectData, projectsPromptData)
        }
        {tabArray[4]['isSelected'] &&
          createSectionArray(tabArray, 4, 'skillsSection', skillsData, setSkillsData, skillsPromptData, false)
        }
      </div>
      <div id='right-side'>
        <Paper personal={personalData} academic={academicData} work={workData} projects={projectsData} skills={skillsData} />
      </div>
    </div>
  )
}


export const ResumeContext = createContext(null)
export default function App() {
  const [ selectedTab, setSelectedTab ] = useState('personal')
  const [ sectionAmounts, setSectionAmounts ] = useState({
    personal: 1,
    academic: 1,
    work: 1,
    projects: 1,
    skills: 1,
  })


  return (
    <ResumeContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
        sectionAmounts,
        setSectionAmounts
      }}>
      <Form />
      {/* <Paper /> */}
    </ResumeContext.Provider>
  )
}
