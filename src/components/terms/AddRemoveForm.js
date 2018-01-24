import React from 'react'
import DataStore from './DataStore'

class AddRemoveForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errorMessage: null,
      terms: []
    }
  }

  componentDidMount() {
    DataStore.getAll()
      .then( terms => this.setState({ terms }) )
      .catch( error => this.setState({ error }) )
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.props.onSave(this.props.selectedTerms)
  }

  getErrorMessage() {
    return this.state.errorMessage ? <span className="help is-danger is-inline">{this.state.errorMessage}</span> : null
  }

  addTopic = (term) => {
    const { selectedTerms } = this.props

    this.props.onUpdate(selectedTerms.concat(term))
  }

  renderAvailableTerms = () => {
    const selectedTermValues = this.props.selectedTerms.map(term => term.name)

    return this.state.terms.map(term => {
      // Don't include selected topics
      if (selectedTermValues.indexOf(term.name) > -1) {
        return null
      }

      return <button key={term.name} className="button" onClick={() => this.addTopic(term)}>{term.name}</button>
    })
  }

  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <div className="field">
          <label className="subtitle" htmlFor="name">Available Terms {this.getErrorMessage()}</label>
          <div className="buttons">
            {this.renderAvailableTerms()}
          </div>
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

AddRemoveForm.defaultProps = {
  selectedTerms: [],
  onCancel() {},
  onSave() {},
  onUpdate() {}
}

export default AddRemoveForm
