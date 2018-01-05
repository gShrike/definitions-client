import React from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: `Terms`, uri: `/terms` },
  { name: `Categories`, uri: `/categories` },
  { name: `Questions`, uri: `/questions` },

]

class Navbar extends React.Component {

  render() {
    console.log(this.props.match)
    return (
      <nav className="navbar is-light">
        <div className="tabs is-centered is-medium">
          <ul>
            {navLinks.map(link => {
              const activeClass = (new RegExp(`^${link.uri}`)).test(window.location.pathname) ? `is-active` : ``

              return <li key={link.name} className={activeClass}><Link to={link.uri}>{link.name}</Link></li>
            })}
          </ul>
        </div>

        <div className="navbar-start">
          {/*

          <a className="navbar-item" href="/categories">
            Categories
          </a>
          <a className="navbar-item" href="/questions">
            Questions
          </a> */}
        </div>
      </nav>
    )
  }
}

export default Navbar
