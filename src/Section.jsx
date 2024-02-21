import { useContext, useEffect, useState } from "react"
import SectionDecrementer from "./features/SectionDecrementer"
import PropTypes from 'prop-types'
import { DataContext } from "./TabForm"
import Question from "./Question"
import SectionTitle from "./SectionTitle"

const Section = ({sectionData, isOnlySection = false}) => {
  const { data, setData, prompt } = useContext(DataContext)
  const [questions, setQuestions] = useState([])
  // fill up with lines of labels and inputs

  useEffect(() => {
    const tempQuestions = []

    for (let i = 0; i < prompt.length; i += 1) {
      tempQuestions.push(
        <Question key={`question-${i}`} promptObj={prompt[i]} />
      )
    }
    setQuestions(tempQuestions)
  }, [data,prompt])

  // check if there is only one section

  return (
    <div className="flex flex-col">
      <SectionTitle />
      {questions}
      {!isOnlySection && <SectionDecrementer sectionData={sectionData} />}
    </div>
  )
}

export default Section

Section.propTypes = {
  sectionData: PropTypes.object,
  isOnlySection: PropTypes.bool
}