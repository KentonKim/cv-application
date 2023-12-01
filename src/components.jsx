import { useState } from "react"

export default function Section({arrayOfInputs}) {
    return(
        <form>{arrayOfInputs.map(inputObj => {
            return (
                <>
                    <label htmlFor={inputObj.id}>{inputObj.label}</label>
                    <input type={(inputObj.type && inputObj.type)} id={inputObj.id} placeholder={(inputObj.example && inputObj.example)}></input>
                    {inputObj != arrayOfInputs[arrayOfInputs.length - 1] && <br/>}
                </>
            )
        })}</form>
    )
}
