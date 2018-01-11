import React from 'react'
import DataStore from './DataStore'
import { withRouter } from 'react-router-dom'
import Buttons from '../buttons/index'
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

    DataStore.getById(id).then(item => {
      this.setState({ item })
    })
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
          <h1 className="subtitle">Answer</h1>
          <h2 className="title is-4">{item.answer || <em>None provided</em>}</h2>
        </section>

        <hr/>

        <section className="section topics-marker">
          <h1 className="subtitle">
            Topics
            <Buttons.Manage />
          </h1>
          <div className="buttons">
            <span className="button is-medium">Async</span>
            <span className="button is-medium">AJAX</span>
          </div>
        </section>

        <hr/>

        <section className="section terms-marker">
          <h1 className="subtitle">
            Terms
            <Buttons.Manage />
          </h1>
          <div className="buttons">
            <span className="button is-medium">Async</span>
            <span className="button is-medium">AJAX</span>
          </div>
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
