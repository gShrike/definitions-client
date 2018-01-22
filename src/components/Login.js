/* global Cookies */
import React from 'react'

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
    const defaultErrorHandler = error => this.setState({ error, loggedIn: false, loading: false })

    checkLoginStatus().then(data => {
      console.log(data)
      this.setState({
        loading: false,
        loggedIn: !!data.success
      })
    }).catch(defaultErrorHandler)

    window.addEventListener('focus', () => {
      if (!this.state.loggedIn) {
        return
      }

      checkLoginStatus().then(data => {
        console.log(data)
        this.setState({
          loading: false,
          loggedIn: !!data.success
        })
      }).catch(defaultErrorHandler)
    })
  }

  onClick = () => {
    if (this.state.loggedIn) {
      if (window.confirm(`This will log you out`)) {
        Cookies.remove(`gToken`)
        this.setState({
          loggedIn: false
        })
      }
      return
    }

    window.location.href = `${getDomain()}/auth/login`
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

function checkLoginStatus() {
  return fetch(`${getDomain()}/auth/validate`, {
    headers: {
      'Authorization': `Bearer ${Cookies.get('gToken')}`
    }
  }).then(res => {
    return res.json().then(data => {
      if (res.ok) {
        return data
      }

      throw new Error(data.message)
    })
  })
}

function getDomain() {
  return (/localhost/.test(window.location.hostname) ? `http://localhost:3001` : `https://galvanize-definitions-api.herokuapp.com`)
}

export default Login
