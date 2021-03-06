import React from 'react'
import DataStore from './DataStore'
import Books from '../books/index'
import { withRouter } from 'react-router-dom'
import Buttons from '../buttons/index'
import Topics from '../topics/index'
import Questions from '../questions/index'
import RenameForm from './RenameForm'
import DefinitionForm from './DefinitionForm'
import Settings from '../settings/index'
import utils from 'utils'

class Single extends React.Component {

  state = {
    book: Books.DataStore.getCurrentBook(),
    term: null,
    topics: [],
    questions: [],
    renameFormOpen: false,
    definitionFormOpen: false,
    newSelectedTopics: null,
    userSettings: Settings.UserSettings.getSettings()
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    const { id } = this.props.match.params
    const { book } = this.state

    this.setState({
      term: book.getTermById(id),
      topics: book.getTopicsForTerm(id),
      questions: book.getQuestionsForTerm(id)
    })
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

  onRenameFormSave = (term) => {
    this.toggleRenameForm()
    this.setState({ term })
  }

  onDefinitionFormSave = (term) => {
    this.toggleDefinitionForm()
    this.setState({ term })
  }

  toggleRenameForm = () => {
    this.setState({
      renameFormOpen: !this.state.renameFormOpen
    })
  }

  toggleDefinitionForm = () => {
    this.setState({
      definitionFormOpen: !this.state.definitionFormOpen
    })
  }

  onTopicsUpdate = (newSelectedTopics) => {
    DataStore.updateTopicsForTerm(this.state.term.id, newSelectedTopics)
      .then(x => this.setState({ topics: newSelectedTopics }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  onQuestionsUpdate = (newlySelected) => {
    DataStore.updateQuestionsForTerm(this.state.term.id, newlySelected)
      .then(x => this.setState({ questions: newlySelected }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  showingDefinitions() {
    return this.state.userSettings.showDefinitionsAndAnswers
  }

  toggleDefinitions = () => {
    const { userSettings } = this.state

    userSettings.showDefinitionsAndAnswers = !userSettings.showDefinitionsAndAnswers

    this.setState({
      userSettings
    })
    Settings.UserSettings.saveSettings(userSettings)
  }

  renderRenameForm = () => {
    const { renameFormOpen, term } = this.state

    if (renameFormOpen) {
      return <RenameForm termId={term.id} value={term.name} onCancel={this.toggleRenameForm} onSave={this.onRenameFormSave} />
    }

    return null
  }

  renderDefinitionForm = () => {
    const { definitionFormOpen, term } = this.state

    if (definitionFormOpen) {
      return <DefinitionForm termId={term.id} value={term.definition} onCancel={this.toggleDefinitionForm} onSave={this.onDefinitionFormSave} />
    }

    return null
  }

  render() {
    const { term, errorMessage } = this.state

    if (errorMessage) {
      return <p className="error-message-full-page"><strong className="has-text-danger">Error: {errorMessage}</strong></p>
    }

    if (!term) {
      return null
    }

    return (
      <div className="">
        <header className="section terms-marker">
          <h1 className="title is-spaced">
            Term
            <Buttons.RenameDelete onRename={this.toggleRenameForm} onDelete={this.delete} />
          </h1>
          <h2 className="subtitle">{utils.codeToText(term.name)}</h2>
          {this.renderRenameForm()}
        </header>

        <hr/>

        <section className="section terms-marker">
          <h1 className="title is-spaced">
            Definition
            <Buttons.Redefine onRedefine={this.toggleDefinitionForm} />
            <Buttons.ShowHide onToggle={this.toggleDefinitions} visible={this.showingDefinitions()} />
          </h1>
          <h2 className="subtitle">
            {this.showingDefinitions() ?
              ((term.definition && utils.codeToText(term.definition)) || <em>None provided</em>)
              : <em>Hidden</em>
            }
          </h2>
          {this.renderDefinitionForm()}
        </section>

        <hr/>

        <section className="section topics-marker">
          <Topics.Manager topics={this.state.topics} onSave={this.onTopicsUpdate} lastUpdated={term.topic_updated_at} />
        </section>

        <hr/>

        <section className="section questions-marker">
          <Questions.Manager questions={this.state.questions} onSave={this.onQuestionsUpdate} lastUpdated={term.question_updated_at} />
        </section>

        <hr/>
      </div>
    )
  }

}

export default withRouter(Single)
