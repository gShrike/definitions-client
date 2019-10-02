import React from 'react'
import { withRouter } from 'react-router-dom'
import Buttons from '../buttons/index'
import DataStore from './DataStore'
import AddRemoveForm from '../shared/AddRemoveForm'
import utils from 'utils'

class Manager extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      newlySelected: null,
      formOpen: false
    }
  }

  getCurrentList = () => {
    const { newlySelected } = this.state
    const { questions } = this.props

    return newlySelected || questions
  }

  clearNewlySelected = () => {
    this.setState({
      newlySelected: null
    })
  }

  toggleForm = () => {
    this.setState({
      formOpen: !this.state.formOpen
    })
  }

  onFormCancel = () => {
    this.toggleForm()
    this.clearNewlySelected()
  }

  onFormUpdate = (newlySelected) => {
    this.setState({
      newlySelected
    })
  }

  onFormSave = () => {
    this.toggleForm()
    this.props.onSave(this.state.newlySelected)
    this.clearNewlySelected()
  }

  onButtonClick = (item) => {
    if (this.state.formOpen) {
      this.removeFromSelected(item)
    }
    else {
      this.props.history.push(DataStore.getClientUrl(`/${item.id}`))
    }
  }

  removeFromSelected = (question) => {
    const questions = this.getCurrentList()

    this.setState({
      newlySelected: questions.filter(selected => selected.title !== question.title)
    })
  }

  renderList = () => {
    const questions = this.getCurrentList()

    if (questions.length === 0) {
      return <em>None selected</em>
    }

    return questions.map(question => {
      return <button key={question.title} className="button is-medium questions-button" onClick={() => this.onButtonClick(question)}>{utils.codeToText(question.title)}</button>
    })
  }

  renderForm = () => {
    if (this.state.formOpen) {
      return (
        <AddRemoveForm
          title="Available Questions"
          labelProp="title"
          fetchItems={() => DataStore.getAll()}
          selectedItems={this.getCurrentList()}
          onUpdate={this.onFormUpdate}
          onCancel={this.onFormCancel}
          onSave={this.onFormSave}
          lastUpdated={this.props.lastUpdated}
        />
      )
    }

    return null
  }

  render() {
    return (
      <section>
        <h1 className="subtitle">
          Questions
          <Buttons.Manage onManage={this.toggleForm} />
        </h1>
        <div className="buttons">
          {this.renderList()}
        </div>
        {this.renderForm()}
      </section>
    )
  }
}

Manager.defaultProps = {
  questions: [],
  lastUpdated: new Date() - (90/*days*/*24*60*60*1000),
  onSave() {},
  onLoad() { return Promise.reject(`No callback supplied`) }
}

export default withRouter(Manager)
