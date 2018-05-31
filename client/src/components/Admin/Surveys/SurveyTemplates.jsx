import React from 'react'

export default function SurveyTemplates(props){

  function handleSelection(e){
    console.log("Selecting Value");
    props.onSelectSurvey(document.getElementById('survey').value);
  }

  return(
    <div>
      <select id="survey" onChange={handleSelection}>
        <option value="" disabled selected hidden>Choose a survey to preview</option>
      {props.titles.map( title =>
        <option key={title.id} value={title.id}>{title.title}</option>
      )}
      </select>
    </div>
  )
}
