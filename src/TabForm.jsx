import { useContext, useEffect, useState } from 'react'
import Section from './Section'
import SectionCounter from './features/SectionCounter'
import { ResumeContext } from './App'

const TabForm = () => {
  const { selectedTab, sectionAmounts } = useContext(ResumeContext)
  const [ sections, setSections ] = useState([]) 

  useEffect(() => {
    const sectionsArr = []
    // add amount of sections that exist within the tab
    for (let i = 0; i < sectionAmounts[selectedTab]; i += 1) {
      sectionsArr.push(
        <Section />
      )
    }
    setSections(sectionsArr)
  }, [selectedTab, sectionAmounts])

  return (
    <>
      {sections}
      { 
      // if personal and section, omit this component
      }
      {(selectedTab !== 'personal' && selectedTab !== 'skills') &&
        <SectionCounter />
      }
    </>
  )
}

export default TabForm
