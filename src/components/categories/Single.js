import React from 'react'
import Categories from '../../db/Categories'
import { withRouter } from 'react-router-dom'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      category: null
    }
  }

  componentDidMount() {
    Categories.getById(this.props.match.params.id).then(category => {
      this.setState({ category })
    })
  }

  delete = (e) => {
    if (window.confirm(`This will delete the Category`)) {
      Categories.delete(this.state.category.id).then(x => {
        this.redirectBack()
      })
    }
  }

  redirectBack = () => {
    this.props.history.push(`/categories/`)
  }

  render() {
    const { category } = this.state

    if (!category) {
      return null
    }

    return (
      <div className="section">
        <h1 className="subtitle">Category</h1>
        <h2 className="title">{category.name}</h2>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-text" onClick={this.redirectBack}>Back to Categories</button>
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
