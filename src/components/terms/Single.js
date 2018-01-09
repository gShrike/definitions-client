import React from 'react'
import TermsStore from './DataStore'
import { withRouter } from 'react-router-dom'
import RenameDeleteButton from '../RenameDeleteButton'
import AddRemoveButton from '../AddRemoveButton'
import Questions from '../questions/index'
import RenameForm from './RenameForm'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      term: null,
      renameFormOpen: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    const { id } = this.props.match.params

    TermsStore.getById(id).then(term => {
      this.setState({ term })
    })
  }

  delete = (e) => {
    if (window.confirm(`This will delete the Term`)) {
      TermsStore.delete(this.state.term.id).then(x => {
        this.redirectBack()
      })
    }
  }

  redirectBack = () => {
    this.props.history.push(TermsStore.getClientUrl())
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

  renderRenameForm = () => {
    if (this.state.renameFormOpen) {
      return <RenameForm termId={this.state.term.id} value={this.state.term.name} onCancel={this.toggleRenameForm} onSave={this.onRenameFormSave} />
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
          <RenameDeleteButton onRename={this.toggleRenameForm} onDelete={this.delete} />
        </h1>
        <h2 className="title">{term.name}</h2>
        {this.renderRenameForm()}

        <hr/>

        <h1 className="subtitle">
          Topics
          <AddRemoveButton />
        </h1>
        <div className="buttons">
          <span className="button is-medium">Async</span>
          <span className="button is-medium">AJAX</span>
        </div>

        <hr/>

        <h1 className="subtitle">
          Questions
          <AddRemoveButton />
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
