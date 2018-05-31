import React from 'react'
import { connect } from 'react-redux'
import * as operations from './../../../operations'

function ModulesCreate(props){

  let _title, _survey

  function handleCreateNewModule(e){
    e.preventDefault();
    const { dispatch } = props;
    const title = _title.value;
    const surveyId = _survey.value;
    const onCreateModule = ( response => {
      if (response.rowsAffected !== 0){
        alert('The new Module was added successfully');
      }
    }).bind(this);
    if (!surveyId){
      alert("Please choose a survey to use with this module");
    } else {
      dispatch(operations.createModule(title, surveyId, onCreateModule))
    }
  }

  return(
    <div>
      <form onSubmit={handleCreateNewModule}>
        <div>
          <label>Module Title:</label>
          <input type="text" ref={ input => _title = input}/>
        </div>
        <div>
          <select ref={ input => _survey = input}>
            <option value='' disabled selected hidden>Choose a Survey</option>
            {props.surveys.map(survey =>
              <option key={survey.id} value={survey.id}>{survey.title}</option>
            )}
          </select>
        </div>
        <button type="submit">Create New Module</button>
      </form>
    </div>
  )
}

export default connect()(ModulesCreate);
