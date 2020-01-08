import React from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: `Topics`, uri: `topics` },
  { name: `Terms`, uri: `terms` },
  { name: `Questions`, uri: `questions` }
]

class Navbar extends React.Component {

  static defaultProps = {
    baseUrl: ''
  }

  render() {
    const { baseUrl, book } = this.props

    return (
      <ul className="nav-list">
        {navLinks.map(link => {
          const activeClass = (new RegExp(`^${link.uri}`)).test(window.location.pathname) ? `is-active` : ``

          return <li key={link.name} className={activeClass}>
            <Link to={baseUrl + '/' + link.uri} className={`nav-list-link ${link.name.toLowerCase()}-marker`}>
              <span className="tag is-rounded is-dark">{book[link.uri].length}</span>
              {link.name}
            </Link>
            <Link className="nav-list-link-add admin-only" to={baseUrl + '/' + link.uri + '/new'} title={`Add new ${link.name}`}>
              <span className="icon"><i className="fa fa-plus"></i></span>
            </Link>
          </li>
        })}
      </ul>
    )
  }
}

export default Navbar
