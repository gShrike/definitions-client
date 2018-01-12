import React from 'react'
import { Link } from 'react-router-dom'
import DataStore from './DataStore'
import SearchBox from '../SearchBox'
import Loading from '../Loading'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    DataStore.getAll()
      .then(data => this.setState({ data, loading: false }))
      .catch( error => this.setState({ error }) )
  }

  onSearch = (q) => {
    DataStore.search(q)
      .then(data => this.setState({ data }))
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
    const { data, loading } = this.state
    const loadingIcon = !loading || <Loading className="questions-button" />

    return (
      <section className="section questions-marker">
        <SearchBox type="Questions" onChange={this.onSearch} />
        <h1 className="title">Questions</h1>
        <h2 className="subtitle">{data.length} {data.length === 1 ? DataStore.name : DataStore.namePlural}</h2>

        <ul>
          {data.map(item => {
            return (
              <li key={item.id}>
                <Link to={DataStore.getClientUrl(`/${item.id}`)}>{item.title}</Link>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default List
