import React from 'react'
import { Link } from 'react-router-dom'
import DataStore from './DataStore'
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
    DataStore.getAll()
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
    DataStore.search(q).then(data => {
      this.setState({ data })
    })
  }

  render() {
    const { data } = this.state

    return (
      <section className="section topics-marker">
        <SearchBox type={DataStore.namePlural} onChange={this.onSearch} />
        <h1 className="title">{DataStore.namePlural}</h1>
        <h2 className="subtitle">{data.length} {data.length === 1 ? DataStore.name : DataStore.namePlural}</h2>

        <div className="buttons">
          {data.map(item => {
            return (
              <Link key={item.id}  to={DataStore.getClientUrl(`/${item.id}`)} className="button is-medium">{item.name}</Link>
            )
          })}
        </div>
        {this.renderErrorMessage()}
      </section>
    )
  }
}

export default List
