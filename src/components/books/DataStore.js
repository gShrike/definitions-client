import DataStore from '../datastore/index'
import Model from './Model'
import mockData from './mockData'

class BooksDataStore extends DataStore.Crud {

  name = `Book`
  namePlural = `Books`
  uri = `books`
  mockData = mockData

  setCurrentBook(book) {
    this.currentBook = new Model(book)
    console.log('Current Book:', this.currentBook)
  }

  getCurrentBook() {
    return this.currentBook
  }

  clearCurrentBook() {
    if (this.currentBook) {
      this.currentBook = null
      console.log('Cleared Current Book')
    }
  }

}

export default new BooksDataStore()
