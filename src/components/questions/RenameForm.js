import React from 'react'
import Books from '../books/index'

class RenameForm extends React.Component {
  
  static defaultProps = {
    questionId: null,
    value: ``,
    onCancel() {},
    onSave() {}
  }

  state = {
    errorMessage: null
  }

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)

    Books.DataStore.updateQuestion({
      id: +this.props.questionId,
      title: formData.get('title')
    }).then(results => {
      this.props.onSave(...results)
    }).catch(error => {
      this.setState({
        errorMessage: error.message
      })
    })
  }

  getErrorMessage() {
    return this.state.errorMessage ? <span className="help is-danger is-inline">{this.state.errorMessage}</span> : null
  }

  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <div className="field">
          <label className="subtitle is-marginless" htmlFor="name">Rename to {this.getErrorMessage()}</label>
          <input type="text" className="input is-large" name="title" required autoFocus defaultValue={this.props.value} />
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="button" className="button is-text" onClick={this.props.onCancel}>Cancel</button>
          </div>
          <div className="control">
            <button type="submit" className="button is-success is-outlined">Save</button>
          </div>
        </div>
      </form>
    )
  }
}

export default RenameForm
