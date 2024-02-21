import { useContext } from "react"
import { DataContext } from "../TabForm"

const SectionIncrementer = () => {
  const { data, setData } = useContext(DataContext)

  const incrementSection = () => {
    const tempDataArr = [...data]
    // add new empty section
    tempDataArr.push({})
    setData(tempDataArr)
  }

  return (
    <button onClick={() => incrementSection()}>+</button>
  )
}

export default SectionIncrementer
