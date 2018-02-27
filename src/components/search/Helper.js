// Usage:
//   const engine = new Search.Helper(data, options)
//   engine.search(`how`)
//
//   const engine = new Search.Helper(data, { keys: ['title'] })
//   engine.search(`js`)

import Fuse from 'fuse.js'

class SearchHelper {

  constructor(data, options = {}) {
    this.engine = new Fuse(data, options)
    this.search = this.engine.search.bind(this.engine)
  }

}

export default SearchHelper
