import React from 'react'
import DataStore from './DataStore'
import { withRouter } from 'react-router-dom'
import Buttons from '../buttons/index'
import Questions from '../questions/index'
import Terms from '../terms/index'
import RenameForm from './RenameForm'
import utils from 'utils'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      item: null,
      terms: [],
      questions: [],
      renameFormOpen: false
    }
  }

  componentDidMount() {
    this.loadData()
    this.loadTermsForTopic()
    this.loadQuestionsForTopic()
  }

  loadData = () => {
    const { id } = this.props.match.params

    DataStore.getById(id)
      .then(item => this.setState({ item }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  loadTermsForTopic = () => {
    const { id } = this.props.match.params

    return DataStore.getTermsForTopic(id)
      .then(terms => this.setState({ terms }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  loadQuestionsForTopic = () => {
    const { id } = this.props.match.params

    return DataStore.getQuestionsForTopic(id)
      .then(questions => this.setState({ questions }))
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

  onRenameFormSave = () => {
    this.toggleRenameForm()
    this.loadData()
  }

  toggleRenameForm = () => {
    this.setState({
      renameFormOpen: !this.state.renameFormOpen
    })
  }

  onTermsUpdate = (newlySelected) => {
    DataStore.updateTermsForTopic(this.state.item.id, newlySelected)
      .then(x => this.setState({ terms: newlySelected }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  onQuestionsUpdate = (newlySelected) => {
    DataStore.updateQuestionsForTopic(this.state.item.id, newlySelected)
      .then(x => this.setState({ questions: newlySelected }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  renderRenameForm = () => {
    if (this.state.renameFormOpen) {
      return <RenameForm topicId={this.state.item.id} value={this.state.item.name} onCancel={this.toggleRenameForm} onSave={this.onRenameFormSave} />
    }

    return null
  }

  redirectBack = () => {
    this.props.history.push(DataStore.getClientUrl())
  }

  render() {
    const { item, errorMessage } = this.state

    if (errorMessage) {
      return <p className="error-message-full-page"><strong className="has-text-danger">Error: {errorMessage}</strong></p>
    }

    if (!item) {
      return null
    }

    return (
      <div className="">
        <header className="section topics-marker">
          <h1 className="title is-spaced">
            {DataStore.name}
            <Buttons.RenameDelete onRename={this.toggleRenameForm} onDelete={this.delete} />
          </h1>
          <h2 className="subtitle">{utils.codeToText(item.name)}</h2>
          {this.renderRenameForm()}
        </header>

        <hr/>

        <section className="section terms-marker">
          <Terms.Manager terms={this.state.terms} onSave={this.onTermsUpdate} lastUpdated={item.term_updated_at} />
        </section>

        <hr/>

        <section className="section questions-marker">
          <Questions.Manager questions={this.state.questions} onSave={this.onQuestionsUpdate} lastUpdated={item.question_updated_at} />
        </section>

        <hr/>
      </div>
    )
  }

}

export default withRouter(Single)
