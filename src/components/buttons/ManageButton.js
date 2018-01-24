import React from 'react'

class ManageButton extends React.Component {

  render() {
    return (
      <button className="button is-small is-white" onClick={this.props.onManage}><span className="fa fa-sliders"></span></button>
    )
  }

}

ManageButton.defaultProps = {
  onManage() {}
}

export default ManageButton
