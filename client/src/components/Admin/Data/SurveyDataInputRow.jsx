import React from 'react';

export default function SurveyDataInputRow(props){
  return(
    <div className="inputRow">
      {Array.from(Array(props.numQuestions).keys()).map(()=>
        <div className="inputCell">
          <input className="inputField"/>
        </div>
      )}
    </div>
  )
}
