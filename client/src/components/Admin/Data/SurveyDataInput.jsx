import React from 'react'
import SurveyDataInputRow from './SurveyDataInputRow'

export default function SurveyDataInput(props){

  const inputRows = [];
  let i = 1;
  if (parseInt(props.numNewSurveys)){
    Array.from(Array(parseInt(props.numNewSurveys)).keys()).map(() => {
      inputRows.push(
        <SurveyDataInputRow key={i} numQuestions={props.surveyQuestions.length}/>
      )
      i++;
    })
  }

  return(
    <div>
      <style jsx>
      {`

        .inputRow {
          display: grid;
          grid-template-columns: repeat(${props.surveyQuestions.length}, 1fr);
        }
        .inputCell {
          border: 1px solid black;
          height: 10px;
        }

        .inputField {
          width: 100%;
          height: 100%;
        }
      `}
      </style>
      <div>
        <p>This is the SurveyDataInputFields component {props.numNewSurveys}</p>
        <div>
          <div>
          </div>
          <div>
          {inputRows}
          </div>
        </div>
      </div>
    </div>
  )
}
