import React from 'react'
import { connect } from 'react-redux'
import ModuleSearch from './ModuleSearch'
import SchoolSearch from './SchoolSearch'
import TeacherSearch from './TeacherSearch'
import * as operations from './../../../operations'

class DataPanel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      schools: [],
      teachers: [],
      modules: [],
      selectedSchoolName: null,
      selectedTeacherId: null,
      selectedModuleId: null
    }
    this.handleSchoolSelection = this.handleSchoolSelection.bind(this);
    this.handleTeacherSelection = this.handleTeacherSelection.bind(this);
  }

  handleSchoolSelection(schoolName){
    const { dispatch } = this.props;
    const onGetTeachers = (function(response){
      this.setState({teachers: response})
      console.log(response);
    }).bind(this);
    this.setState({selectedSchoolName: schoolName});
    dispatch(operations.getTeachers(onGetTeachers, schoolName));
  }

  handleTeacherSelection(teacherId){
    const { dispatch } = this.props;
    const onGetModules = (function(response){
      const newModules = response.map(row => ({id: row.module_id, title: row.title}))
      this.setState({modules: newModules})
    }).bind(this);
    this.setState({selectedTeacherId: teacherId});
    dispatch(operations.getTeacher(onGetModules, teacherId));
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const getSchoolsCallback = (function(response){
      this.setState({schools: response})
    }).bind(this);
    dispatch(operations.getSchools(getSchoolsCallback));
  }

  render(){
    return(
      <div>
        <p>This is the DataPanel component</p>
        <div>
          <SchoolSearch schools={this.state.schools} onSchoolSelection={this.handleSchoolSelection}/>
          {(this.state.teachers.length) ? <TeacherSearch teachers={this.state.teachers} onTeacherSelection={this.handleTeacherSelection}/> : <span></span>}
          {(this.state.modules.length) ? <ModuleSearch modules={this.state.modules}/> : <span></span>}
        </div>
      </div>
    )
  }
}

export default connect()(DataPanel);
