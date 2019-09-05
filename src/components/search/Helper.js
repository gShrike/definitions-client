// Usage:
//   const engine = new Search.Helper(data, options)
//   engine.search(`how`)
//
//   const engine = new Search.Helper(data, { keys: ['title'] })
//   engine.search(`js`)

import Fuse from 'fuse.js'

class SearchHelper {

  defaultOptions = {
    threshold: 0.4,
    tokenize: true
  }

  constructor(data, options = {}) {
    this.engine = new Fuse(data, Object.assign({}, this.defaultOptions, options))
    this.search = this.engine.search.bind(this.engine)
  }

}

export default SearchHelper
