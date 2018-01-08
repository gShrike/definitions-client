import React from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: `List`, uri: `/` },
  { name: `New`, uri: `/new` }
]

class Subnav extends React.Component {

  render() {
    const { groupName } = this.props

    return (
      <nav className="navbar is-light">
        <div className="tabs is-centered">
          <ul>
            {navLinks.map(link => {
              const activeClass = (new RegExp(`${link.uri}$`)).test(window.location.pathname) ? `is-active` : ``

              return <li key={link.name} className={activeClass}><Link to={`/${groupName}${link.uri}`}>{link.name}</Link></li>
            })}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Subnav