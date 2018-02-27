import React from 'react'
import { Link } from 'react-router-dom'
import DataStore from './DataStore'
import SearchBox from '../SearchBox'
import Loading from '../Loading'
import Search from '../search/index'

class List extends React.Component {

  state = {
    data: [],
    error: null,
    loading: true,
    query: null
  }

  componentDidMount() {
    DataStore.getAll()
      .then(data => this.setState({ data, loading: false }))
      .catch( error => this.setState({ error }) )
  }

  onSearch = (q) => {
    const query = q || null
    this.setState({ query })
  }

  renderErrorMessage = () => {
    const { error } = this.state

    if (error && error.message) {
      return <span className="help is-danger is-preformatted">Error: {error.message}</span>
    }

    return null
  }

  render() {
    const { data, loading, query } = this.state
    const loadingIcon = !loading || <Loading className="questions-button" />

    const engine = new Search.Helper(data, { keys: ['title'] })
    const filteredData = query ? engine.search(query) : data

    return (
      <section className="section questions-marker">
        <SearchBox type="Questions" onChange={this.onSearch} />
        <h1 className="title">Questions</h1>
        <h2 className="subtitle">{filteredData.length} {filteredData.length === 1 ? DataStore.name : DataStore.namePlural}</h2>

        <div className="buttons">
          {loadingIcon}
          {filteredData.map(item => {
            return (
              <Link key={item.id} to={DataStore.getClientUrl(`/${item.id}`)} className="button is-medium questions-button">{item.title}</Link>
            )
          })}
        </div>
      </section>
    )
  }
}

export default List
