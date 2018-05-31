import React from 'react'

export default function SurveyTemplates(props){
  return(
    <div>
      <select>
      {props.titles.map( title =>
        <option key={title.id} value={title.id}>{title.title}</option>
      )}
      </select>
    </div>
  )
}
