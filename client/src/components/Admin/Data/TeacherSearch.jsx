import React from 'react'

export default function TeacherSearch(props){

  let _teacher

  function handleSelection(e){
    e.preventDefault();
    if (_teacher.value){
      props.onTeacherSelection(_teacher.value);
    } else {
      alert('please select a teacher');
    }
  }

  return(
    <div>
      <form onSubmit={handleSelection}>
        <select ref={select => _teacher = select}>
          <option value='' disabled selected hidden>Select a Teacher</option>
          {props.teachers.map(teacher=>
            <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
          )}
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  )
}
