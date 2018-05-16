import React from 'react'

export default function TeacherCreate(){

  let _schoolName, _teacherName, _teacherEmail;

  function handleCreateTeacher(event) {
    event.preventDefault();
    console.log(_schoolName.value, _teacherName.value, _teacherEmail.value);
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
