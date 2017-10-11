import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Single from './components/Single';
import List from './components/List'; // import Header from 'header.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Definitions...Let us define you ..you</h2>
        </div>

        <Router>
          <div>
            <Route exact path="/" component={List} />
            <Route exact path="/terms/:id" component={Single} />
          </div>
        </Router>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
