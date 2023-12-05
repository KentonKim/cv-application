function Section({data, onHandle, arrayOfInputs}) {
  return(
    <form>{arrayOfInputs.map(inputObj => {
      return (
        <>
          <label htmlFor={inputObj.id}>{inputObj.label}</label>
          { inputObj['isLongResponse'] ?
            <textarea
              type={(inputObj.type && inputObj.type)}
              id={inputObj.id}
              placeholder={(inputObj.example && inputObj.example)}
              onChange={onHandle}
              value={data[inputObj.id]}
            ></textarea> :
            <input 
              type={(inputObj.type && inputObj.type)}
              id={inputObj.id}
              placeholder={(inputObj.example && inputObj.example)}
              onChange={onHandle}
              value={data[inputObj.id]}
            ></input>}
          {inputObj != arrayOfInputs[arrayOfInputs.length - 1] && <br/>}
        </>
      )
    })}</form>
  )
}

function Paper({personal, academic, work, projects, skills}) {
  return(
    <div className="w-[510px] h-[660px] bg-white text-black font-serif">
      <div className="border-solid border-black border-2">
        {Object.entries(data).map(([key,value]) => (
          <div key={key}>{value}</div>
        ))}
      </div>
    </div>
  )
}

export {Section, Paper}