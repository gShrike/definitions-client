import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Subnav from './components/Subnav'
import Topics from './components/topics/index'
import Terms from './components/terms/index'
import Questions from './components/questions/index'
import Auth from './components/Auth'

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <div>
            <Route path="/auth/callback" component={Auth} />
            <Route path="/" component={Navbar} />
            <Route path="/" component={Login} />
            <Route path="/:groupName" component={({ match }) => <Subnav groupName={match.params.groupName} />} />
            <Switch>
              <Route exact path={`/${Topics.DataStore.uri}`} component={Topics.List} />
              <Route exact path={`/${Topics.DataStore.uri}/new`} component={Topics.Form} />
              <Route exact path={`/${Topics.DataStore.uri}/:id`} component={Topics.Single} />

              <Route exact path={`/${Terms.DataStore.uri}`} component={Terms.List} />
              <Route exact path={`/${Terms.DataStore.uri}/new`} component={Terms.Form} />
              <Route exact path={`/${Terms.DataStore.uri}/:id`} component={Terms.Single} />

              <Route exact path={`/${Questions.DataStore.uri}`} component={Questions.List} />
              <Route exact path={`/${Questions.DataStore.uri}/new`} component={Questions.Form} />
              <Route exact path={`/${Questions.DataStore.uri}/:id`} component={Questions.Single} />
            </Switch>
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
