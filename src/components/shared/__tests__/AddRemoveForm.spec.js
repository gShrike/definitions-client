import React from 'react'
import AddRemoveForm from '../AddRemoveForm'
import { shallow } from 'enzyme'
import mockData from 'mockData'

describe('<AddRemoveForm />', () => {
  let wrapper
  const mockProps = {
    terms: {
      title: 'Mock Terms',
      // labelProp: 'name', // default
      fetchItems: () => mockData.terms.getAll()
    },
    questions: {
      title: 'Mock Questions',
      labelProp: 'title',
      fetchItems: () => mockData.questions.getAll()
    }
  }

  beforeEach(() => {
    wrapper = shallow(<AddRemoveForm {...mockProps.terms} />)
  })

  it('should render props.title', () => {
    const result = wrapper.find({ 'data-test': 'title' }).text()
    expect(result).toBe(mockProps.terms.title)
  })

  it('should call props.fetchItems() and save result', () => {
    const results = wrapper.state('items')
    expect(mockData.terms.getAll).toHaveBeenCalledTimes(1)
    expect(results).toBe(mockData.terms.items)
  })

  it('should use props.labelProp on button', (done) => {
    // confirms labelProp default of 'name' and custom value 'title'
    let results = wrapper.find({ 'data-test': 'item-button' })
    expect(results.first().render().text()).toBe(mockData.terms.items[0].name)
    
    wrapper = shallow(<AddRemoveForm {...mockProps.questions} />)
    setTimeout(() => {
      results = wrapper.find({ 'data-test': 'item-button' })
      expect(results.first().render().text()).toBe(mockData.questions.items[0].title)
      done()
    })
  })

})