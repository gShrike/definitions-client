import React from 'react'
import AddRemoveForm from '../AddRemoveForm'
import { shallow } from 'enzyme'

const mockTerms = [{name:'Target'}]
const mockTermsFetchItems = () => Promise.resolve(mockTerms)

describe('<AddRemoveForm />', () => {
  const props = {
    title: 'Mock Title',
    fetchItems: mockTermsFetchItems,
  }
  const wrapper = shallow(<AddRemoveForm {...props} />)

  it('should render props.title', () => {
    const result = wrapper.find({ 'data-test': 'title' }).text()
    expect(result).toBe('Mock Title')
  })

  it('should call props.fetchItems() and save result', () => {
    const results = wrapper.state('items')
    expect(results).toBe(mockTerms)
  })

  it('should use props.labelProp on button', () => {
    const result = wrapper.find({ 'data-test': `button-${mockTerms[0].name}`})
    expect(result.length).toBe(1)
  })

})