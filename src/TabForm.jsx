import { useContext, useEffect, useState } from 'react'
import Section from './Section'
import { ResumeContext } from './App'
import SectionIncrementer from './features/SectionIncrementer'

const TabForm = ({data}) => {
  const { selectedTab, sectionAmounts } = useContext(ResumeContext)
  const [ sections, setSections ] = useState([]) 

  useEffect(() => {
    const sectionsArr = []
    // add amount of sections that exist within the tab
    for (let i = 0; i < data.length; i += 1) {
      sectionsArr.push(
        <Section />
      )
    }
    setSections(sectionsArr)
  }, [selectedTab, sectionAmounts])

  return (
    <div className='flex flex-col'>
      {sections}
      { 
      // if personal and section, omit this component
      }
      {(selectedTab !== 'personal' && selectedTab !== 'skills') &&
        <SectionIncrementer />
      }
    </div>
  )
}

export default TabForm
