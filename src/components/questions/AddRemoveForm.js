import React from 'react'
import DataStore from './DataStore'

class AddRemoveForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errorMessage: null,
      items: []
    }
  }

  componentDidMount() {
    DataStore.getAll()
      .then( items => this.setState({ items }) )
      .catch( error => this.setState({ error }) )
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.props.onSave(this.props.selected)
  }

  getErrorMessage() {
    return this.state.errorMessage ? <span className="help is-danger is-inline">{this.state.errorMessage}</span> : null
  }

  addOne = (item) => {
    const { selected } = this.props

    this.props.onUpdate(selected.concat(item))
  }

  renderAvailable = () => {
    const selectedValues = this.props.selected.map(item => item.title)

    return this.state.items.map(item => {
      // Don't include selected items
      if (selectedValues.indexOf(item.title) > -1) {
        return null
      }

      return <button key={item.title} className="button" onClick={() => this.addOne(item)}>{item.title}</button>
    })
  }

  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <div className="field">
          <label className="subtitle" htmlFor="name">Available Questions {this.getErrorMessage()}</label>
          <div className="buttons">
            {this.renderAvailable()}
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
  selected: [],
  onCancel() {},
  onSave() {},
  onUpdate() {}
}

export default AddRemoveForm
