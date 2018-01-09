import config from '../../config'

export default {

  name: `Question`,
  namePlural: `Questions`,
  uri: `questions`,

  getApiUrl(path = '') {
    return `${config.API_URL}/${this.uri}${path}`
  },

  getClientUrl(path = '/') {
    return `/${this.uri}${path}`
  },

  getAll() {
    return fetch(this.getApiUrl()).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  },

  create(newEntry) {
    return fetch(this.getApiUrl(), {
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
    return fetch(this.getApiUrl(`/${id}`)).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  },

  delete(id) {
    return fetch(this.getApiUrl(`/${id}`), {
      method: `delete`
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  },

  update(item) {
    return fetch(this.getApiUrl(`/${item.id}`), {
      method: `put`,
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(item)
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  },

  search(q) {
    return fetch(this.getApiUrl(`?q=${q}`)).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          return data
        }

        throw new Error(data.message)
      })
    })
  }

}
