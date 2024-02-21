import { useContext } from 'react'
import { DataContext } from '../TabForm'
import PropTypes from 'prop-types'

const SectionDecrementer = ({sectionData}) => {
  const { data, setData } = useContext(DataContext)

  const deleteSection = () => {
    const tempDataArr = []
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] !== sectionData) {
        tempDataArr.push(data[i])
      }
    }
    setData(tempDataArr)
  }

  return (
    <button onClick={() => deleteSection()}>-</button>
  )
}

export default SectionDecrementer

SectionDecrementer.propTypes = {
  sectionData: PropTypes.object
}