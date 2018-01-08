import React from 'react'
import QuestionsStore from './DataStore'
import { withRouter } from 'react-router-dom'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      category: null
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    QuestionsStore.getById(id).then(question => {
      this.setState({ question })
    })
  }

  delete = (e) => {
    if (window.confirm(`This will delete the Category`)) {
      QuestionsStore.delete(this.state.question.id).then(x => {
        this.redirectBack()
      })
    }
  }

  redirectBack = () => {
    this.props.history.push(QuestionsStore.getClientUrl())
  }

  render() {
    const { question } = this.state

    if (!question) {
      return null
    }

    return (
      <div className="section">
        <h1 className="subtitle">Question</h1>
        <h2 className="title">{question.title}</h2>

        <br/>

        <h1 className="subtitle">Answer</h1>
        <h2 className="title is-4">{question.answer || <em>None provided</em>}</h2>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-text" onClick={this.redirectBack}>Back to Questions</button>
          </div>
          <div className="control">
            <button className="button is-outlined is-danger" onClick={this.delete}>Delete</button>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Single)
