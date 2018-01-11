import React from 'react'
import DataStore from './DataStore'

class AddRemoveForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errorMessage: null,
      topics: []
    }
  }

  componentDidMount() {
    DataStore.getAll()
      .then( topics => this.setState({ topics }) )
      .catch( error => this.setState({ error }) )
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.props.onSave(this.props.selectedTopics)
  }

  getErrorMessage() {
    return this.state.errorMessage ? <span className="help is-danger is-inline">{this.state.errorMessage}</span> : null
  }

  addTopic = (topic) => {
    const { selectedTopics } = this.props

    this.props.onUpdate(selectedTopics.concat(topic))
  }

  renderAvailableTopics = () => {
    const selectedTopicValues = this.props.selectedTopics.map(topic => topic.name)

    return this.state.topics.map(topic => {
      // Don't include selected topics
      if (selectedTopicValues.indexOf(topic.name) > -1) {
        return null
      }

      return <button key={topic.name} className="button" onClick={() => this.addTopic(topic)}>{topic.name}</button>
    })
  }

  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <div className="field">
          <label className="subtitle" htmlFor="name">Available Topics {this.getErrorMessage()}</label>
          <div className="buttons">
            {this.renderAvailableTopics()}
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
  termId: null,
  selectedTopics: [],
  onCancel() {},
  onSave() {},
  onUpdate() {}
}

export default AddRemoveForm
