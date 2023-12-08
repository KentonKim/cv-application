import { useState } from 'react'
import { Paper, Section, DraggableButton} from './components'
import './App.css'
import { personalPromptData, schoolPromptData, workPromptData, projectsPromptData, skillsPromptData } from './promptData'

function App() {
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

  const handleDataChange = (e, setStateFunc, data, index = 0) => {
    const newDataArray = data.map(sectionObj => { return {...sectionObj}})
    newDataArray[index] = { 
      ...newDataArray[index],
      [e.target.id] : e.target.value
    }
    setStateFunc(newDataArray)
  }

  const createSectionArray = (tabData, tabNumber, key, data, setData, arrayOfPrompts) => {
    const tabObj = tabData[tabNumber]
    const sectionArray = []
    if (tabObj.amount) {
      for (let i = 0; i < tabObj.amount; i += 1) {
        sectionArray.push(
          <Section 
            key = {`${key}${i == 0 ? '' : `-${i}`}`}
            data = {data[i]}
            onHandle = {(e) => {handleDataChange(e, setData, data, i)}}
            arrayOfPrompts = {arrayOfPrompts}
          />
        )
      }
      sectionArray.push(
        <>
          {tabObj.amount < 5 && <button onClick={() => {
            setTabArray( tabArray.map( obj => {
              if (obj === tabObj) {
                return {...obj, 'amount':tabObj.amount + 1}
              } else {
                return {...obj}
              }
            }))
            const newData = data.map(dataObj => {return {...dataObj}}) 
            setData([...newData, {}])
          }}><strong>+</strong></button>}
          {tabObj.amount > 1 && <button onClick={() => {
            setTabArray( tabArray.map( obj => {
              if (obj === tabObj) {
                return {...obj, 'amount':tabObj.amount - 1}
              } else {
                return {...obj}
              }
            }))
            const newData = data.map(dataObj => {return {...dataObj}}) 
            newData.pop()
            setData(newData)
          }}><strong>-</strong></button>}
        </>
      )
    } else {
      sectionArray.push(<Section 
        key = {key} 
        data = {data[0]}
        onHandle = {(e) => {handleDataChange(e, setData, data)}}
        arrayOfPrompts = {arrayOfPrompts}
      />)
    }
    return sectionArray
  }

  return (
    <div id='content' className="flex items-stretch justify-between gap-16">
      <div id='left-side' className="">
        <div> {/* form customizer */}
          <div> { /* form header */ }
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
        </div>
        <div> { /* Holder for the information shit */ }
          {tabArray[0]['isSelected'] && 
            createSectionArray(tabArray, 0, 'personalSection', personalData, setPersonalData, personalPromptData)
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
            createSectionArray(tabArray, 4, 'skillsSection', skillsData, setSkillsData, skillsPromptData)
          }
        </div>
      </div>
      <div id='right-side'>
        <Paper personal={personalData} academic={academicData} work={workData} projects={projectsData} skills={skillsData} />
      </div>
    </div>
  )
}

export default App
