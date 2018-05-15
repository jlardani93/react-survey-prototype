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
    const { dispatch } = this.props;
    event.preventDefault();
    const loginCallback = (function(userObject){
      if (userObject[0]) {
        dispatch(actions.setUser(userObject[0]));
        console.log("just set user");
      } else {
        alert('false');
      }
    }).bind(this)
    dispatch(actions.login(this._userName.value, this._password.value, loginCallback)) //pass callback to handle ui functionality with returns
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
