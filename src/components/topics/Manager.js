import React from 'react'
import { withRouter } from 'react-router-dom'
import AddRemoveForm from './AddRemoveForm'
import DataStore from './DataStore'
import Buttons from '../buttons/index'

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
    else {
      this.props.history.push(DataStore.getClientUrl(`/${topic.id}`))
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
      return <button key={topic.name} className="button is-medium topics-button" onClick={() => this.onTopicClick(topic)}>{topic.name}</button>
    })
  }

  render() {
    return (
      <section>
        <h1 className="subtitle">
          Topics
          <Buttons.Manage onManage={this.toggleForm} />
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

export default withRouter(Manager)
