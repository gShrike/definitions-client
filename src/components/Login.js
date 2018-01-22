import React from 'react'
import { Helper as AuthHelper } from './Auth'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      loggedIn: false,
      error: null
    }
  }

  componentDidMount() {
    const defaultLoginHandler = data => this.setState({ loading: false, loggedIn: !!data.success })
    const defaultErrorHandler = error => this.setState({ error, loggedIn: false, loading: false })

    window.addEventListener('focus', () => {
      if (!this.state.loggedIn) {
        return
      }

      AuthHelper.checkLoginStatus()
        .then(defaultLoginHandler)
        .catch(defaultErrorHandler)
    })

    if (AuthHelper.getCookie()) {
      AuthHelper.checkLoginStatus()
        .then(defaultLoginHandler)
        .catch(defaultErrorHandler)
    }
    else {
      this.setState({ loading: false })
    }
  }

  onClick = () => {
    if (this.state.loggedIn) {
      if (window.confirm(`This will log you out`)) {
        AuthHelper.removeCookie()
        this.setState({
          loggedIn: false
        })
        window.location.href = `/`
      }
      return
    }

    window.location.href = `${AuthHelper.getDomain()}/auth/login`
  }

  render() {
    const classNames = this.state.loading ? `is-loading` : ``
    const loggedInClass = this.state.loggedIn ? `is-logged-in` : ``
    const loginText = !this.state.loggedIn ? `Login with` : ``

    return (
      <div className={`login-screen ${loggedInClass}`}>
        <button onClick={this.onClick} className={`button is-outlined is-dark ${classNames}`}>
          {loginText}<i className="fa fa-github"></i>
        </button>
      </div>
    )
  }

}

export default Login
