import React from 'react'
import { Link } from 'react-router-dom'
import TermsStore from './DataStore'
import SearchBox from '../SearchBox'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    TermsStore.getAll().then(data => {
      this.setState({ data })
    })
  }

  onSearch = (q) => {
    TermsStore.search(q).then(data => {
      this.setState({ data })
    })
  }

  render() {
    const { data } = this.state

    return (
      <section className="section">
        <SearchBox onChange={this.onSearch} />
        <h1 className="title">{TermsStore.namePlural}</h1>
        <h2 className="subtitle">{data.length} {data.length === 1 ? TermsStore.name : TermsStore.namePlural}</h2>
        <hr/>
        <ul>
          {this.state.data.map(item => {
            return (
              <li key={item.id}>
                <Link to={TermsStore.getClientUrl(`/${item.id}`)}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default List
