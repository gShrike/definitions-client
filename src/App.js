import React, { Component } from 'react'
import './App.css'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Topics from './components/topics/index'
import Terms from './components/terms/index'
import Questions from './components/questions/index'
import Auth from './components/Auth'
import config from 'appConfig'

class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>{config.BOOK_NAME} - Studybook</title>
        </Helmet>
        <Router>
          <main className="columns is-gapless">
            <aside className="column is-one-fifth">
              <h1 className="app-title">{config.BOOK_ICON && <i className={`fa ${config.BOOK_ICON} app-icon`} />}{config.BOOK_NAME || 'Studybook'}</h1>
              <Route path="/" component={Navbar} />
              <Route path="/" component={Login} />
              <Route path="/auth/callback" component={Auth} />
            </aside>
            <section className="column">
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
            </section>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
