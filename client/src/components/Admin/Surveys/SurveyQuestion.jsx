import React from 'react'

export default function SurveyQuestion(props){
  let _question = null
  let _questionType = null

  const handleFormSubmit = function(event){
    event.preventDefault();
    const newQuestion = {
      question: _question.value,
      questionType: _questionType.value
    }
    props.onAddQuestion(newQuestion);
    _question.value = '';
    _questionType.value = '';
  }

  return(
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Survey Question:</label>
          <input type="text" ref={ input => _question = input} />
        </div>
        <div>
          <label>Survey Type:</label>
          <select ref={ input => _questionType = input}>
            <option value="0">Score from 1 through 5</option>
            <option value="1">Text Response</option>
          </select>
        </div>
        <button type="submit">Add Question</button>
      </form>
    </div>
  )
}
