import React from 'react'

class RenameDeleteButton extends React.Component {

  render() {
    return (
      <div className="dropdown is-hoverable is-pulled-right is-right">
        <div className="dropdown-trigger">
          <button className="button">
            <span className="icon is-small"><i className="fa fa-ellipsis-h"></i></span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu4" role="menu">
          <div className="dropdown-content">
            <a href="javascript:void(0)" className="dropdown-item" onClick={this.props.onRename}>Rename</a>
            <a href="javascript:void(0)" className="dropdown-item is-danger" onClick={this.props.onDelete}>Delete</a>
          </div>
        </div>
      </div>
    )
  }
}

RenameDeleteButton.defaultProps = {
  onDelete() {},
  onRename() {}
}

export default RenameDeleteButton
