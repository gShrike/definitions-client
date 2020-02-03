import Terms from '../terms/index'
import Topics from '../topics/index'
import Questions from '../questions/index'
import utils from 'utils'

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
    Topic.bookId = book.id
    Term.bookId = book.id
    Question.bookId = book.id
  }

  getTermById(id) {
    return this.terms.find(item => item.id === +id)
  }
  getTopicById(id) {
    return this.topics.find(item => item.id === +id)
  }
  getQuestionById(id) {
    return this.questions.find(item => item.id === +id)
  }

  // relation helpers
  // Topics
  getTermsForTopic(topic_id) {
    const relations = this.term_topic.filter(item => item.topic_id === +topic_id)
    return relations.map(rel => this.getTermById(rel.term_id)).sort(utils.sortByName)
  }
  getQuestionsForTopic(topic_id) {
    const relations = this.question_topic.filter(item => item.topic_id === +topic_id)
    return relations.map(rel => this.getQuestionById(rel.question_id)).sort(utils.sortByTitle)
  }
  // Terms
  getTopicsForTerm(term_id) {
    const relations = this.term_topic.filter(item => item.term_id === +term_id)
    return relations.map(rel => this.getTopicById(rel.topic_id)).sort(utils.sortByName)
  }
  getQuestionsForTerm(term_id) {
    const relations = this.question_term.filter(item => item.term_id === +term_id)
    return relations.map(rel => this.getQuestionById(rel.question_id)).sort(utils.sortByTitle)
  }
  // Questions
  getTermsForQuestion(question_id) {
    const relations = this.question_term.filter(item => item.question_id === +question_id)
    return relations.map(rel => this.getTermById(rel.term_id)).sort(utils.sortByName)
  }
  getTopicsForQuestion(question_id) {
    const relations = this.question_topic.filter(item => item.question_id === +question_id)
    return relations.map(rel => this.getTopicById(rel.topic_id)).sort(utils.sortByName)
  }


  // CRUD actions
  addTerm(term) {
    return Term.create(term).then(results => {
      console.log('Added Term:', ...results)
      this.terms.push(...results)
      this.terms.sort(utils.sortByName)
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
      this.topics.sort(utils.sortByName)
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
      this.questions.sort(utils.sortByTitle)
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