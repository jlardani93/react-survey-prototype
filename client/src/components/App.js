import React, { Component } from 'react';
import { Switch, Route, withRouter, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import APITest from './APITest'

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
          <Route exact path='/' component={APITest} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect()(App));
