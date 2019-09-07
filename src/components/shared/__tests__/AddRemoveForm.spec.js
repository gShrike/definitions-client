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
  const fetchItemsFailure = jest.fn(() => Promise.reject(new Error('Fetching Failed')))

  beforeEach(() => {
    wrapper = shallow(<AddRemoveForm {...mockProps.terms} />)
  })

  it('should render props.title', () => {
    const result = wrapper.find({ 'data-test': 'title' }).text()
    expect(result).toBe(mockProps.terms.title)
  })

  it('should call props.fetchItems() and save result', () => {
    const results = wrapper.state('items')
    expect(wrapper.find({ 'data-test': 'error-message' }).text()).toBe('')
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

  it('should show an error message when props.fetchItems() fails', (done) => {
    const failedProps = {
      ...mockProps.questions,
      fetchItems: fetchItemsFailure
    }
    wrapper = shallow(<AddRemoveForm {...failedProps} />)
    setTimeout(() => {
      const results = wrapper.find({ 'data-test': 'error-message' })
      expect(fetchItemsFailure).toHaveBeenCalledTimes(1)
      expect(results.text()).toBe('Fetching Failed')
      done()
    })
  })

  it('should call the onCancel() callback when cancel is clicked')

  it('should call the onSave() callback when save is clicked')

  it('should call the onUpdate() callback when an item is added')

  it('should toggle recentOnly when toggle is clicked')

  it('should show recent items only when recentOnly is true')

  it('should show a message when no matches are found')

  it('should not render buttons for the selectedItems')

  it('should not render HTML in labels buttons')

})