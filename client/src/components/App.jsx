import React from 'react';
import $ from 'jquery';

import Reviews from './Reviews.jsx';
import Scores from './Scores.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      overall: 0,
      totalReviews: 0,
      cleanliness: 0,
      accuracy: 0,
      communication: 0,
      location: 0,
      checkIn: 0,
      value: 0
    };
  }

  componentDidMount() {
    this.getReviews(10);
    this.getReviewScores(10);
    this.getReviewOverall(10);
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
        this.setState({
          cleanliness: Number(data[0].total_cleanliness.toFixed(1)),
          accuracy: Number(data[0].total_accuracy.toFixed(1)),
          communication: Number(data[0].total_communication.toFixed(1)),
          location: Number(data[0].total_location.toFixed(1)),
          checkIn: Number(data[0].total_check_in.toFixed(1)),
          value: Number(data[0].total_value.toFixed(1))
        });
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
        this.setState({
          overall: Number((data[0].total_score / 2).toFixed(2)),
          totalReviews: data[0].total_reviews
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h3>
          {this.state.overall} <span>({this.state.totalReviews} reviews)</span>
        </h3>
        <div>
          <Scores cleanliness={this.state.cleanliness} accuracy={this.state.accuracy} communication={this.state.communication} location={this.state.location} checkIn={this.state.checkIn} value={this.state.value} />
        </div>
        <div>
          <Reviews reviews={this.state.reviews} totalReviews={this.state.totalReviews} />
        </div>
        <div>
          <button>Show all {this.state.totalReviews} reviews</button>
        </div>
      </div>
    );
  }
}

export default App;
