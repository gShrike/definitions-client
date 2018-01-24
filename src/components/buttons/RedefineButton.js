import React from 'react'

class RedefineButton extends React.Component {

  render() {
    return (
      <button type="button" className="button is-small is-white" onClick={this.props.onRedefine}><span className="fa fa-i-cursor"></span></button>
    )
  }
}

RedefineButton.defaultProps = {
  onRedefine() {}
}

export default RedefineButton
