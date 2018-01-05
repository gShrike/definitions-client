import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CategoriesList from './components/categories/List'
import TermsList from './components/terms/List'
import QuestionsList from './components/questions/List'

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <div>
            <Route path="/" component={Navbar} />
            <Route exact path="/categories" component={CategoriesList} />
            <Route exact path="/terms" component={TermsList} />
            <Route exact path="/questions" component={QuestionsList} />
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
