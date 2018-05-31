import React from 'react'
import { connect } from 'react-redux'
import SurveyCreate from './SurveyCreate'
import SurveyTemplates from './SurveyTemplates'
import SurveyInfo from './SurveyInfo'
import * as operations from './../../../operations'

class SurveysPanel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showNewSurvey: false,
      surveyTemplates: [],
      selectedSurveyQuestions: null
    }
    this.handleShowNewSurvey = this.handleShowNewSurvey.bind(this);
    this.handleSelectSurvey = this.handleSelectSurvey.bind(this);
  }

  handleShowNewSurvey(){
    this.setState({showNewSurvey: true})
  }

  handleSelectSurvey(surveyTemplateId){
    const { dispatch } = this.props;
    const onGetSurveyQuestions = (surveyQuestions => {
      console.log("Callback received the following surveyQuestions: ", surveyQuestions);
      this.setState({selectedSurveyQuestions: surveyQuestions})
    }).bind(this);
    dispatch(operations.getSurveyQuestions(surveyTemplateId, onGetSurveyQuestions));
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const onGetSurveyTemplates = (surveyTemplates) => {
      this.setState({surveyTemplates: surveyTemplates})
    }
    dispatch(operations.getSurveyTemplates(onGetSurveyTemplates));
  }



  render(){
    return(
      <div>
        <p>This is the SurveysPanel Component</p>
        <button onClick={this.handleShowNewSurvey}>Create a new survey</button>
        {/*Show surveys*/}
        {/*Create survey*/}
        {/*Modify surveys?*/}
        {(this.state.showNewSurvey) ? <SurveyCreate /> : <span></span>}
        <SurveyTemplates titles={this.state.surveyTemplates} onSelectSurvey={this.handleSelectSurvey} />
        {(this.state.selectedSurveyQuestions) ? <SurveyInfo surveyQuestions={this.state.selectedSurveyQuestions} /> : <span></span>}
      </div>
    )
  }
}

export default connect()(SurveysPanel);
