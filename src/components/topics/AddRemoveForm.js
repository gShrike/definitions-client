import React from 'react'
import DataStore from './DataStore'
import Buttons from '../buttons/index'
import Settings from '../settings/index'

class AddRemoveForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errorMessage: null,
      items: [],
      filteredItems: [],
      recentOnly: Settings.UserSettings.getSettings().addRemoveRecentOnly || false
    }
  }

  componentDidMount() {
    DataStore.getAll()
      .then( items => this.setState({ items, filteredItems: this.state.recentOnly ? this.getRecentItems(items) : items }) )
      .catch( error => this.setState({ error }) )
  }

  onSubmit = (e) => {
    e.preventDefault()

    this.props.onSave(this.props.selectedTopics)
  }

  getErrorMessage() {
    return this.state.errorMessage ? <span className="help is-danger is-inline">{this.state.errorMessage}</span> : null
  }

  addItem = (item) => {
    const { selectedItems } = this.props

    this.props.onUpdate(selectedItems.concat(item))
  }

  getRecentItems = (items = []) => {
    return items.filter(item => new Date(item.updated_at) > new Date(this.props.lastUpdated))
  }

  toggleRecentOnly = (e) => {
    e.preventDefault()
    const { items } = this.state
    const recentOnly = !this.state.recentOnly
    const filteredItems = recentOnly ? this.getRecentItems(items) : items
    
    this.setState({
      filteredItems,
      recentOnly
    })

    Settings.UserSettings.saveSettings({
      ...Settings.UserSettings.getSettings(),
      addRemoveRecentOnly: recentOnly
    })
  }

  renderAvailable = () => {
    const selectedItemValues = this.props.selectedItems.map(item => item.name)
    const { filteredItems, recentOnly } = this.state

    const availableFilteredItems = filteredItems.filter(item => {
      // Don't include selected items
      return !(selectedItemValues.indexOf(item.name) > -1)
    })

    if (!availableFilteredItems.length) {
      return <em>No {recentOnly && `Recent`} Matches</em>
    }

    return availableFilteredItems.map(item => {
      return <button key={item.name} className="button" onClick={() => this.addItem(item)}>{item.name}</button>
    })
  }

  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <div className="field">
          <h2 className="subtitle">Available Topics {this.getErrorMessage()} <Buttons.RecentlyUpdated onToggle={this.toggleRecentOnly} recentOnly={this.state.recentOnly} /></h2>
          <div className="buttons">
            {this.renderAvailable()}
          </div>
        </div>

        <div className="field is-grouped actions">
          <div className="control">
            <button type="button" className="button is-text" onClick={this.props.onCancel}>Cancel</button>
          </div>
          <div className="control">
            <button type="submit" className="button is-success is-outlined">Save</button>
          </div>
        </div>
      </form>
    )
  }
}

AddRemoveForm.defaultProps = {
  lastUpdated: new Date() - (90/*days*/*24*60*60*1000),
  selectedItems: [],
  onCancel() {},
  onSave() {},
  onUpdate() {}
}

export default AddRemoveForm
