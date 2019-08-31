import React from 'react'

class RecentlyUpdatedButton extends React.Component {

  render() {
    return (
      <button title={this.props.title} className="button is-small is-white admin-only" onClick={this.props.onToggle}><span className={`fa fa-history`}></span>&nbsp;{this.props.recentOnly ? `since last save` : `all`}</button>
    )
  }

}

RecentlyUpdatedButton.defaultProps = {
  recentOnly: false,
  title: 'Toggle Recent Only',
  onToggle() {}
}

export default RecentlyUpdatedButton
