import React from 'react'

class AddRemoveButton extends React.Component {

  render() {
    return (
      <div className="dropdown is-hoverable is-pulled-right is-right">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
            <span className="icon is-small">
              <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu4" role="menu">
          <div className="dropdown-content">
            <a href="javascript:void(0)" className="dropdown-item">
              Add
            </a>
            <a href="javascript:void(0)" className="dropdown-item">
              Remove
            </a>
          </div>
        </div>
      </div>
    )
  }

}

AddRemoveButton.defaultProps = {

}

export default AddRemoveButton
