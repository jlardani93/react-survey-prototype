import React from 'react'

export default function SchoolSearch(props){
  let _school

  function handleFormSubmit(event){
    event.preventDefault();
    if (_school.value){
      props.onSchoolSelection(_school.value);
    } else {
      alert('please select a school');
    }
  }

  return(
    <div>
      <div>
        <form onSubmit={handleFormSubmit} placeholder="">
          <div>
            <label>School: </label>
            <select ref={input => _school = input}>
                <option value='' disabled selected hidden>Select a School</option>
              {props.schools.map(school =>
                <option key={school.school} value={school.school}>{school.school}</option>
              )}
            </select>
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  )
}
