import React from 'react'
import { Link } from 'react-router-dom'
import Questions from '../../db/Questions'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Questions.getAll().then(data => {
      this.setState({ data })
    })
  }

  render() {
    return (
      <ul>
        {this.state.data.map(item => {
          return (
            <li key={item.id}>
              <Link to={`/questions/${item.id}`}>{item.title}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default List
