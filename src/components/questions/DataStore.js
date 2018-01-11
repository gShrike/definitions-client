import DataStore from '../datastore/index'

class QuestionsDataStore extends DataStore.Crud {

  name = `Question`
  namePlural = `Questions`
  uri = `questions`

}

export default new QuestionsDataStore()
