import DataStore from '../datastore/index'
import mockData from './mockData'

class BooksDataStore extends DataStore.Crud {

  name = `Book`
  namePlural = `Books`
  uri = `books`
  mockData = mockData

}

export default new BooksDataStore()
