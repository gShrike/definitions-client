import DataStore from '../datastore/index'

class TopicsDataStore extends DataStore.Crud {

  name = `Topic`
  namePlural = `Topics`
  uri = `topics`

  getTermsForTopic(id) {
    return fetch(this.getApiUrl(`/${id}/terms`)).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  updateTermsForTopic(id, terms) {
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

  getQuestionsForTopic(id) {
    return fetch(this.getApiUrl(`/${id}/questions`)).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  updateQuestionsForTopic(id, questions) {
    return fetch(this.getApiUrl(`/${id}/questions`), {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(questions)
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

export default new TopicsDataStore()
