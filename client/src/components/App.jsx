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
    const testNumber = Math.floor(Math.random() * 100 + 1);
    this.getReviews(testNumber);
    this.getReviewScores(testNumber);
    this.getReviewOverall(testNumber);
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
          cleanliness: data[0].total_cleanliness.toFixed(1),
          accuracy: data[0].total_accuracy.toFixed(1),
          communication: data[0].total_communication.toFixed(1),
          location: data[0].total_location.toFixed(1),
          checkIn: data[0].total_check_in.toFixed(1),
          value: data[0].total_value.toFixed(1)
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
          overall: Number((data[0].total_score).toFixed(2)),
          totalReviews: data[0].total_reviews
        });
      }
    });
  }

  render() {
    return (
      <div>
        <h3 id="overview">
          <span id="star">★</span>{this.state.overall} <span>({this.state.totalReviews} reviews)</span>
        </h3>
        <table id="scoresTable">
          <Scores cleanliness={this.state.cleanliness} accuracy={this.state.accuracy} communication={this.state.communication} location={this.state.location} checkIn={this.state.checkIn} value={this.state.value} />
        </table>
        <table>
          <Reviews reviews={this.state.reviews} totalReviews={this.state.totalReviews} />
        </table>
        <div>
          <button id="reviewsButton">Show all {this.state.totalReviews} reviews</button>
        </div>
      </div>
    );
  }
}

export default App;
