import React from 'react'
import { Link } from 'react-router-dom'
import Categories from '../../db/Categories'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Categories.getAll().then(data => {
      this.setState({ data })
    })
  }

  render() {
    return (
      <ul className="section">
        {this.state.data.map(item => {
          return (
            <li key={item.id}>
              <Link to={`/categories/${item.id}`}>{item.name}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default List
