import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions/index'
import AdminNavbar from './AdminNavbar'
import TeachersPanel from './TeachersPanel'

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
