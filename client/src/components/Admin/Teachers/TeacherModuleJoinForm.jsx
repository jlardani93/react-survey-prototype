import React from 'react'

export default function TeacherModuleJoinForm(props){

  let _module

  function handleFormSubmission(e){
    e.preventDefault()
    if (_module.value) {
      props.onModuleSelection(_module.value);
    } else {
      alert('please select a value')
    }
  }

  return(
    <div>
      <form onSubmit={handleFormSubmission}>
        <select ref={input => _module = input}>
          <option value='' disabled selected hidden>Select module to add to teacher</option>
          {props.modules.map(module =>
            <option key={module.id} value={module.id}>{module.title}</option>
          )}
        </select>
        <button type="submit">Add Module</button>
      </form>
    </div>
  )
}
