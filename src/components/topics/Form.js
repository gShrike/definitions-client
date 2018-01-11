import React from 'react'
import DataStore from './DataStore'
import { withRouter } from 'react-router-dom'

class Form extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errorMessage: null
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)

    DataStore.create({
      name: formData.get('name')
    }).then(x => {
      this.redirectBack()
    }).catch(error => {
      this.setState({
        errorMessage: error.message
      })
    })
  }

  redirectBack = () => {
    this.props.history.push(DataStore.getClientUrl())
  }

  getErrorMessage() {
    return this.state.errorMessage ? <span className="help is-danger is-inline">{this.state.errorMessage}</span> : null
  }

  render() {
    return (
      <form ref="form" className="section" onSubmit={this.onSubmit}>
        <h1 className="subtitle">New {DataStore.name}</h1>

        <div className="field">
          <label htmlFor="name" className="label">Name {this.getErrorMessage()}</label>
          <input type="text" className="input" name="name" required />
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
