import React from 'react';

export default function SurveyDataInputRow(props){

  return(
    <div className="inputRow">
      {Array.from(Array(props.numQuestions).keys()).map((index)=>
        <div className="inputCell" key={index}>
          <input className="inputField" onChange={(e) => props.onUpdateNewSurveys(props.surveyIndex, index, e)}/>
        </div>
      )}
      <button onClick={() => {props.onSubmitSurveys(props.surveyIndex)}}>Submit Survey</button>
    </div>
  )
}
