import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Books from './components/books/index'
import Login from './components/Login'
import Auth from './components/Auth'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/auth/callback" component={Auth} />
          <Route path="/" component={Login} />
          <Route exact path={`/${Books.DataStore.uri}`} component={Books.List} />
          <Route exact path={`/${Books.DataStore.uri}/new`} component={Books.Form} />
          <Route exact path={`/${Books.DataStore.uri}/:bookId/:any?/:any?`} component={Books.Single} />
        </Router>
      </div>
    );
  }
}

export default App;
