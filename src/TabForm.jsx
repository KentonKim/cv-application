import Section from './Section'
import SectionCounter from './features/SectionCounter'

const TabForm = () => {

  const sectionsArr = []

  // add amount of sections that exist within the tab

  return (
    <>
      <Section />
      {sectionsArr}
      { 
      // if personal and section, omit this component
      }
      <SectionCounter />
    </>
  )
}

export default TabForm
