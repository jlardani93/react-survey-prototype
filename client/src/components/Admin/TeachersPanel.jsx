import React from 'react'
import TeacherCreate from './TeacherCreate'

class Teachers extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showTeacherCreate: false,
      showTeachers: false
    }
    this.handleAddTeacherButtonClick = this.handleAddTeacherButtonClick.bind(this);
    this.handleShowTeachersButtonClick = this.handleShowTeachersButtonClick.bind(this);
    this.handleSuccessfulTeacherCreation = this.handleSuccessfulTeacherCreation.bind(this); 
  }

  handleAddTeacherButtonClick(){
    this.setState({showTeacherCreate: true});
  }

  handleShowTeachersButtonClick(){
    this.setState({showTeachers: true});
  }

  handleSuccessfulTeacherCreation(){
    this.setState({showTeacherCreate: false});
  }

  render(){
    return(
      <div>
        <p>This is the Teachers component</p>
        <button type="button" onClick={this.handleAddTeacherButtonClick}>Add Teacher</button>
        {(this.state.showTeacherCreate)
          ? <TeacherCreate onSuccessfulTeacherCreation={this.handleSuccessfulTeacherCreation}/> : <span></span>} {/*SHOW TEACHER CREATE COMPONENT ON BUTTON CLICK*/}
        <button type="button" onClick={this.handleShowTeachersButtonClick}>View Teachers</button>
        {(this.state.showTeachers)
          ? <Teachers /> : <span></span>} {/*SHOW TEACHERS IN SYSTEM*/}
      </div>
    )
  }
}

export default Teachers;
