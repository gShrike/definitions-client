import React from 'react'
import DataStore from './DataStore'
import Books from '../books/index'
import { withRouter } from 'react-router-dom'

class Form extends React.Component {

  state = {
    errorMessages: []
  }

  componentDidMount() {
    if (this.refs.autofocus) {
      this.refs.autofocus.focus()
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)

    Books.DataStore.getCurrentBook().addQuestion({
      title: formData.get('title'),
      answer: formData.get('answer')
    }).then(items => {
      this.redirectToItem(...items)
    }).catch(error => {
      this.setState({
        errorMessages: [{ name: `title`, message: error.message }]
      })
    })
  }

  redirectToItem = (item) => {
    this.props.history.push(DataStore.getClientUrl(`/${item.id}`))
  }

  redirectBack = () => {
    this.props.history.goBack()
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
      <form ref="form" className="section questions-marker" onSubmit={this.onSubmit}>
        <h1 className="title">New Question</h1>

        <div className="field">
          <label htmlFor="title" className="label">Title {this.getErrorMessage(`title`)}</label>
          <input ref="autofocus" type="text" className="input" name="title" required />
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
