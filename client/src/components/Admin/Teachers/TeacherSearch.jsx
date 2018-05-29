import React from 'react'

export default function TeacherSearch(props){

  let _school, _name

  function handleFormSubmit(event){
    event.preventDefault();
    if (_school.value === '-all-') _school.value = null;
    props.onTeacherSearch(_school.value, _name.value)
  }

  return(
    <div>
      <div>
        <form onSubmit={handleFormSubmit} placeholder="">
          <div>
            <label>School: </label>
            <select ref={input => _school = input}>
                <option key="defaultNull" value={null}>-all-</option>
              {props.schools.map(school =>
                <option key={school.school} value={school.school}>{school.school}</option>
              )}
            </select>
          </div>
          <div>
            <label>Teacher Name:</label>
            <input type="text" ref={input => _name = input}></input>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  )
}
