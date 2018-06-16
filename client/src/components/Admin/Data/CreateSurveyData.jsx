import React from 'react'
import { connect } from 'react-redux'
import SurveyDataInput from './SurveyDataInput'

class CreateSurveyData extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      numNewSurveys: null
    };
    this.handleCreateInputFields = this.handleCreateInputFields.bind(this);
  }

  _numNewSurveys

  handleCreateInputFields(e){
    e.preventDefault();
    this.setState({numNewSurveys: this._numNewSurveys.value})
    console.log(this._numNewSurveys.value);
  }

  render(){
    return(
      <div>
        <p>This is the CreateSurveyData Component</p>
        <form onSubmit={this.handleCreateInputFields}>
          <select ref={input => this._numNewSurveys = input}>
            {Array.apply(null, {length: 30}).map(Number.call, Number).map(n =>
              <option key={n+1} value={n+1}>{n+1}</option>
            )}
          </select>
          <button type="submit">Input Surveys</button>
        </form>
        <SurveyDataInput numNewSurveys={this.state.numNewSurveys} surveyQuestions={this.props.surveyQuestions}/>
      </div>
    )
  }
}

export default connect()(CreateSurveyData);
