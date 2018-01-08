import React from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: `Topics`, uri: `/topics/` },
  { name: `Terms`, uri: `/terms/` },
  { name: `Questions`, uri: `/questions/` },

]

class Navbar extends React.Component {

  render() {
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
      </nav>
    )
  }
}

export default Navbar
