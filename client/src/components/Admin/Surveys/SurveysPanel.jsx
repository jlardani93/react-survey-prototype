import React from 'react'
import { connect } from 'react-redux'
import SurveyCreate from './SurveyCreate'
import SurveyTemplates from './SurveyTemplates'
import * as operations from './../../../operations'

class SurveysPanel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showNewSurvey: false,
      surveyTemplates: []
    }
    this.handleShowNewSurvey = this.handleShowNewSurvey.bind(this);
  }

  handleShowNewSurvey(){
    this.setState({showNewSurvey: true})
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
        <SurveyTemplates titles={this.state.surveyTemplates} />
      </div>
    )
  }
}

export default connect()(SurveysPanel);
