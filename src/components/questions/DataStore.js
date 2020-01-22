import DataStore from '../datastore/index'
import mockData from './mockData'

class QuestionsDataStore extends DataStore.Crud {

  name = `Question`
  namePlural = `Questions`
  uri = `questions`
  mockData = mockData

  getTopicsForQuestion(id) {
    return fetch(this.getApiUrl(`/${id}/topics`), {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  updateTopicsForQuestion(id, topics) {
    return fetch(this.getApiUrl(`/${id}/topics`), {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(topics)
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  getTermsForQuestion(id) {
    return fetch(this.getApiUrl(`/${id}/terms`), {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  updateTermsForQuestion(id, terms) {
    return fetch(this.getApiUrl(`/${id}/terms`), {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(terms)
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

}

export default new QuestionsDataStore()
