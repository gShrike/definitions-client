import React from 'react'
import ManageButton from '../ManageButton'
import AddRemoveForm from './AddRemoveForm'

class Manager extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newSelectedTopics: null,
      formOpen: false
    }
  }

  getCurrentTopicsList = () => {
    const { newSelectedTopics } = this.state
    const { topics } = this.props

    return newSelectedTopics || topics
  }

  clearNewTopics = () => {
    this.setState({
      newSelectedTopics: null
    })
  }

  toggleForm = () => {
    this.setState({
      formOpen: !this.state.formOpen
    })
  }

  renderTopicsForm = () => {
    if (this.state.formOpen) {
      return <AddRemoveForm selectedTopics={this.getCurrentTopicsList()} onUpdate={this.onFormUpdate} onCancel={this.onFormCancel} onSave={this.onFormSave} />
    }

    return null
  }

  onFormCancel = () => {
    this.toggleForm()
    this.clearNewTopics()
  }

  onFormUpdate = (newSelectedTopics) => {
    this.setState({
      newSelectedTopics
    })
  }

  onFormSave = () => {
    this.toggleForm()
    this.props.onSave(this.state.newSelectedTopics)
    this.clearNewTopics()
  }

  onTopicClick = (topic) => {
    if (this.state.formOpen) {
      this.removeTopic(topic)
    }
  }

  removeTopic = (topic) => {
    const topics = this.getCurrentTopicsList()

    this.setState({
      newSelectedTopics: topics.filter(selectedTopic => selectedTopic.name !== topic.name)
    })
  }

  renderTopicsList = () => {
    const topics = this.getCurrentTopicsList()

    if (topics.length === 0) {
      return <em>None provided</em>
    }

    return topics.map(topic => {
      return <button key={topic.name} className="button is-medium" onClick={() => this.onTopicClick(topic)}>{topic.name}</button>
    })
  }

  render() {
    return (
      <section>
        <h1 className="subtitle">
          Topics
          <ManageButton onManage={this.toggleForm} />
        </h1>
        <div className="buttons">
          {this.renderTopicsList()}
        </div>
        {this.renderTopicsForm()}
      </section>
    )
  }
}

Manager.defaultProps = {
  topics: [],
  onSave() {},
  onLoad() { return Promise.reject(`No callback supplied`) }
}

export default Manager
