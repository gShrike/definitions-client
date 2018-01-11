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
      headers: {'Content-Type':'application/json'},
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

export default TopicsDataStore
