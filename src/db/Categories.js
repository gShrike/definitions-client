import config from '../config'

export default {

  getAll() {
    return fetch(`${config.API_URL}/categories`)
      .then(res => {
        return res.json().then(data => {
          if (res.ok) {
            return data
          }

          throw new Error(data.message)
        })
      })
  },

  create(newEntry) {
    return fetch(`${config.API_URL}/categories`, {
      method: `POST`,
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newEntry)
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  },

  getById(id) {
    return fetch(`${config.API_URL}/categories/${id}`).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  },

  delete(id) {
    return fetch(`${config.API_URL}/categories/${id}`, {
      method: `delete`
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
