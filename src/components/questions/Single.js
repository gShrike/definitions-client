import React from 'react'
import DataStore from './DataStore'
import { withRouter } from 'react-router-dom'
import Topics from '../topics/index'
import Terms from '../terms/index'
import Buttons from '../buttons/index'
import RenameForm from './RenameForm'
import AnswerForm from './AnswerForm'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      item: null,
      renameFormOpen: false,
      answerFormOpen: false,
      topics: [],
      newSelectedTopics: null,
      terms: [],
      newSelectedTerms: null
    }
  }

  componentDidMount() {
    this.loadData()
    this.loadTermsForQuestion()
    this.loadTopicsForQuestion()
  }

  loadData = () => {
    const { id } = this.props.match.params

    DataStore.getById(id).then(item => {
      this.setState({ item })
    })
  }

  loadTermsForQuestion = () => {
    const { id } = this.props.match.params

    return DataStore.getTermsForQuestion(id)
      .then(terms => this.setState({ terms }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  loadTopicsForQuestion = () => {
    const { id } = this.props.match.params

    return DataStore.getTopicsForQuestion(id)
      .then(topics => this.setState({ topics }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  delete = (e) => {
    if (window.confirm(`This will delete the ${DataStore.name}`)) {
      const { id } = this.state.item

      DataStore.delete(id).then(x => {
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

  onAnswerFormSave = () => {
    this.toggleAnswerForm()
    this.loadData()
  }

  toggleRenameForm = () => {
    this.setState({
      renameFormOpen: !this.state.renameFormOpen
    })
  }

  toggleAnswerForm = () => {
    this.setState({
      answerFormOpen: !this.state.answerFormOpen
    })
  }

  onTermsUpdate = (newlySelected) => {
    DataStore.updateTermsForQuestion(this.state.item.id, newlySelected)
      .then(x => this.setState({ terms: newlySelected }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  onTopicsUpdate = (newSelectedTopics) => {
    DataStore.updateTopicsForQuestion(this.state.item.id, newSelectedTopics)
      .then(x => this.setState({ topics: newSelectedTopics }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  renderRenameForm = () => {
    if (this.state.renameFormOpen) {
      return <RenameForm questionId={this.state.item.id} value={this.state.item.title} onCancel={this.toggleRenameForm} onSave={this.onRenameFormSave} />
    }

    return null
  }

  renderAnswerForm = () => {
    const { answerFormOpen, item } = this.state

    if (answerFormOpen) {
      return <AnswerForm questionId={item.id} value={item.answer} onCancel={this.toggleAnswerForm} onSave={this.onAnswerFormSave} />
    }

    return null
  }

  render() {
    const { item } = this.state

    if (!item) {
      return null
    }

    return (
      <div className="">
        <header className="section questions-marker">
          <h1 className="subtitle">
            {DataStore.name}
            <Buttons.RenameDelete onRename={this.toggleRenameForm} onDelete={this.delete} />
          </h1>
          <h2 className="title">{item.title}</h2>
          {this.renderRenameForm()}
        </header>

        <hr/>

        <section className="section questions-marker">
          <h1 className="subtitle">
            Answer
            <Buttons.Redefine onRedefine={this.toggleAnswerForm} />
          </h1>
          <h2 className="title is-4">{item.answer || <em>None selected</em>}</h2>
          {this.renderAnswerForm()}
        </section>

        <hr/>

        <section className="section topics-marker">
          <Topics.Manager topics={this.state.topics} onSave={this.onTopicsUpdate} />
        </section>

        <hr/>

        <section className="section terms-marker">
          <Terms.Manager terms={this.state.terms} onSave={this.onTermsUpdate} />
        </section>

        <hr/>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-text" onClick={this.redirectBack}>Back to {DataStore.namePlural}</button>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Single)
