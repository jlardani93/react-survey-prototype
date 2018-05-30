import React from 'react'

export default function SurveyPreview(props){
  return(
    <div>
      {props.survey.map( question => {
        return (
          <div key={question.questionNumber}>
            <p>{question.questionNumber}</p>
            <p>{question.question}</p>
            <p>{question.questionType}</p>
          </div>
        )
      }
      )}
    </div>
  )
}
