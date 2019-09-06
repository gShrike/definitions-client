/* global Cookies */
import React from 'react'

class AuthHelper {

  cookieName = `gToken`

  checkLoginStatus() {
    return fetch(`${this.getDomain()}/auth/validate`, {
      headers: {
        'Authorization': `Bearer ${this.getCookie()}`
      }
    }).then(res => {
      return res.json().then(data => {
        this.toggleLoginStatus(data)

        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  toggleLoginStatus(user) {
    const { body } = document

    if (user.success && user.member) {
      body.classList.add(`is-admin`)
    }
    else {
      body.classList.remove(`is-admin`)
    }
  }

  getCookie() {
    return Cookies.get(this.cookieName)
  }

  setCookie(value) {
    Cookies.set(this.cookieName, value)
  }

  removeCookie() {
    Cookies.remove(this.cookieName)
  }

  getDomain() {
    return (/localhost/.test(window.location.hostname) ? `http://localhost:3001` : `https://dev-terms-api.herokuapp.com`)
  }
}

const Helper = new AuthHelper()

class Auth extends React.Component {

  componentDidMount() {
    const code = (new URL(window.location.href)).searchParams.get(`code`)

    if (!code) {
      throw new Error(`A 'code' is required`)
    }

    fetch(`${Helper.getDomain()}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    }).then(res => {
      res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      }).then(github => {
        Helper.setCookie(github.access_token)
        window.location.replace(`/`)
      })
    })
  }

  render() {
    return (
      null
    )
  }

}

export default Auth
export { Helper }
