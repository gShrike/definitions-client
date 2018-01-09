import React from 'react'
import { Link } from 'react-router-dom'
import QuestionsStore from './DataStore'
import SearchBox from '../SearchBox'

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

  onSearch = (q) => {
    QuestionsStore.search(q).then(data => {
      this.setState({ data })
    })
  }

  render() {
    const { data } = this.state

    return (
      <section className="section">
        <SearchBox type="Questions" onChange={this.onSearch} />
        <h1 className="title">Questions</h1>
        <h2 className="subtitle">{data.length} {data.length === 1 ? QuestionsStore.name : QuestionsStore.namePlural}</h2>
        <hr/>
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
