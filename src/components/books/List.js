import React from 'react'
import { Link } from 'react-router-dom'
import DataStore from './DataStore'
import SearchBox from '../SearchBox'
import Loading from '../Loading'
import Search from '../search/index'
import utils from 'utils'

class List extends React.Component {

  state = {
    data: [],
    error: null,
    loading: true,
    query: null
  }

  componentDidMount() {
    DataStore.getAll()
      .then( data => {
        DataStore.clearCurrentBook()
        this.setState({ data, loading: false })
      })
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
    const query = q || null
    this.setState({ query })
  }

  render() {
    const { data, loading, query } = this.state
    const loadingIcon = !loading || <Loading className="books-button" />

    const engine = new Search.Helper(data, { keys: ['name'] })
    const filteredData = query ? engine.search(query) : data

    return (
      <section className="section books-marker">
        <SearchBox type={DataStore.namePlural} onChange={this.onSearch} />
        <h1 className="title">{DataStore.namePlural} <Link className="nav-list-link-add title-button admin-only" to={`/books/new`} title={`Add new Book`}>
              <span className="icon"><i className="fa fa-plus"></i></span>
            </Link></h1>
        <h2 className="subtitle">{filteredData.length} {filteredData.length === 1 ? DataStore.name : DataStore.namePlural}</h2>

        <div className="buttons">
          {loadingIcon}
          {filteredData.map(item => {
            return (
              <Link key={item.id}  to={DataStore.getClientUrl(`/${item.id}`)} className="button is-medium topics-button is-centered">{item.icon && <i className={`fa ${item.icon} app-icon`} />}{utils.codeToText(item.name)}</Link>
            )
          })}
        </div>
        {this.renderErrorMessage()}
      </section>
    )
  }
}

export default List
