import React from 'react'
import TermsStore from './DataStore'
import { withRouter } from 'react-router-dom'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      term: null
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    TermsStore.getById(id).then(term => {
      this.setState({ term })
    })
  }

  delete = (e) => {
    if (window.confirm(`This will delete the Term`)) {
      TermsStore.delete(this.state.term.id).then(x => {
        this.redirectBack()
      })
    }
  }

  redirectBack = () => {
    this.props.history.push(TermsStore.getClientUrl())
  }

  render() {
    const { term } = this.state

    if (!term) {
      return null
    }

    return (
      <div className="section">
        <h1 className="subtitle">Term</h1>
        <h2 className="title">{term.name}</h2>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-text" onClick={this.redirectBack}>Back to Terms</button>
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
