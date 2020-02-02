import Terms from '../terms/index'
import Topics from '../topics/index'
import Questions from '../questions/index'

const Term = Terms.DataStore
const Topic = Topics.DataStore
const Question = Questions.DataStore

class BookModel {

  props = [
    'id',
    'name',
    'icon',
    'public',
    'owner_id',
    'terms',
    'topics',
    'questions',
    'term_topic',
    'question_topic',
    'question_term'
  ]

  constructor(book = {}) {
    this.props.forEach(prop => {
      if (prop in book) {
        this[prop] = book[prop]
      }
    })

    // HACK: attach book id to stores
    Topics.DataStore.bookId = book.id
    Terms.DataStore.bookId = book.id
    Questions.DataStore.bookId = book.id
  }

  // helpers



  // CRUD actions

  addTerm(term) {
    return Term.create(term).then(results => {
      console.log('Added Term:', ...results)
      this.terms.push(...results)
      return results
    })
  }

  updateTerm(term) {
    return Term.update(term).then(results => {
      console.log('Updated Term:', ...results)
      this.terms.forEach(t => {
        if (t.id === term.id) {
          Object.assign(t, term)
        }
      })

      return results
    })
  }

  addTopic(topic) {
    return Topic.create(topic).then(results => {
      console.log('Added Topic:', ...results)
      this.topics.push(...results)
      return results
    })
  }

  updateTopic(topic) {
    return Topic.update(topic).then(results => {
      console.log('Updated Topic:', ...results)
      this.topics.forEach(t => {
        if (t.id === topic.id) {
          Object.assign(t, topic)
        }
      })

      return results
    })
  }

  addQuestion(question) {
    return Question.create(question).then(results => {
      console.log('Added Question:', ...results)
      this.questions.push(...results)
      return results
    })
  }

  updateQuestion(question) {
    return Question.update(question).then(results => {
      console.log('Updated Question:', ...results)
      this.questions.forEach(q => {
        if (q.id === question.id) {
          Object.assign(q, question)
        }
      })

      return results
    })
  }

}

export default BookModel