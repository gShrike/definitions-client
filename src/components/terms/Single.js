import React from 'react'
import TermsStore from './DataStore'
import { withRouter } from 'react-router-dom'
import RenameDeleteButton from '../RenameDeleteButton'
import AddRemoveButton from '../AddRemoveButton'

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
        <h1 className="subtitle">
          Term
          <RenameDeleteButton onDelete={this.delete} />
        </h1>
        <h2 className="title">{term.name}</h2>

        <hr/>

        <h1 className="subtitle">
          Topics
          <AddRemoveButton />
        </h1>
        <div className="buttons">
          <span className="button is-medium">Async</span>
          <span className="button is-medium">AJAX</span>
        </div>

        <hr/>

        <h1 className="subtitle">
          Questions
          <AddRemoveButton />
        </h1>
        <div className="content">
          <ol>
            <li>Tell me about a single-page application you've written or worked on</li>
            <li>Why would you use Await over Promises?</li>
          </ol>
        </div>



        <div className="field is-grouped">
          <div className="control">
            <button className="button is-text" onClick={this.redirectBack}>Back to Terms</button>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Single)
