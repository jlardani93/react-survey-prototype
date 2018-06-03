import React from 'react'
import { connect } from 'react-redux'
import TeacherCreate from './TeacherCreate'
import TeachersList from './TeachersList'
import TeacherSearch from './TeacherSearch'
import TeacherModuleJoinForm from './TeacherModuleJoinForm'
import * as operations from './../../../operations'

class TeachersPanel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showTeacherCreate: false,
      showTeachers: false,
      showTeacherModuleJoinForm: false,
      teachers: [],
      selectedTeacherId: null,
      schools: [],
      modules: []
    }
    this.handleAddTeacherButtonClick = this.handleAddTeacherButtonClick.bind(this);
    this.handleTeacherSearch = this.handleTeacherSearch.bind(this);
    this.handleSuccessfulTeacherCreation = this.handleSuccessfulTeacherCreation.bind(this);
    this.handleOpenAddModuleForm = this.handleOpenAddModuleForm.bind(this);
    this.handleModuleSelection = this.handleModuleSelection.bind(this);
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
    dispatch(operations.getTeachers(getTeachersCallback, school, name))
    this.setState({showTeachers: true});
  }

  handleOpenAddModuleForm(teacherId){
    this.setState({showTeacherModuleJoinForm: true, selectedTeacherId: teacherId});
    console.log("Selected teacher Id: ", teacherId);
  }

  handleModuleSelection(moduleId){
    const { dispatch } = this.props;
    const onSuccess = (function(response){
      if (response.rowsAffected !== 0){
        alert('module was added successfully');
        this.setState({selectedTeacherId: null, showTeacherModuleJoinForm: false})
      } else {
        alert('module was not added successfully');
      }
    }).bind(this);
    dispatch(operations.addModule(moduleId, this.state.selectedTeacherId, onSuccess));
  }

  handleSuccessfulTeacherCreation(){
    const { dispatch } = this.props;
    const getSchoolsCallback = (function(response){
      this.setState({schools: response})
    }).bind(this);
    this.setState({showTeacherCreate: false});
    dispatch(operations.getSchools(getSchoolsCallback));
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const onGetSchools = (function(response){
      this.setState({schools: response})
    }).bind(this);
    const onGetModules = (function(response){
      this.setState({modules: response})
    }).bind(this);
    dispatch(operations.getSchools(onGetSchools));
    dispatch(operations.getModules(onGetModules));
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
          ? <TeachersList teachers={this.state.teachers} onOpenAddModuleForm={this.handleOpenAddModuleForm}/> : <span></span>} {/*SHOW TEACHERS IN SYSTEM*/}
        {(this.state.showTeacherModuleJoinForm)
          ? <TeacherModuleJoinForm modules={this.state.modules} onModuleSelection={this.handleModuleSelection}/> : <span></span>}
      </div>
    )
  }
}

export default connect()(TeachersPanel);
