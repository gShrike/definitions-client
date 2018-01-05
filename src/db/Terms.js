import config from '../config'

export default {

  getAll() {
    return fetch(`${config.API_URL}/terms`)
      .then(res => res.json())
  }

}
