import React from 'react'
import { connect } from 'react-redux'
import ModuleSearch from './ModuleSearch'
import SchoolSearch from './SchoolSearch'
import TeacherSearch from './TeacherSearch'
import SurveyTemplateSearch from './SurveyTemplateSearch'
import CreateSurveyData from './CreateSurveyData'
import * as operations from './../../../operations'

class DataPanel extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      schools: [],
      teachers: [],
      modules: [],
      surveyTemplates: [],
      surveyQuestions: [],
      completedSurveysData: {},
      selectedSchoolName: null,
      selectedTeacherId: null,
      selectedModuleId: null,
      selectedSurveyTemplate: null
    }
    this.handleSchoolSelection = this.handleSchoolSelection.bind(this);
    this.handleTeacherSelection = this.handleTeacherSelection.bind(this);
    this.handleModuleSelection = this.handleModuleSelection.bind(this);
    this.handleSurveyTemplateSelection = this.handleSurveyTemplateSelection.bind(this);
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

  handleModuleSelection(moduleId){
    console.log("handleModuleSelection arguments: ", moduleId);
    const { dispatch } = this.props;
    const onGetSurveyTemplates = (function(response){
      const newSurveyTemplates = response;
      this.setState({surveyTemplates: newSurveyTemplates})
    }).bind(this);
    this.setState({selectedModuleId: moduleId});
    dispatch(operations.getSurveyTemplates(onGetSurveyTemplates, moduleId));
  }

  handleSurveyTemplateSelection(surveyTemplateId){
    const { dispatch } = this.props;

    const getSurveyQuestionsCallback = (function(response){
      this.setState({surveyQuestions: response});
      console.log(response);
    }).bind(this);

    const getSurveyResponsesCallback = (function(response){
      this.setState({completedSurveysData: response});
      console.log(response);
    }).bind(this);

    dispatch(operations.getSurveyQuestions(surveyTemplateId, getSurveyQuestionsCallback));
    dispatch(operations.getSurveyResponses(this.state.selectedTeacherId, surveyTemplateId, getSurveyResponsesCallback));
    this.setState({selectedSurveyTemplate: surveyTemplateId});
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
          {(this.state.teachers.length) ?
            <TeacherSearch teachers={this.state.teachers} onTeacherSelection={this.handleTeacherSelection}/> : <span></span>}
          {(this.state.modules.length) ?
            <ModuleSearch modules={this.state.modules} onModuleSelection={this.handleModuleSelection}/> : <span></span>}
          {(this.state.surveyTemplates.length) ?
            <SurveyTemplateSearch surveyTemplates={this.state.surveyTemplates} onSurveyTemplateSelection = {this.handleSurveyTemplateSelection}/> : <span></span>}
          {(this.state.selectedSurveyTemplate) ?
            <CreateSurveyData surveyQuestions={this.state.surveyQuestions}
            surveyTemplateId={this.state.selectedSurveyTemplate}
            teacherId={this.state.selectedTeacherId}/> : <span></span>}
        </div>
      </div>
    )
  }
}

export default connect()(DataPanel);
