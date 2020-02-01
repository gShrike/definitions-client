import DataStore from '../datastore/index'
import mockData from './mockData'

import Terms from '../terms/index'
import Topics from '../topics/index'
import Questions from '../questions/index'

const Term = Terms.DataStore
const Topic = Topics.DataStore
const Question = Questions.DataStore

class BooksDataStore extends DataStore.Crud {

  name = `Book`
  namePlural = `Books`
  uri = `books`
  mockData = mockData

  addTerm(term) {
    return Term.create(term).then(results => {
      console.log('Added Term:', ...results)
      this.currentBook.terms.push(...results)
      return results
    })
  }

  updateTerm(term) {
    return Term.update(term).then(results => {
      console.log('Updated Term:', ...results)
      this.currentBook.terms.forEach(t => {
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
      this.currentBook.topics.push(...results)
      return results
    })
  }

  updateTopic(topic) {
    return Topic.update(topic).then(results => {
      console.log('Updated Topic:', ...results)
      this.currentBook.topics.forEach(t => {
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
      this.currentBook.questions.push(...results)
      return results
    })
  }

  updateQuestion(question) {
    return Question.update(question).then(results => {
      console.log('Updated Question:', ...results)
      this.currentBook.questions.forEach(q => {
        if (q.id === question.id) {
          Object.assign(q, question)
        }
      })

      return results
    })
  }

}

export default new BooksDataStore()
