import React from 'react'
import { Link } from 'react-router-dom'
import DataStore from './DataStore'
import SearchBox from '../SearchBox'
import Loading from '../Loading'
import Books from '../books/index'
import Search from '../search/index'
import utils from 'utils'

class List extends React.Component {

  state = {
    data: Books.DataStore.getCurrentBook().topics.sort(utils.sortByName),
    error: null,
    loading: false,
    query: null
  }

  renderErrorMessage = () => {
    const { error } = this.state

    if (error && error.message) {
      return <span className="help is-danger is-preformatted">Error: {error.message}</span>
    }

    return null
  }

  onSearch = (q) => {
    const query = q || null
    this.setState({ query })
  }

  render() {
    const { data, loading, query } = this.state
    const loadingIcon = !loading || <Loading className="topics-button" />

    const engine = new Search.Helper(data, { keys: ['name'] })
    const filteredData = query ? engine.search(query) : data

    return (
      <section className="section topics-marker">
        <SearchBox type={DataStore.namePlural} onChange={this.onSearch} />
        <h1 className="title">{DataStore.namePlural}</h1>
        <h2 className="subtitle">{filteredData.length} {filteredData.length === 1 ? DataStore.name : DataStore.namePlural}</h2>

        <div className="buttons">
          {loadingIcon}
          {filteredData.map(item => {
            return (
              <Link key={item.id}  to={DataStore.getClientUrl(`/${item.id}`)} className="button is-medium topics-button is-centered">{utils.codeToText(item.name)}</Link>
            )
          })}
        </div>
        {this.renderErrorMessage()}
      </section>
    )
  }
}

export default List
