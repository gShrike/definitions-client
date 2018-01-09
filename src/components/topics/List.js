import React from 'react'
import { Link } from 'react-router-dom'
import Store from './DataStore'
import SearchBox from '../SearchBox'

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

  onSearch = (q) => {
    Store.search(q).then(data => {
      this.setState({ data })
    })
  }

  render() {
    const { data } = this.state

    return (
      <section className="section">
        <SearchBox type={Store.namePlural} onChange={this.onSearch} />
        <h1 className="title">{Store.namePlural}</h1>
        <h2 className="subtitle">{data.length} {data.length === 1 ? Store.name : Store.namePlural}</h2>
        <hr/>
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
