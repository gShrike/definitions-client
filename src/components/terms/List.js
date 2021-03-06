import React from 'react'
import { Link } from 'react-router-dom'
import DataStore from './DataStore'
import SearchBox from '../SearchBox'
import Loading from '../Loading'
import Search from '../search/index'
import Books from '../books/index'
import utils from 'utils'

class List extends React.Component {

  state = {
    data: Books.DataStore.getCurrentBook().terms.sort(utils.sortByName),
    error: null,
    loading: false,
    query: null,
    showIncompleteOnly: window.localStorage.getItem('gTerms-showIncompleteOnly') === `true` || false
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

  toggleIncomplete = () => {
    const showIncompleteOnly = !this.state.showIncompleteOnly

    window.localStorage.setItem('gTerms-showIncompleteOnly', showIncompleteOnly)

    this.setState({ showIncompleteOnly })
  }

  renderIncompleteButton = () => {
    const activeClass = this.state.showIncompleteOnly ? 'active' : ''

    return (
      <button title="Toggle incomplete data only" className={`incomplete-icon admin-only ${activeClass}`} onClick={this.toggleIncomplete}><span className="fa fa-exclamation-triangle"></span></button>
    )
  }

  getIncompleteData = () => {
    const { data } = this.state

    return data.filter(item => !item.definition || item.definition === '')
  }

  getFilteredData = () => {
    const { data, query, showIncompleteOnly } = this.state

    const dataset = showIncompleteOnly ? this.getIncompleteData() : data

    const engine = new Search.Helper(dataset, { keys: ['name'] })
    const filteredData = query ? engine.search(query) : dataset

    return filteredData
  }

  render() {
    const { loading } = this.state
    const data = this.getFilteredData()
    const loadingIcon = !loading || <Loading className="terms-button" />

    return (
      <section className="section terms-marker">
        <SearchBox type={DataStore.namePlural} onChange={this.onSearch} />
        <h1 className="title">
          {DataStore.namePlural}
          {this.renderIncompleteButton()}
        </h1>
        <h2 className="subtitle">{data.length} {data.length === 1 ? DataStore.name : DataStore.namePlural}</h2>

        <div className="buttons">
          {loadingIcon}
          {data.map(item => {
            return (
              <Link key={item.id}  to={DataStore.getClientUrl(`/${item.id}`)} className="button is-medium terms-button">{utils.codeToText(item.name)}</Link>
            )
          })}
        </div>
      </section>
    )
  }
}

export default List
