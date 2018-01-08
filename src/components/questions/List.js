import React from 'react'
import { Link } from 'react-router-dom'
import QuestionsStore from './DataStore'

class List extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    QuestionsStore.getAll().then(data => {
      this.setState({ data })
    })
  }

  render() {
    if (this.state.data.length === 0) {
      return null
    }

    return (
      <section className="section">
        <h1 className="title">Questions</h1>
        <h2 className="subtitle">{this.state.data.length} Questions</h2>
        <ul>
          {this.state.data.map(item => {
            return (
              <li key={item.id}>
                <Link to={QuestionsStore.getClientUrl(`/${item.id}`)}>{item.title}</Link>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default List
