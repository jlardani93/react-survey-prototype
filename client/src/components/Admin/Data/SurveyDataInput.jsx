import React from 'react'
import SurveyDataInputRow from './SurveyDataInputRow'

export default function SurveyDataInput(props){

  const inputRows = [];
  let i = 0;
  if (parseInt(props.numNewSurveys)){
    Array.from(Array(parseInt(props.numNewSurveys)).keys()).map(() => {
      inputRows.push(
        <SurveyDataInputRow key={i}
        surveyIndex={i}
        numQuestions={props.surveyQuestions.length}
        onUpdateNewSurveys={props.onUpdateNewSurveys}
        onSubmitSurveys={props.onSubmitSurveys}/>
      )
      i++;
    })
  }

  return(
    <div>
      <style jsx>
      {`

        .inputRow {
          margin-left: 20px;
          margin-right: 20px;
          display: grid;
          grid-template-columns: repeat(${props.surveyQuestions.length}, 1fr);
        }
        .inputCell {
          border: 1px solid black;
          height: 30px;
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
          <div class="inputRow">
            {props.surveyQuestions.map( question =>
              <div class="inputCell">
                <p>{question.question}</p>
              </div>
            )}
          </div>
          {inputRows}
          <button onClick={() => {props.onSubmitSurveys()}}>Submit all surveys</button>
        </div>
      </div>
    </div>
  )
}
