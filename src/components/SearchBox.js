import React from 'react'

class SearchBox extends React.Component {

  onKeyUp = () => {
    this.props.onChange(this.refs.search.value)
  }

  render() {
    const { type } = this.props

    return (
      <form className="is-pulled-right">
        <div className="control has-icons-right">
          <input ref="search" className="input is-large" name="search" placeholder={`Search ${type}`} onKeyUp={this.onKeyUp} />
          <span className="icon is-medium is-right">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </form>
    )
  }

}

SearchBox.defaultProps = {
  type: ``,
  onChange() {}
}

export default SearchBox
