/* global Cookies */
import React from 'react'
import Loading from './Loading'

class Auth extends React.Component {

  componentDidMount() {
    const code = (new URL(window.location.href)).searchParams.get(`code`)

    if (!code) {
      throw new Error(`A 'code' is required`)
    }

    fetch('http://localhost:3001/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code
      })
    }).then(res => {
      res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw Error(`AHHHH`)
      }).then(github => {
        Cookies.set(`gToken`, github.access_token)
        window.location.replace(`/`)
      })
    })
  }

  render() {
    return (
      <Loading />
    )
  }

}

export default Auth
