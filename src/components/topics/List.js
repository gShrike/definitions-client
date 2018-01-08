import React from 'react'
import { Link } from 'react-router-dom'
import Store from './DataStore'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      error: null
    }
  }

  componentDidMount() {
    Store.getAll()
      .then( data => this.setState({ data }) )
      .catch( error => this.setState({ error }) )
  }

  renderErrorMessage = () => {
    const { error } = this.state

    if (error && error.message) {
      return <span className="help is-danger is-preformatted">Error: {error.message}</span>
    }

    return null
  }

  render() {
    const { data } = this.state

    return (
      <section className="section">
        <h1 className="title">{Store.namePlural}</h1>
        <h2 className="subtitle">{data.length} {Store.namePlural}</h2>
        <ul>
          {data.map(item => {
            return (
              <li key={item.id}>
                <Link to={Store.getClientUrl(`/${item.id}`)}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
        {this.renderErrorMessage()}
      </section>
    )
  }
}

export default List
