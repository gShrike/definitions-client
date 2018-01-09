import React from 'react'

class SearchBox extends React.Component {

  onKeyUp = () => {
    this.props.onChange(this.refs.search.value)
  }

  render() {
    return (
      <form className="is-pulled-right">
        <div className="control has-icons-right">
          <input ref="search" className="input is-large" name="search" placeholder="Search Terms" onKeyUp={this.onKeyUp} />
          <span className="icon is-medium is-right">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </form>
    )
  }

}

SearchBox.defaultProps = {
  onChange() {}
}

export default SearchBox
