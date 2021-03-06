import React from 'react'
import { withRouter } from 'react-router-dom'
import Buttons from '../buttons/index'
import Books from '../books/index'
import DataStore from './DataStore'
import AddRemoveForm from '../shared/AddRemoveForm'
import utils from 'utils'

class Manager extends React.Component {

  static defaultProps = {
    topics: [],
    lastUpdated: new Date() - (90/*days*/*24*60*60*1000),
    onSave() {},
    onLoad() { return Promise.reject(`No callback supplied`) }
  }

  state = {
    newSelectedTopics: null,
    formOpen: false
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
      return (
        <AddRemoveForm
          title="Available Topics"
          fetchItems={() => Promise.resolve(Books.DataStore.getCurrentBook().topics)}
          selectedItems={this.getCurrentTopicsList()}
          onUpdate={this.onFormUpdate}
          onCancel={this.onFormCancel}
          onSave={this.onFormSave}
          lastUpdated={this.props.lastUpdated}
        />
      )
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
      return <em>None selected</em>
    }

    return topics.map(topic => {
      return <button key={topic.name} className="button is-medium topics-button" onClick={() => this.onTopicClick(topic)}>{utils.codeToText(topic.name)}</button>
    })
  }

  render() {
    return (
      <section>
        <h1 className="title">
          Related Topics
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

export default withRouter(Manager)
