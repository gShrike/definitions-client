import React from 'react'
import { Link } from 'react-router-dom'
import CategoriesStore from './DataStore'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    CategoriesStore.getAll().then(data => {
      this.setState({ data })
    })
  }

  render() {
    if (this.state.data.length === 0) {
      return null
    }

    return (
      <section className="section">
        <h1 className="title">Categories</h1>
        <h2 className="subtitle">{this.state.data.length} Categories</h2>
        <ul>
          {this.state.data.map(item => {
            return (
              <li key={item.id}>
                <Link to={CategoriesStore.getClientUrl(`/${item.id}`)}>{item.name}</Link>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default List
