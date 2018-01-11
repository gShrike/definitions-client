import DataStore from '../datastore/index'

class TermsDataStore extends DataStore.Crud {

  name = `Term`
  namePlural = `Terms`
  uri = `terms`

  getTopicsForTerm(id) {
    return fetch(this.getApiUrl(`/${id}/topics`)).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  updateTopicsForTerm(id, topics) {
    return fetch(this.getApiUrl(`/${id}/topics`), {
      method: `POST`,
      headers: {'Content-Type':'application/json'},
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

}

export default new TermsDataStore()
