import React from 'react'
import Store from './DataStore'
import { withRouter } from 'react-router-dom'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      item: null
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    Store.getById(id).then(item => {
      this.setState({ item })
    })
  }

  delete = (e) => {
    if (window.confirm(`This will delete the ${Store.name}`)) {
      const { id } = this.state.item

      Store.delete(id).then(x => {
        this.redirectBack()
      })
    }
  }

  redirectBack = () => {
    this.props.history.push(Store.getClientUrl())
  }

  render() {
    const { item } = this.state

    if (!item) {
      return null
    }

    return (
      <div className="section">
        <h1 className="subtitle">{Store.name}</h1>
        <h2 className="title">{item.name}</h2>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-text" onClick={this.redirectBack}>Back to {Store.namePlural}</button>
          </div>
          <div className="control">
            <button className="button is-outlined is-danger" onClick={this.delete}>Delete</button>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Single)
