import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions'

class Home extends React.Component {

  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  _userName
  _password

  handleLogin(event){
    event.preventDefault();
    actions.login(this._userName.value, this._password.value)
    .then(response => console.log(response));
  }

  render(){
    return(
      <div>
        <p>This is the Home component</p>
        <div>
          <form id="loginForm" onSubmit={this.handleLogin}>
            <div>
              <label>UserName: </label>
              <input ref={ element => this._userName = element}></input>
            </div>
            <div>
              <label>Password: </label>
              <input type='password' ref={ element => this._password = element}></input>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <style jsx>

        </style>
      </div>
    )
  }
}

export default connect()(Home)
