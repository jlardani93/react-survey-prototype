import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../../operations'
import AdminNavbar from './AdminNavbar'
import TeachersPanel from './Teachers/TeachersPanel'
import SurveyTemplatesPanel from './Surveys/SurveysPanel'
import ModulesPanel from './Modules/ModulesPanel'
import DataPanel from './Data'

class Admin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      shownPanel: null
    }
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleSendEmail = this.handleSendEmail.bind(this);
  }

  handleNavigate(panelName){
    this.setState({shownPanel: panelName});
  }

  handleSendEmail(){
    const { dispatch } = this.props;
    dispatch(actions.sendEmail());
  }

  render(){

    const currentPanel = (() => {
      switch(this.state.shownPanel){
        case 'teachers':
          return <TeachersPanel />
        case 'survey templates':
          return <SurveyTemplatesPanel />
        case 'modules':
          return <ModulesPanel />
        case 'data':
          return <DataPanel />
        default:
          return null;
      }
    })();

    console.log(this.state);
    return(
      <div>
        <AdminNavbar onNavigate={this.handleNavigate}/>
        <button onClick={this.handleSendEmail}>Send e-mail</button>
        <p>This is the Admin component</p>
        {currentPanel}
      </div>
    )
  }
}

export default connect()(Admin);
