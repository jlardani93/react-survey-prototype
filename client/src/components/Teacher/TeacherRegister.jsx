import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../../actions'

class TeacherRegister extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      showRegistrationForm: false,
      email: null,
      id: null
    }
    this.handleConfirmationSubmission = this.handleConfirmationSubmission.bind(this)
    this.handleNewUserSubmission = this.handleNewUserSubmission.bind(this)
  }

  _name
  _school
  _email
  _username
  _password
  _passwordConfirmation

  handleConfirmationSubmission(event){

    event.preventDefault();

    const name = this._name.value.toLowerCase();
    const school = this._school.value.toLowerCase();
    const email = this._email.value.toLowerCase();
    const { dispatch } = this.props;

    const onTeacherFound = ((boolean, response) => { //callback to be executed after dispatched action
      if (boolean && (0 === response[0].user_id) && (name === response[0].name) && (school === response[0].school)) {
        console.log("entry found")
        this.setState({showRegistrationForm: true, email: email, id: response[0].id})
        console.log("this component's state: ", this.state);
      } else {
        alert('There was no available teacher slot with the submitted information')
      }
    }).bind(this);

    dispatch(actions.onQueryResponse('teachers', 'email', email, onTeacherFound));
  }

  handleNewUserSubmission(event){

    event.preventDefault();

    const password = this._password.value;
    const passwordConfirmation = this._passwordConfirmation.value;
    const username = this._username.value;
    const email = this.state.email;
    const id = this.state.id;
    const { dispatch } = this.props;

    const onUserAdded = ((response) => { //callback to be executed after dispatched action
      if (response.affectedRows > 0){
        alert("user was added successfully");
      } else {
        alert("user was not added successfully");
      }
    }).bind(this);

    if (password === passwordConfirmation){
      dispatch(actions.createUser(username, password, email, 'teacher', onUserAdded, id))
    } else {
      alert("The passwords entered do not match");
    }
  }

  render(){

    const confirmationForm = ( //form initially shown to confirm that teacher entry exists
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

    const registrationForm = ( //form used to create new teacher user for survey platform
      <div>
        <p>Complete the following to create a new user account on the survey platform</p>
        <form onSubmit={this.handleNewUserSubmission}>
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
