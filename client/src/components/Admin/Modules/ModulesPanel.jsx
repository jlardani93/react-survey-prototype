import React from 'react'
import { connect } from 'react-redux'
import ModuleCreate from './ModuleCreate'
import * as operations from './../../../operations'

class ModulesPanel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showCreateNewModule: false,
      surveyTemplates: null
    }
    this.handleShowCreateNewModule = this.handleShowCreateNewModule.bind(this);
  }

  handleShowCreateNewModule(){
    this.setState({showCreateNewModule: true})
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
        <p>This is the ModulesPanel Component</p>
        <button onClick={this.handleShowCreateNewModule}>Create New Module</button>
        {(this.state.showCreateNewModule) ? <ModuleCreate surveys={this.state.surveyTemplates}/> : <span></span>}
      </div>
    )
  }
}

export default connect()(ModulesPanel);
