import React from 'react'
import { connect } from 'react-redux'
import AdminNavbar from './AdminNavbar'
import TeachersPanel from './TeachersPanel'

class Admin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      shownPanel: null
    }
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleNavigate(panelName){
    this.setState({shownPanel: panelName});
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
        <p>This is the Admin component</p>
        {currentPanel}
      </div>
    )
  }
}

export default connect()(Admin);
