import React from 'react'

class ShowHideButton extends React.Component {

  render() {
    const visible = this.props.visible ? `` : `-slash`

    return (
      <button type="button" className="button is-small is-white" onClick={this.props.onToggle}><span className={`fa fa-eye${visible}`}></span></button>
    )
  }
}

ShowHideButton.defaultProps = {
  visible: false,
  onToggle() {}
}

export default ShowHideButton
