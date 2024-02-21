import { createContext, useContext, useEffect, useState } from 'react'
import Section from './Section'
import { ResumeContext } from './App'
import SectionIncrementer from './features/SectionIncrementer'
import PropTypes from 'prop-types'

export const DataContext = createContext(null)

const TabForm = ({data, setData, prompt}) => {
  const { selectedTab } = useContext(ResumeContext)
  const [ sections, setSections ] = useState([]) 

  // add amount of sections that exist within the tab
  useEffect(() => {
    const sectionsArr = []
    if (data.length === 1) {
      sectionsArr.push(<Section sectionData={data[0]} isOnlySection={true} />)
    } else {
      for (let i = 0; i < data.length; i += 1) {
        sectionsArr.push(
          <Section key={`section-${i}`} sectionData={data[i]}/>
        )
      }
    }
    setSections(sectionsArr)
  }, [data])

  return (
    <DataContext.Provider value={{
      data,
      setData,
      prompt
    }}>
      <div className='flex flex-col'>
        {sections}
        {selectedTab !== 'personal'
        && selectedTab !== 'skills' 
        && data.length < 3
        && <SectionIncrementer />
        }
      </div>
    </DataContext.Provider>
  )
}

export default TabForm

TabForm.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  setData: PropTypes.func.isRequired,
  prompt: PropTypes.arrayOf(PropTypes.object),
}