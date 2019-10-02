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

  beforeEach(async () => {
    wrapper = await shallow(<AddRemoveForm {...mockProps.terms} />)
    window.localStorage.clear()
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

  it('should use props.labelProp on button', async () => {
    // confirms labelProp default of 'name' and custom value 'title'
    let results = wrapper.find({ 'data-test': 'item-button' })
    expect(results.first().render().text()).toBe(mockData.terms.items[0].name)
    
    wrapper = await shallow(<AddRemoveForm {...mockProps.questions} />)
    await wrapper.update()

    results = wrapper.find({ 'data-test': 'item-button' })
    expect(results.first().render().text()).toBe(mockData.questions.items[0].title)
  })

  it('should show an error message when props.fetchItems() fails', async () => {
    const failedProps = {
      ...mockProps.questions,
      fetchItems: fetchItemsFailure
    }

    wrapper = await shallow(<AddRemoveForm {...failedProps} />)
    await wrapper.update()

    const results = wrapper.find({ 'data-test': 'error-message' })
    expect(fetchItemsFailure).toHaveBeenCalledTimes(1)
    expect(results.text()).toBe('Fetching Failed')
  })

  it('should call the onCancel() callback when cancel is clicked')

  it('should call the onSave() callback when save is clicked')

  it('should call the onUpdate() callback when an item is added')

  it('should toggle recentOnly when toggle is clicked')

  it('should show recent items only when recentOnly is true')

  it('should show a message when no matches are found', async () => {
    const emptyItemsProps = {
      ...mockProps.questions,
      fetchItems: () => Promise.resolve([])
    }

    wrapper = await shallow(<AddRemoveForm {...emptyItemsProps} />)
    await wrapper.update()

    let result = wrapper.find({ 'data-test': 'none-available-message' })
    expect(result.length).toBe(1)
    expect(result.text()).toBe('No  Matches')

    wrapper.instance().toggleRecentOnly({ preventDefault: jest.fn() })
    result = wrapper.find({ 'data-test': 'none-available-message' })
    expect(result.length).toBe(1)
    expect(result.text()).toBe('No Recent Matches')
  })

  it('should not render buttons for the selectedItems')

  it('should not render HTML in button labels', async () => {
    const failedProps = {
      ...mockProps.questions,
      fetchItems: () => Promise.resolve([{ title: '<script> tags not allowed' }])
    }

    wrapper = await shallow(<AddRemoveForm {...failedProps} />)
    await wrapper.update()

    const result = wrapper.find({ 'data-test': 'item-button' })
    expect(result.length).toBe(1)
    expect(result.render().html()).toBe('<span>&lt;script&gt; tags not allowed</span>')
  })

})