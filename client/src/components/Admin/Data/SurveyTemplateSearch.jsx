import React from 'react'

export default function SurveyTemplateSearch(props){

  let _surveyTemplate

  function handleFormSubmission(e){
    e.preventDefault();
    props.onSurveyTemplateSelection(_surveyTemplate.value);
  }

  return(
    <div>
      <form onSubmit={handleFormSubmission}>
        <select ref={input => _surveyTemplate = input}>
          <option value='' disabled selected hidden>Select a Survey</option>
          {props.surveyTemplates.map(surveyTemplate =>
            <option key={surveyTemplate.id} value={surveyTemplate.id}>{surveyTemplate.title}</option>
          )}
        </select>
        <button type="submit">Select Survey</button>
      </form>
    </div>
  )
}
