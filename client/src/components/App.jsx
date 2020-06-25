import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';
import styles from '../styles/style.css';

import Reviews from './Reviews.jsx';
import Scores from './Scores.jsx';
import ModalReviews from './Modal/ModalReviews.jsx';

Modal.setAppElement('#reviews');

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
      value: 0,
      modal: false
    };

    this.hideReviews = this.hideReviews.bind(this);
    this.showReviews = this.showReviews.bind(this);
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
      success: (data) => {
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
      success: (data) => {
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
      success: (data) => {
        this.setState({
          overall: (data[0].total_score).toFixed(2),
          totalReviews: data[0].total_reviews
        });
      }
    });
  }
  // END OF HTTP REQUESTS

  showReviews() {
    this.setState({
      modal: true
    });
  }

  hideReviews() {
    this.setState({
      modal: false
    });
  }

  render() {
    return (
      <div>
        <Modal id="modalReviews" isOpen={this.state.modal} onRequestClose={this.hideReviews} style={{ overlay: { backgroundColor: 'rgba(18, 16, 10, 0.5)' }, content: { borderRadius: '20px' } }}>
          <ModalReviews
            reviews={this.state.reviews}
            hideModal={this.hideReviews}
            overall={this.state.overall}
            totalReviews={this.state.totalReviews}
            cleanliness={this.state.cleanliness}
            accuracy={this.state.accuracy}
            communication={this.state.communication}
            location={this.state.location}
            checkIn={this.state.checkIn}
            value={this.state.value}
          />
        </Modal>
        <h3 id="overview">
          <span id="star">★</span>{this.state.overall} <span>({this.state.totalReviews} reviews)</span>
        </h3>
        <table id="scoresTable">
          <Scores
            cleanliness={this.state.cleanliness}
            accuracy={this.state.accuracy}
            communication={this.state.communication}
            location={this.state.location}
            checkIn={this.state.checkIn}
            value={this.state.value}
          />
        </table>
        <table>
          <Reviews reviews={this.state.reviews} totalReviews={this.state.totalReviews} />
        </table>
        <div>
          <button id="reviewsButton" type="button" onClick={this.showReviews}> Show all {this.state.totalReviews} reviews </button>
        </div>
      </div>
    );
  }
}

export default App;
