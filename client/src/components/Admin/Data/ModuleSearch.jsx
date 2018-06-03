import React from 'react'

export default function ModuleSearch(props){

  let _module

  function handleFormSubmission(e){
    e.preventDefault();
    console.log(_module.value); 
  }

  return(
    <div>
      <form onSubmit={handleFormSubmission}>
        <select ref={input => _module = input}>
          <option value='' disabled selected hidden>Select a Module</option>
          {props.modules.map(module =>
            <option key={module.id} value={module.id}>{module.title}</option>
          )}
        </select>
        <button type="submit">Select Module</button>
      </form>
    </div>
  )
}
