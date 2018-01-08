import React from 'react'
import QuestionsStore from './DataStore'
import { withRouter } from 'react-router-dom'

class Form extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errorMessages: []
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)

    QuestionsStore.create({
      title: formData.get('title'),
      answer: formData.get('answer')
    }).then(x => {
      this.redirectBack()
    }).catch(error => {
      this.setState({
        errorMessages: [{ name: `title`, message: error.message }]
      })
    })
  }

  redirectBack = () => {
    this.props.history.push(QuestionsStore.getClientUrl())
  }

  getErrorMessage(name) {
    const error = this.state.errorMessages.find(err => err.name === name)

    if (!error) {
      return null
    }

    return <span className="help is-danger is-inline">{error.message}</span>
  }

  render() {
    return (
      <form ref="form" className="section" onSubmit={this.onSubmit}>
        <h1 className="subtitle">New Question</h1>

        <div className="field">
          <label htmlFor="title" className="label">Title {this.getErrorMessage(`title`)}</label>
          <input type="text" className="input" name="title" required />
        </div>

        <div className="field">
          <label htmlFor="answer" className="label">Answer {this.getErrorMessage(`answer`)}</label>
          <textarea className="textarea" name="answer"></textarea>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="button" className="button is-text" onClick={this.redirectBack}>Cancel</button>
          </div>
          <div className="control">
            <button type="submit" className="button is-success is-outlined">Save</button>
          </div>
        </div>
      </form>
    )
  }
}

export default withRouter(Form)
