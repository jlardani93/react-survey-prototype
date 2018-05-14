import React from 'react'

export default class APITest extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: null
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDatabaseQuery = this.handleDatabaseQuery.bind(this);
  }

  handleButtonClick(){
    const promise = new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', '/api/json', true);
      req.onload = () => resolve(req.response);
      req.send(null);
    })

    promise.then(res => this.setState({message: JSON.parse(res).body.message}));

    // fetch('/api/json')
    // .then(res => res.json())
    // .then(json => this.setState({message: json.body.message}))

  }

  handleDatabaseQuery(){
    const promise = new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', '/api/database', true);
      req.onload = () => resolve(req.response);
      req.send(null);
    })
    promise.then(res => console.log("Database Response", JSON.parse(res)));
  }

  render(){

    const message = this.state.message || "Click button to see a secret message!";

    return(
      <div>
        <button onClick={this.handleButtonClick}>Click Me!</button>
        <p>{message}</p>
        <button onClick={this.handleDatabaseQuery}>Query Database!</button>
      </div>
    )
  }
}
