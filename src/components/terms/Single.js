import React from 'react'
import DataStore from './DataStore'
import { withRouter } from 'react-router-dom'
import Buttons from '../buttons/index'
import Topics from '../topics/index'
import Questions from '../questions/index'
import RenameForm from './RenameForm'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      term: null,
      topics: [],
      renameFormOpen: false,
      newSelectedTopics: null
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    const { id } = this.props.match.params

    DataStore.getById(id).then(term => {
      this.setState({ term })
    })

    this.loadTopicsForTerm()
  }

  delete = (e) => {
    if (window.confirm(`This will delete the Term`)) {
      DataStore.delete(this.state.term.id).then(x => {
        this.redirectBack()
      })
    }
  }

  redirectBack = () => {
    this.props.history.push(DataStore.getClientUrl())
  }

  onRenameFormSave = () => {
    this.toggleRenameForm()
    this.loadData()
  }

  toggleRenameForm = () => {
    this.setState({
      renameFormOpen: !this.state.renameFormOpen
    })
  }

  loadTopicsForTerm = () => {
    const { id } = this.props.match.params

    return DataStore.getTopicsForTerm(id)
      .then(topics => this.setState({ topics }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  onTopicsUpdate = (newSelectedTopics) => {
    DataStore.updateTopicsForTerm(this.state.term.id, newSelectedTopics)
      .then(x => this.setState({ topics: newSelectedTopics }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  renderRenameForm = () => {
    const { renameFormOpen, term } = this.state

    if (renameFormOpen) {
      return <RenameForm termId={term.id} value={term.name} onCancel={this.toggleRenameForm} onSave={this.onRenameFormSave} />
    }

    return null
  }

  render() {
    const { term } = this.state

    if (!term) {
      return null
    }

    return (
      <div className="section">
        <h1 className="subtitle">
          Term
          <Buttons.RenameDelete onRename={this.toggleRenameForm} onDelete={this.delete} />
        </h1>
        <h2 className="title">{term.name}</h2>
        {this.renderRenameForm()}

        <hr/>

        <Topics.Manager topics={this.state.topics} onSave={this.onTopicsUpdate} />

        <hr/>

        <h1 className="subtitle">
          Questions
          <Buttons.Manage />
        </h1>
        <Questions.OrderedList />

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-text" onClick={this.redirectBack}>Back to Terms</button>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Single)
