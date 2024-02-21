import PropTypes from 'prop-types'
import Label from './Label'
import InputLong from './InputLong'
import InputShort from './InputShort'

const Question = ({promptObj}) => {
  return (
    <div className='flex flex-row'>
      <Label promptObj={promptObj} />
      {promptObj.isLongResponse
        ? <InputLong promptObj={promptObj} />
        : <InputShort promptObj={promptObj} />
      }
    </div>
  )
}

export default Question


Question.propTypes = {
  promptObj: PropTypes.object
}