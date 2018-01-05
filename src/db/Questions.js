import config from '../config'

export default {

  getAll() {
    return fetch(`${config.API_URL}/questions`)
      .then(res => res.json())
  }

}
