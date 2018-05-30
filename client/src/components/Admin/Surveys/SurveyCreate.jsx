import React from 'react'
import SurveyQuestion from './SurveyQuestion'
import SurveyPreview from './SurveyPreview'

class SurveyCreate extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newSurvey: []
    }
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
  }

  _title

  handleAddQuestion(question){
    console.log(question);
    const newState = Object.create(this.state);
    const newQuestion = Object.assign({}, question, {questionNumber: this.state.newSurvey.length+1})
    newState.newSurvey.push(newQuestion);
    this.setState(newState);
  }

  render(){
    console.log(this.state);
    return(
      <div>
        <label>Survey Title:</label>
        <input type='text' ref={ input => this._title = input} />
        <p>This is the SurveyCreate Component</p>
        <SurveyQuestion onAddQuestion={this.handleAddQuestion}/>
        <SurveyPreview survey={this.state.newSurvey}/>
      </div>
    )
  }
}

export default SurveyCreate
