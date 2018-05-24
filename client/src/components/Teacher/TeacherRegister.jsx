import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions'

class TeacherRegister extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showRegistrationForm: false
    }
    this.handleConfirmationSubmission = this.handleConfirmationSubmission.bind(this)
  }

  _name
  _school
  _email

  handleConfirmationSubmission(event){

    event.preventDefault();

    const name = this._name.value.toLowerCase();
    const school = this._school.value.toLowerCase();
    const email = this._email.value.toLowerCase();
    const { dispatch } = this.props;

    const onTeacherFound = ((boolean, response) => {
      if (boolean && (name === response[0].name) && (school === response[0].school)) {
        console.log("entry found")
        this.setState({showRegistrationForm: true})
      } else {
        alert('There was no teacher found with the submitted information')
      }
    }).bind(this);

    dispatch(actions.onQueryResponse('teachers', 'email', email, onTeacherFound));
  }

  render(){

    const confirmationForm = (
      <div>
        <p>Complete the following to confirm that you have been invited to create a survey portal account</p>
        <form onSubmit={this.handleConfirmationSubmission}>
          <div>
            <label>Name:</label>
            <input type="text" ref={ input => this._name = input} />
          </div>
          <div>
            <label>School:</label>
            <input type="text" ref={ input => this._school = input} />
          </div>
          <div>
            <label>Email: </label>
            <input type="text" ref={ input => this._email = input} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )

    const registrationForm = (
      <div>
        <p>Complete the following to create a new user account on the survey platform</p>
        <form>
          <div>
            <label>Username:</label>
            <input type="text" ref={ input => this._username = input }/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" ref={ input => this._password = input }/>
          </div>
          <div>
            <label>Password Confirmation:</label>
            <input type="password" ref={ input => this._passwordConfirmation = input}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )

    return (
      <div>
        <style jsx>

        </style>
        {(this.state.showRegistrationForm) ? registrationForm : confirmationForm}
      </div>
    )
  }
}

export default connect()(TeacherRegister);
