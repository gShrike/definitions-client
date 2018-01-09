import React from 'react'
import Store from './DataStore'
import { withRouter } from 'react-router-dom'
import RenameDeleteButton from '../RenameDeleteButton'
import AddRemoveButton from '../AddRemoveButton'
import RenameForm from './RenameForm'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      item: null,
      renameFormOpen: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    const { id } = this.props.match.params

    Store.getById(id).then(item => {
      this.setState({ item })
    })
  }

  delete = (e) => {
    if (window.confirm(`This will delete the ${Store.name}`)) {
      const { id } = this.state.item

      Store.delete(id).then(x => {
        this.redirectBack()
      })
    }
  }

  redirectBack = () => {
    this.props.history.push(Store.getClientUrl())
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
      return <RenameForm questionId={this.state.item.id} value={this.state.item.title} onCancel={this.toggleRenameForm} onSave={this.onRenameFormSave} />
    }

    return null
  }

  render() {
    const { item } = this.state

    if (!item) {
      return null
    }

    return (
      <div className="section">
        <h1 className="subtitle">
          {Store.name}
          <RenameDeleteButton onRename={this.toggleRenameForm} onDelete={this.delete} />
        </h1>
        <h2 className="title">{item.title}</h2>
        {this.renderRenameForm()}

        <hr/>

        <h1 className="subtitle">Answer</h1>
        <h2 className="title is-4">{item.answer || <em>None provided</em>}</h2>

        <hr/>

        <h1 className="subtitle">
          Terms
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
        <div className="content">
          <ol>
            <li>Tell me about a single-page application you've written or worked on</li>
            <li>Why would you use Await over Promises?</li>
          </ol>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-text" onClick={this.redirectBack}>Back to {Store.namePlural}</button>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Single)
