import React from 'react'
import DataStore from './DataStore'

class DefinitionForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errorMessage: null
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)

    DataStore.update({
      id: +this.props.termId,
      definition: formData.get('definition')
    }).then(x => {
      this.props.onSave()
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
          <label className="subtitle is-marginless" htmlFor="definition">Change definition to {this.getErrorMessage()}</label>
          <textarea className="textarea is-large" name="definition" required autoFocus defaultValue={this.props.value} />
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

DefinitionForm.defaultProps = {
  termId: null,
  value: ``,
  onCancel() {},
  onSave() {}
}

export default DefinitionForm
