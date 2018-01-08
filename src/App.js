import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Subnav from './components/Subnav'
import CategoriesList from './components/categories/List'
import CategoriesForm from './components/categories/Form'
import CategoriesSingle from './components/categories/Single'
import TermsList from './components/terms/List'
import TermsForm from './components/terms/Form'
import TermsSingle from './components/terms/Single'
import QuestionsList from './components/questions/List'

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <div>
            <Route path="/" component={Navbar} />
            <Route path="/:groupName" component={({ match }) => <Subnav groupName={match.params.groupName} />} />
            <Switch>
              <Route exact path="/categories" component={CategoriesList} />
              <Route exact path="/categories/new" component={CategoriesForm} />
              <Route exact path="/categories/:id" component={CategoriesSingle} />
              <Route exact path="/terms" component={TermsList} />
              <Route exact path="/terms/new" component={TermsForm} />
              <Route exact path="/terms/:id" component={TermsSingle} />
              <Route exact path="/questions" component={QuestionsList} />
            </Switch>
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
