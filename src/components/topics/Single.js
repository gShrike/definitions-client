import React from 'react'
import DataStore from './DataStore'
import { withRouter } from 'react-router-dom'
import Buttons from '../buttons/index'
import Questions from '../questions/index'
import Terms from '../terms/index'
import RenameForm from './RenameForm'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      item: null,
      terms: [],
      renameFormOpen: false
    }
  }

  componentDidMount() {
    this.loadData()
    this.loadTermsForTopic()
  }

  loadData = () => {
    const { id } = this.props.match.params

    DataStore.getById(id).then(item => {
      this.setState({ item })
    })
  }

  loadTermsForTopic = () => {
    const { id } = this.props.match.params

    return DataStore.getTermsForTopic(id)
      .then(terms => this.setState({ terms }))
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
    const { item } = this.state

    if (!item) {
      return null
    }

    return (
      <div className="section">
        <h1 className="subtitle">
          {DataStore.name}
          <Buttons.RenameDelete onRename={this.toggleRenameForm} onDelete={this.delete} />
        </h1>
        <h2 className="title">{item.name}</h2>
        {this.renderRenameForm()}

        <hr/>

        <Terms.Manager terms={this.state.terms} onSave={this.onTermsUpdate} />

        <hr/>

        <h1 className="subtitle">
          Questions
          <Buttons.Manage />
        </h1>
        <Questions.OrderedList />

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
