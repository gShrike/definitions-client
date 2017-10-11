import React from 'react';
import { Link } from 'react-router-dom';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { terms: [] };
  }

  componentDidMount() {
    fetch('https://galvanize-definitions-api.herokuapp.com/terms')
      .then(res => res.json())
      .then(data => {
        this.setState({ terms: data });
      });
  }
  render() {
    return (
      <ul>
        {this.state.terms.map(term => {
          return (
            <li key={term.id}>
              <Link to={`/terms/${term.id}`}>{term.name}</Link>{' '}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default List;
