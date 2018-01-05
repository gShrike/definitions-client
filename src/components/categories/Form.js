import React from 'react'
import Categories from '../../db/Categories'
import { withRouter } from 'react-router-dom'

class Form extends React.Component {

  onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(this.refs.form)

    Categories.create({
      name: formData.get('name')
    }).then(x => {
      this.props.history.push(`/categories/`)
    })
  }

  render() {
    return (
      <form ref="form" className="section" onSubmit={this.onSubmit}>
        <div className="field">
          <label htmlFor="name" className="label">Name</label>
          <input type="text" className="input" name="name" />
        </div>
        <button type="submit" className="button is-success is-outlined">Save</button>
      </form>
    )
  }
}

export default withRouter(Form)
