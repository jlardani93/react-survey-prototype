import React from 'react'
import { connect } from 'react-redux'
import SurveyQuestion from './SurveyQuestion'
import SurveyPreview from './SurveyPreview'
import * as operations from './../../../operations'

class SurveyCreate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newSurvey: []
    }
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleCreateSurvey = this.handleCreateSurvey.bind(this);
  }

  _title

  handleAddQuestion(question){
    console.log(question);
    const newState = Object.create(this.state);
    const newQuestion = Object.assign({}, question, {questionNumber: this.state.newSurvey.length+1})
    newState.newSurvey.push(newQuestion);
    this.setState(newState);
  }

  handleCreateSurvey(){
    const { dispatch } = this.props;
    const titleElement = document.getElementById('surveyTitle');
    const onCreateSurvey = ( response => {
      if (response.affectedRows !== 0) {
        alert("survey was added successfully")
        this.setState({newSurvey: []});
        this.props.onAddNewSurvey();
      } else {
        alert("survey was not added successfully")
      }
    }).bind(this);
    if (titleElement.value && this.state.newSurvey.length !== 0) {
      console.log("about to create survey");
      dispatch(operations.createSurvey(titleElement.value, this.state.newSurvey, onCreateSurvey));
    } else {
      alert("Be sure to provide a title for your survey!");
    }
  }

  render(){
    console.log(this.state);
    return(
      <div>
        <label>Survey Title:</label>
        <input id='surveyTitle' type='text' ref={ input => this._title = input} />
        <p>This is the SurveyCreate Component</p>
        <SurveyQuestion onAddQuestion={this.handleAddQuestion}/>
        <SurveyPreview survey={this.state.newSurvey}/>
        <button onClick={this.handleCreateSurvey}>Save Survey</button>
      </div>
    )
  }
}

export default connect()(SurveyCreate)
