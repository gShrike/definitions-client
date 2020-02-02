import React from 'react'
import DataStore from './DataStore'
import { withRouter } from 'react-router-dom'

import Books from '../books/index'

class Form extends React.Component {

  state = {
    errorMessage: null
  }

  componentDidMount() {
    if (this.refs.autofocus) {
      this.refs.autofocus.focus()
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)

    Books.DataStore.getCurrentBook().addTerm({
      name: formData.get('name'),
      definition: formData.get('definition') || null
    }).then(items => {
      this.redirectToItem(...items)
    }).catch(error => {
      this.setState({
        errorMessage: error.message
      })
    })
  }

  redirectToItem = (item) => {
    this.props.history.push(DataStore.getClientUrl(`/${item.id}`))
  }

  redirectBack = () => {
    this.props.history.goBack()
  }

  getErrorMessage() {
    return this.state.errorMessage ? <span className="help is-danger is-inline">{this.state.errorMessage}</span> : null
  }

  render() {
    return (
      <form ref="form" className="section terms-marker" onSubmit={this.onSubmit}>
        <h1 className="title">New Term</h1>

        <div className="field">
          <label htmlFor="name" className="label">Name {this.getErrorMessage()}</label>
          <input ref="autofocus" type="text" className="input" name="name" required />
        </div>

        <div className="field">
          <label htmlFor="definition" className="label">Definition</label>
          <textarea className="textarea" name="definition"></textarea>
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
