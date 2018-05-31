import React from 'react'
//surveyQuestions

export default function SurveyInfo(props){
  console.log("These are the props received by SurveyInfo: ", props)
  return(
    <div>
      <style jsx>
        {`
          .tableRow {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            justify-items: center;
            align-items: center;
          }

          .tableRow p {
            display: table-cell;
            height: 30px;
            width: 100%;
            border: 1px solid black;
            vertical-align: middle;
            margin: 0;
          }
        `}
      </style>
      <div>
        <div className='tableRow'>
          <p>Question Number</p>
          <p>Question</p>
        </div>
        {props.surveyQuestions.map(question =>
          <div key={question.question_number} className="tableRow">
            <p>{question.question_number}</p>
            <p>{question.question}</p>
          </div>
        )}
      </div>
    </div>
  )
}
