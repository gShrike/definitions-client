import React from 'react'

const mockQuestions = [
  { title: `Tell me about a single-page application you've written or worked on` },
  { title: `Why would you use Await over Promises?` },
  { title: `What color is the JavaScript logo?` },
  { title: `Why would you use JavaScript over CSS?` },
  { title: `How many chains are too many?` },
  { title: `Describe the box model` }
]

class OrderedList extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showAll: false
    }
  }

  showAll = () => {
    this.setState({
      showAll: true
    })
  }

  render() {
    const { limit } = this.props
    const { showAll } = this.state
    const questions = Array.from(mockQuestions)
    let showAllButton

    if (!showAll && questions.length > limit) {
      showAllButton = <button className="button is-text" onClick={this.showAll}>Show All {questions.length} Questions</button>

      questions.splice(limit)
    }

    return (
      <div className="expandable-ordered-list content">
        <ol>
          {questions.map(question => {
            return <li key={question.title}>{question.title}</li>
          })}
        </ol>
        {showAllButton}
      </div>
    )
  }

}

OrderedList.defaultProps = {
  limit: 5
}

export default OrderedList
