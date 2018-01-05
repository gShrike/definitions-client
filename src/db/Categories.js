import config from '../config'

export default {

  getAll() {
    return fetch(`${config.API_URL}/categories`)
      .then(res => res.json())
  },

  create(newEntry) {
    return fetch(`${config.API_URL}/categories`, {
      method: `POST`,
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newEntry)
    }).then(res => res.json())
  }

}
