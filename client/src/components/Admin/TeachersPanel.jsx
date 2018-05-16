import React from 'react'
import TeacherCreate from './TeacherCreate'

class Teachers extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showTeacherCreate: false
    }
    this.handleAddTeacherButtonClick = this.handleAddTeacherButtonClick.bind(this);
  }

  handleAddTeacherButtonClick(){
    this.setState({showTeacherCreate: true})
  }

  render(){
    return(
      <div>
        <p>This is the Teachers component</p>
        <button type="button" onClick={this.handleAddTeacherButtonClick}>Add Teacher</button>
        {(this.state.showTeacherCreate) ? <TeacherCreate /> : <span></span>} {/*SHOW TEACHER CREATE COMPONENT ON BUTTON CLICK*/}
      </div>
    )
  }
}

export default Teachers;
