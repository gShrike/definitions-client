import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Subnav from './components/Subnav'
import TermsList from './components/terms/List'
import TermsForm from './components/terms/Form'
import TermsSingle from './components/terms/Single'
import QuestionsList from './components/questions/List'
import QuestionsForm from './components/questions/Form'
import QuestionsSingle from './components/questions/Single'
import Topics from './components/topics/index'

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <div>
            <Route path="/" component={Navbar} />
            <Route path="/:groupName" component={({ match }) => <Subnav groupName={match.params.groupName} />} />
            <Switch>
              <Route exact path={`/${Topics.Data.uri}`} component={Topics.List} />
              <Route exact path={`/${Topics.Data.uri}/new`} component={Topics.Form} />
              <Route exact path={`/${Topics.Data.uri}/:id`} component={Topics.Single} />
              <Route exact path="/terms" component={TermsList} />
              <Route exact path="/terms/new" component={TermsForm} />
              <Route exact path="/terms/:id" component={TermsSingle} />
              <Route exact path="/questions" component={QuestionsList} />
              <Route exact path="/questions/new" component={QuestionsForm} />
              <Route exact path="/questions/:id" component={QuestionsSingle} />
            </Switch>
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
