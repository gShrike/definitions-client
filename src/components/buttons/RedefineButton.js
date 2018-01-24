import React from 'react'

class RedefineButton extends React.Component {

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
            <a href="javascript:void(0)" className="dropdown-item" onClick={this.props.onRedefine}>Redefine</a>
          </div>
        </div>
      </div>
    )
  }
}

RedefineButton.defaultProps = {
  onRedefine() {}
}

export default RedefineButton
