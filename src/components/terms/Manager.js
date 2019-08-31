import React from 'react'
import { withRouter } from 'react-router-dom'
import Buttons from '../buttons/index'
import DataStore from './DataStore'
import AddRemoveForm from './AddRemoveForm'

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
    const { terms } = this.props

    return newlySelected || terms
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

  onButtonClick = (term) => {
    if (this.state.formOpen) {
      this.removeFromSelected(term)
    }
    else {
      this.props.history.push(DataStore.getClientUrl(`/${term.id}`))
    }
  }

  removeFromSelected = (term) => {
    const terms = this.getCurrentList()

    this.setState({
      newlySelected: terms.filter(selected => selected.name !== term.name)
    })
  }

  renderList = () => {
    const terms = this.getCurrentList()

    if (terms.length === 0) {
      return <em>None selected</em>
    }

    return terms.map(term => {
      return <button key={term.name} className="button is-medium terms-button" onClick={() => this.onButtonClick(term)}>{term.name}</button>
    })
  }

  renderForm = () => {
    if (this.state.formOpen) {
      return <AddRemoveForm selectedItems={this.getCurrentList()} onUpdate={this.onFormUpdate} onCancel={this.onFormCancel} onSave={this.onFormSave} lastUpdated={this.props.lastUpdated} />
    }

    return null
  }

  render() {
    return (
      <section>
        <h1 className="subtitle">
          Terms
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
  terms: [],
  lastUpdated: new Date() - (90/*days*/*24*60*60*1000),
  onSave() {},
  onLoad() { return Promise.reject(`No callback supplied`) }
}

export default withRouter(Manager)
