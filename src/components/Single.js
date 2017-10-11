import React from 'react';
import { Link } from 'react-router-dom';

class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: {} };
  }

  componentDidMount() {
    fetch('https://galvanize-definitions-api.herokuapp.com/terms/' + this.props.match.params.id)
      .then(res => res.json())
      .then(data => {
        this.setState({ term: data[0] });
      });
  }
  render() {
    return (
      <div>
        <h1>{this.state.term.name} </h1>
        <h2>{this.state.term.id} </h2>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Single;
