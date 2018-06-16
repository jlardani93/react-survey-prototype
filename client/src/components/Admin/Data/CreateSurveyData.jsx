import React from 'react'
import { connect } from 'react-redux'
import SurveyDataInput from './SurveyDataInput'
import * as operations from './../../../operations'

class CreateSurveyData extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      numNewSurveys: null,
      newSurveys: null
    };
    this.handleCreateInputFields = this.handleCreateInputFields.bind(this);
    this.handleUpdateNewSurveys = this.handleUpdateNewSurveys.bind(this);
    this.handleSubmitSurveys = this.handleSubmitSurveys.bind(this);
  }

  _numNewSurveys

  handleCreateInputFields(e){
    e.preventDefault();
    console.log('numNewSurveys:', this._numNewSurveys.value);

    //Creates an array of new survey objects in this component's setState

    const newSurveys =  Array.apply(null, Array(parseInt(this._numNewSurveys.value))).map( survey => {
      return {
        templateId: this.props.surveyTemplateId,
        teacherId: this.props.teacherId,
        responses: this.props.surveyQuestions.map( question => {
          return {
            questionId: question.id,
            questionResponse: null
          }
        })
      }
    })

    console.log('newSurveys:', newSurveys);

    this.setState({
      numNewSurveys: this._numNewSurveys.value,
      newSurveys: newSurveys
    })
    console.log(this._numNewSurveys.value);
  }

  handleUpdateNewSurveys(surveyIndex, responseIndex, event){
    console.log('surveyIndex', surveyIndex);
    console.log('responseIndex', responseIndex);
    console.log('event target:', event.target.value);
    const tempNewSurveys = this.state.newSurveys.slice();
    tempNewSurveys[surveyIndex].responses[responseIndex].questionResponse = event.target.value;
    console.log(tempNewSurveys);
    this.setState({newSurveys: tempNewSurveys});
  }

  handleSubmitSurveys(surveyIndex){
    const { surveyTemplateId, teacherId, dispatch } = this.props;

    const onSuccess = (function(){
      alert('Survey Added Successfully');
    }).bind(this);

    console.log('surveyTemplateId:', surveyTemplateId);
    console.log('teacherId:', teacherId);
    console.log('surveyIndex:', surveyIndex);

    const surveys = this.state.newSurveys;
    const numSurveys = this.state.numNewSurveys;

    if (surveyIndex !== undefined && surveyIndex !== null){
      const newSurvey = this.state.newSurveys[surveyIndex];
      console.log('surveys to add:', newSurvey);
      dispatch(operations.createSurveys(surveyTemplateId, teacherId, [newSurvey], onSuccess));
      surveys.splice(surveyIndex, 1);
      this.setState({numNewSurveys: numSurveys-1, newSurveys: surveys})
    } else {
      const numSurveys = this.state.numNewSurveys;
      console.log('surveys to add:', surveys);
      dispatch(operations.createSurveys(surveyTemplateId, teacherId, surveys, onSuccess))
      this.setState({numNewSurveys: 0, newSurveys: []})
    }
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
        <SurveyDataInput numNewSurveys={this.state.numNewSurveys} surveyQuestions={this.props.surveyQuestions}
        onUpdateNewSurveys={this.handleUpdateNewSurveys}
        onSubmitSurveys={this.handleSubmitSurveys}/>
      </div>
    )
  }
}

export default connect()(CreateSurveyData);
