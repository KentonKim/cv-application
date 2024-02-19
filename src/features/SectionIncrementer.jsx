import { useContext, useEffect, useState } from "react"
import { ResumeContext } from "../App"

const SectionIncrementer = () => {
  const { selectedTab, sectionAmounts, setSectionAmounts } = useContext(ResumeContext)
  const [isAddDisabled, setIsAddDisabled] = useState(false)
  const [isMinusDisabled, setIsMinusDisabled] = useState(false)

  useEffect(() => {
    if (sectionAmounts[selectedTab] === 1) {
      setIsMinusDisabled(true)
    } else {
      setIsMinusDisabled(false)
    }

    if (sectionAmounts[selectedTab] === 3) {
      setIsAddDisabled(true)
    } else {
      setIsAddDisabled(false)
    }
  }, [sectionAmounts, selectedTab])

  const incrementSection = (amount) => {
    setSectionAmounts({
      ...sectionAmounts,
      [selectedTab] : sectionAmounts[selectedTab] + amount
    })
    console.log(sectionAmounts)
  }

  return (
    <div>
      <button onClick={() => incrementSection(1)} disabled={isAddDisabled}>+</button>
      <button onClick={() => incrementSection(-1)} disabled={isMinusDisabled}>-</button>
    </div>
  )
}

export default SectionIncrementer
