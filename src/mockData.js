import Terms from 'components/terms/index'
import Topics from 'components/topics/index'
import Questions from 'components/questions/index'

const mockTerms = Terms.DataStore.mockData
const mockTopics = Topics.DataStore.mockData
const mockQuestions = Questions.DataStore.mockData

const mock = {
  terms: {
    getAll: jest.fn(() => Promise.resolve(mockTerms)),
    items: mockTerms
  },
  topics: {
    getAll: jest.fn(() => Promise.resolve(mockTopics)),
    items: mockTerms
  },
  questions: {
    getAll: jest.fn(() => Promise.resolve(mockQuestions)),
    items: mockQuestions
  }
}

export default mock