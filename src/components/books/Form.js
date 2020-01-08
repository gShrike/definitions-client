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

  componentDidMount() {
    if (this.refs.autofocus) {
      this.refs.autofocus.focus()
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)

    DataStore.create({
      name: formData.get('name'),
      icon: formData.get('icon') || null,
      public: formData.get('public') === 'on'
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
      <form ref="form" className="section books-marker" onSubmit={this.onSubmit}>
        <h1 className="title">New Book</h1>

        <div className="field">
          <label htmlFor="name" className="label">Name {this.getErrorMessage()}</label>
          <input ref="autofocus" type="text" className="input" name="name" required />
        </div>

        <div className="field">
          <label htmlFor="icon" className="label">Icon</label>
          <input type="text" className="input" name="icon" placeholder="fa-icon-name" />
          <small className="help">from <a href="https://fontawesome.com/v4.7.0/icons/" target="fa">font awesome v4.7</a></small>
        </div>

        <div className="field">
          <label htmlFor="public" className="label">Public</label>
          <input type="checkbox" className="checkbox is-large" name="public" />
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
