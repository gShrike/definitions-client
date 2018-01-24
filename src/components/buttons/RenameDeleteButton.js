import React from 'react'

class RenameDeleteButton extends React.Component {

  render() {
    return (
      <span>
        <button className="button is-small is-white" onClick={this.props.onRename}><span className="fa fa-i-cursor"></span></button>
        <button className="button pull-right is-small is-danger is-outlined" onClick={this.props.onDelete}><span className="fa fa-trash-o"></span></button>
      </span>
    )
  }
}

RenameDeleteButton.defaultProps = {
  onDelete() {},
  onRename() {}
}

export default RenameDeleteButton
