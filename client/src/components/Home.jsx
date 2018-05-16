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
    //DEFINES CALLBACK FOR ACTIONS TO BE COMPLETED AFTER LOGIN ATTEMPT
    const loginCallback = (function(userObject){
      if (userObject[0]) {
        dispatch(actions.setUser(userObject[0]));
        //REROUTES USER TO APPROPRIATE PART OF SITE BASED UPON WHAT THE ROLE OF THE LOGGED-IN USER IS
        switch (this.props.role) {
          case 'admin':
            this.props.history.push('/admin');
            break;
          case 'teacher':
            this.props.history.push('/teacher');
            break;
          default:
            console.log('received irresolvable role: ', this.props.user);
        }
      } else {
        alert('The username and password you entered do not match any accounts on record');
        this._userName.value = '';
        this._password.value = '';
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
              <input ref={ element => this._userName = element} required />
            </div>
            <div>
              <label>Password: </label>
              <input type='password' ref={ element => this._password = element} required />
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

const mapStateToProps = state => {
  return {
    role: state.user.role
  }
}

export default connect(mapStateToProps)(Home)
