import { createContext, useContext, useEffect, useState } from 'react'
import Section from './Section'
import { ResumeContext } from './App'
import SectionIncrementer from './features/SectionIncrementer'
import PropTypes from 'prop-types'

export const DataContext = createContext(null)

const TabForm = ({data, setData, prompt}) => {
  const { selectedTab } = useContext(ResumeContext)
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
  }, [data])

  return (
    <DataContext.Provider value={{
      data,
      setData,
      prompt
    }}>
      <div className='flex flex-col'>
        {sections}
        {(selectedTab !== 'personal' && selectedTab !== 'skills') &&
          <SectionIncrementer />
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