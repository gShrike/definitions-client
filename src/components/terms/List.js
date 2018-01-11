import React from 'react'
import { Link } from 'react-router-dom'
import DataStore from './DataStore'
import SearchBox from '../SearchBox'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    DataStore.getAll().then(data => {
      this.setState({ data })
    })
  }

  onSearch = (q) => {
    DataStore.search(q).then(data => {
      this.setState({ data })
    })
  }

  render() {
    const { data } = this.state

    return (
      <section className="section">
        <SearchBox type={DataStore.namePlural} onChange={this.onSearch} />
        <h1 className="title">{DataStore.namePlural}</h1>
        <h2 className="subtitle">{data.length} {data.length === 1 ? DataStore.name : DataStore.namePlural}</h2>
        <hr/>
        <ul>
          {this.state.data.map(item => {
            return (
              <li key={item.id}>
                <Link to={DataStore.getClientUrl(`/${item.id}`)}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default List
