import React from 'react'
import { connect } from 'react-redux'
import TeacherCreate from './TeacherCreate'
import TeachersList from './TeachersList'
import TeacherSearch from './TeacherSearch'
import * as actions from './../../../actions'

class TeachersPanel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showTeacherCreate: false,
      showTeachers: false,
      teachers: [],
      schools: []
    }
    this.handleAddTeacherButtonClick = this.handleAddTeacherButtonClick.bind(this);
    this.handleTeacherSearch = this.handleTeacherSearch.bind(this);
    this.handleSuccessfulTeacherCreation = this.handleSuccessfulTeacherCreation.bind(this);
  }

  handleAddTeacherButtonClick(){
    this.setState({showTeacherCreate: true});
  }

  handleTeacherSearch(school, name){
    const { dispatch } = this.props;
    const getTeachersCallback = (function(response){
      console.log(response);
      this.setState({teachers: response})
    }).bind(this);
    dispatch(actions.getTeachers(getTeachersCallback, school, name))
    this.setState({showTeachers: true});
  }

  handleSuccessfulTeacherCreation(){
    const { dispatch } = this.props;
    const getSchoolsCallback = (function(response){
      this.setState({schools: response})
    }).bind(this);
    this.setState({showTeacherCreate: false});
    dispatch(actions.getSchools(getSchoolsCallback));
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const getSchoolsCallback = (function(response){
      this.setState({schools: response})
    }).bind(this);
    dispatch(actions.getSchools(getSchoolsCallback));
  }

  render(){
    console.log("TeacherPanelState: ", this.state);
    return(
      <div>
        <p>This is the Teachers component</p>
        <button type="button" onClick={this.handleAddTeacherButtonClick}>Add Teacher</button>
        {(this.state.showTeacherCreate)
          ? <TeacherCreate onSuccessfulTeacherCreation={this.handleSuccessfulTeacherCreation}/> : <span></span>} {/*SHOW TEACHER CREATE COMPONENT ON BUTTON CLICK*/}
        <button type="button" onClick={this.handleShowTeachersButtonClick}>View Teachers</button>
        <TeacherSearch schools={this.state.schools} onTeacherSearch={this.handleTeacherSearch}/>
        {(this.state.showTeachers)
          ? <TeachersList teachers={this.state.teachers}/> : <span></span>} {/*SHOW TEACHERS IN SYSTEM*/}
      </div>
    )
  }
}

export default connect()(TeachersPanel);
