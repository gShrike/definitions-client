import React from 'react'
import Buttons from '../buttons/index'
// import Settings from '../settings/index'
import utils from 'utils'

class AddRemoveForm extends React.Component {

  state = {
    errorMessage: null,
    items: [],
    filteredItems: [],
    recentOnly: /*Settings.UserSettings.getSettings().addRemoveRecentOnly ||*/ false
  }

  componentWillMount() {
    const { fetchItems } = this.props

    fetchItems()
      .then( items => this.setState({ items, filteredItems: this.state.recentOnly ? this.getRecentItems(items) : items }) )
      .catch( error => this.setState({ error }) )
  }

  onSubmit = (e) => {
    const { onSave, selectedItems } = this.props
    e.preventDefault()

    onSave(selectedItems)
  }

  getErrorMessage() {
    const { errorMessage } = this.state

    return errorMessage ? <span className="help is-danger is-inline">{errorMessage}</span> : null
  }

  addItem = (item) => {
    const { onUpdate, selectedItems } = this.props

    onUpdate(selectedItems.concat(item))
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

    // Settings.UserSettings.saveSettings({
    //   ...Settings.UserSettings.getSettings(),
    //   addRemoveRecentOnly: recentOnly
    // })
  }

  renderAvailable = () => {
    const { labelProp } = this.props
    const selectedItemValues = this.props.selectedItems.map(item => item[labelProp])
    const { filteredItems, recentOnly } = this.state

    const availableFilteredItems = filteredItems.filter(item => {
      // Don't include selected items
      return !(selectedItemValues.indexOf(item[labelProp]) > -1)
    })

    if (!availableFilteredItems.length) {
      return <em>No {recentOnly && `Recent`} Matches</em>
    }

    return availableFilteredItems.map(item => {
      return <button data-test={`item-button`} key={item[labelProp]} className="button" onClick={() => this.addItem(item)}>{utils.codeToText(item[labelProp])}</button>
    })
  }

  render() {
    const { onCancel, title } = this.props
    const { recentOnly } = this.state

    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <div className="field">
          <h2 className="subtitle"><span data-test="title">{title}</span> {this.getErrorMessage()} <Buttons.RecentlyUpdated onToggle={this.toggleRecentOnly} recentOnly={recentOnly} /></h2>
          <div className="buttons">
            {this.renderAvailable()}
          </div>
        </div>

        <div className="field is-grouped actions">
          <div className="control">
            <button type="button" className="button is-text" onClick={onCancel}>Cancel</button>
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
  title: `Available Items`,
  labelProp: `name`, // item.name
  lastUpdated: new Date() - (90/*days*/*24*60*60*1000),
  selectedItems: [],
  fetchItems() { return Promise.reject('No fetchItems() given') },
  onCancel() {},
  onSave() {},
  onUpdate() {}
}

export default AddRemoveForm
