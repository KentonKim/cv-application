import { useContext, useEffect, useState } from "react"
import { DataContext } from "../TabForm"

const SectionIncrementer = () => {
  const { data, setData } = useContext(DataContext)
  const [isAddDisabled, setIsAddDisabled] = useState(false)
  // const [isMinusDisabled, setIsMinusDisabled] = useState(false)

  useEffect(() => {
    const sectionAmount = data.length

    if (sectionAmount === 3) {
      setIsAddDisabled(true)
    } else {
      setIsAddDisabled(false)
    }
  }, [data])

  const incrementSection = () => {
    const tempDataArr = [...data]
    // add new empty section
    tempDataArr.push({})
    setData(tempDataArr)
  }

  return (
    <div>
      <button onClick={() => incrementSection()} disabled={isAddDisabled}>+</button>
    </div>
  )
}

export default SectionIncrementer
