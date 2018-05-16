import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions'

function TeacherCreate(props){

  let _schoolName, _teacherName, _teacherEmail;

  function handleCreateTeacher(event) {
    event.preventDefault();
    const { dispatch } = props;
    const createTeacherCallback = (response) => {
      if (response){
        alert("Teacher added successfully");
        props.onSuccessfulTeacherCreation();
      }
    }
    const onDatabaseDoesNotContainEntry = (boolean) => {
      if (boolean === true){
        dispatch(actions.createTeacher(_schoolName.value, _teacherName.value, _teacherEmail.value, createTeacherCallback))
      } else {
        alert("A teacher with that e-mail already exists in the system");
      }
    }
    dispatch(actions.onQueryResponse(false, 'teachers', 'email', _teacherEmail.value, onDatabaseDoesNotContainEntry))
  }
  return(
    <div>
      <form onSubmit={handleCreateTeacher}>
        <div>
          <label>School Name:</label>
          <input type="text" ref={input => _schoolName = input} required/>
        </div>
        <div>
          <label>Teacher Name:</label>
          <input type="text" ref={input => _teacherName = input} required/>
        </div>
        <div>
          <label>Teacher email:</label>
          <input type="email" ref={input => _teacherEmail = input} required/>
        </div>
        <button type="submit">Create New Teacher</button>
      </form>

    </div>
  )
}

export default connect()(TeacherCreate);
