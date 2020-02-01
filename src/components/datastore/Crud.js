import Cookies from 'js-cookie'
import config from 'appConfig'

class CrudStore {

  name = `CrudStore`
  namePlural = `CrudStores`
  uri = `crudstore`
  token = Cookies.get('gToken')
  bookId

  items = []
  itemsById = {}

  getApiUrl(path = '') {
    return `${config.API_URL}${this.getBaseUrl(this.uri + path)}`
  }

  getBaseUrl(path = '') {
    return (this.bookId ? `/books/${this.bookId}/` : `/`) + path
  }

  getClientUrl(path = '/') {
    return `${this.getBaseUrl(this.uri + path)}`
  }

  getAll() {
    return fetch(this.getApiUrl(), {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).then(res => {
      if (res.status === 404) {
        throw new Error(`${this.namePlural} endpoint not found\n${this.getApiUrl()}`)
      }

      return res.json().then(data => {
        if (res.ok) {
          this.items = data
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  create(newEntry) {
    return fetch(this.getApiUrl(), {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(newEntry)
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          this.items.push(data)
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  getById(id) {
    return fetch(this.getApiUrl(`/${id}`), {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          this.itemsById[id] = data
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  delete(id) {
    return fetch(this.getApiUrl(`/${id}`), {
      method: `delete`,
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          this.items = this.items.filter(item => item.id !== id)
          delete this.itemsById[id]
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  update(item) {
    return fetch(this.getApiUrl(`/${item.id}`), {
      method: `put`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body: JSON.stringify(item)
    }).then(res => {
      return res.json().then(data => {
        if (res.ok) {
          this.itemsById[item.id] = data
          return data
        }

        throw new Error(data.message)
      })
    })
  }

  search(q) {
    return fetch(this.getApiUrl(`?q=${q}`), {
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

}

export default CrudStore
