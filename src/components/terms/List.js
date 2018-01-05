import React from 'react'
import { Link } from 'react-router-dom'
import Terms from '../../db/Terms'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Terms.getAll().then(data => {
      this.setState({ data })
    })
  }

  render() {
    return (
      <ul>
        {this.state.data.map(item => {
          return (
            <li key={item.id}>
              <Link to={`/terms/${item.id}`}>{item.name}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default List
