import React from 'react'
import DataStore from './DataStore'
import { withRouter, Route, Switch, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Navbar from '../Navbar'
import Topics from '../topics/index'
import Terms from '../terms/index'
import Questions from '../questions/index'
import RenameForm from '../_shared/RenameForm'

class Single extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      item: null,
      renameFormOpen: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    const { bookId } = this.props.match.params

    DataStore.getById(bookId)
      .then(item => {
        DataStore.currentBook = item
        console.log('Current Book:', item)
        this.setState({ item })
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  delete = (e) => {
    if (window.confirm(`This will delete the ${DataStore.name}`)) {
      const { id } = this.state.item

      DataStore.delete(id).then(x => {
        this.redirectBack()
      })
    }
  }

  onRenameFormSave = () => {
    this.toggleRenameForm()
    this.loadData()
  }

  toggleRenameForm = () => {
    this.setState({
      renameFormOpen: !this.state.renameFormOpen
    })
  }

  onTermsUpdate = (newlySelected) => {
    DataStore.updateTermsForTopic(this.state.item.id, newlySelected)
      .then(x => this.setState({ terms: newlySelected }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  onQuestionsUpdate = (newlySelected) => {
    DataStore.updateQuestionsForTopic(this.state.item.id, newlySelected)
      .then(x => this.setState({ questions: newlySelected }))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  renderRenameForm = () => {
    if (this.state.renameFormOpen) {
      return <RenameForm topicId={this.state.item.id} value={this.state.item.name} onCancel={this.toggleRenameForm} onSave={this.onRenameFormSave} />
    }

    return null
  }

  redirectBack = () => {
    this.props.history.push(DataStore.getClientUrl())
  }

  render() {
    const { item: book, errorMessage } = this.state

    if (errorMessage) {
      return <p className="error-message-full-page"><strong className="has-text-danger">Error: {errorMessage}</strong></p>
    }
    
    if (!book) {
      return null
    }

    const bookMatchingPath = `/books/:bookId`
    const bookBasePath = bookMatchingPath.replace(':bookId', book.id)

    // HACK: attach book id to stores
    Topics.DataStore.bookId = book.id
    Terms.DataStore.bookId = book.id
    Questions.DataStore.bookId = book.id

    return (
      <main className="columns is-gapless">
        <Helmet>
          <title>{book.name} - Studybook</title>
        </Helmet>
        <aside className="column is-one-fifth">
          <h1 className="app-title">{book.icon && <i className={`fa ${book.icon} app-icon`} />}{book.name || 'Studybook'}</h1>
          <Route path={bookBasePath} component={() => <Navbar book={book} baseUrl={bookBasePath} />} />
          <Link to={`/books`} className="button is-text all-books-button"><i className="fa fa-chevron-left" /> All Books</Link>
        </aside>
        <section className="column">
          <Switch>
            <Route exact path={`${bookMatchingPath}/${Topics.DataStore.uri}`} component={Topics.List} />
            <Route exact path={`${bookMatchingPath}/${Topics.DataStore.uri}/new`} component={Topics.Form} />
            <Route exact path={`${bookMatchingPath}/${Topics.DataStore.uri}/:id`} component={Topics.Single} />

            <Route exact path={`${bookMatchingPath}/${Terms.DataStore.uri}`} component={Terms.List} />
            <Route exact path={`${bookMatchingPath}/${Terms.DataStore.uri}/new`} component={Terms.Form} />
            <Route exact path={`${bookMatchingPath}/${Terms.DataStore.uri}/:id`} component={Terms.Single} />

            <Route exact path={`${bookMatchingPath}/${Questions.DataStore.uri}`} component={Questions.List} />
            <Route exact path={`${bookMatchingPath}/${Questions.DataStore.uri}/new`} component={Questions.Form} />
            <Route exact path={`${bookMatchingPath}/${Questions.DataStore.uri}/:id`} component={Questions.Single} />
          </Switch>
        </section>
      </main>
    )
  }

}

export default withRouter(Single)
