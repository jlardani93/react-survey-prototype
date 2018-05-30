import React from 'react'
import { connect } from 'react-redux'
import SurveyCreate from './SurveyCreate.jsx'

class SurveysPanel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showNewSurvey: false
    }
    this.handleShowNewSurvey = this.handleShowNewSurvey.bind(this);
  }

  handleShowNewSurvey(){
    this.setState({showNewSurvey: true})
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
      </div>
    )
  }
}

export default connect()(SurveysPanel);
