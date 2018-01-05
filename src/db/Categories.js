import config from '../config'

export default {

  getAll() {
    return fetch(`${config.API_URL}/categories`)
      .then(res => res.json())
  }

}
