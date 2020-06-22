import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      scores: null,
      overall: null
    };
  }

  componentDidMount() {

  }

  // HTTP REQUESTS
  getReviews(roomId) {
    let url = `api/${roomId}/reviews`;
    $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/json',
      success: data => {
        this.setState({ reviews: data });
      }
    });
  }

  getReviewScores(roomId) {
    let url = `api/${roomId}/reviews/scores`;
    $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/json',
      success: data => {
        this.setState({ scores: data });
      }
    });
  }

  getReviewOverall(roomId) {
    let url = `api/${roomId}/reviews/overall`;
    $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/json',
      success: data => {
        this.setState({ overall: data });
      }
    });
  }

  render() {
    return(
      <div>
        <h3>{this.state.value}</h3>
      </div>
    );
  }
}

export default App;
