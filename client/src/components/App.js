import React, { Component } from 'react';
import { Switch, Route, withRouter, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import APITest from './APITest'
import Admin from './Admin/Admin'
import Teacher from './Teacher'
import TeacherRegister from './Teacher/TeacherRegister'
import Student from './Student'
import Home from './Home'

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.response} | Hello from React
        </p>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/ApiTest' component={APITest} />
          <Route path='/Admin' component={Admin}/>
          <Route exact path='/Teacher' component={Teacher} />
          <Route exact path='/Teacher/Register' component={TeacherRegister} />
          <Route path='/Student' component={Student} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
