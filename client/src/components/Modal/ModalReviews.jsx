import React from 'react';
import ModalReviewsEntry from './ModalReviewsEntry.jsx';

class ModalReviews extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.hideModal();
  }

  render() {
    return (
      <div>
        {/* CLOSE MODAL BUTTON */}
        <header id="modalHeader">
          <div>
            <button id="modalButton" type="button" onClick={this.handleClick}> X </button>
          </div>
        </header>
        {/* OVERALL SCORE */}
        <div id="modalOverview">
          <span id="modalStar">★</span>{this.props.overall} <span>({this.props.totalReviews} reviews)</span>
        </div>
        {/* REVIEWS LIST */}
        <table id="modalTable">
          <tbody>
            {this.props.reviews.map(review => (
              <ModalReviewsEntry review={review} key={review._id} />
            ))}
          </tbody>
        </table>
        <table id="modalScores">
          <tbody>
            {/* CLEANLINESS SCORE */}
            <tr>
              <td className="modalScoreCell">
                Cleanliness
                <span className="modalScore">
                  {this.props.cleanliness}
                </span>
                <div className="modalScoreBar">
                  <div className="modalScoreRating" style={{ width: JSON.stringify(((Number(this.props.cleanliness)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            {/* ACCURACY SCORE */}
            <tr>
              <td className="modalScoreCell">
                Accuracy
                <span className="modalScore">
                  {this.props.accuracy}
                </span>
                <div className="modalScoreBar">
                  <div className="modalScoreRating" style={{ width: JSON.stringify(((Number(this.props.accuracy)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            <tr>
              {/* COMMUNICATION SCORE */}
              <td className="modalScoreCell">
                Communication
                <span className="modalScore">
                  {this.props.communication}
                </span>
                <div className="modalScoreBar">
                  <div className="modalScoreRating" style={{ width: JSON.stringify(((Number(this.props.communication)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            {/* LOCATION SCORE */}
            <tr>
              <td className="modalScoreCell">
                Location
                <span className="modalScore">
                  {this.props.location}
                </span>
                <div className="modalScoreBar">
                  <div className="modalScoreRating" style={{ width: JSON.stringify(((Number(this.props.location)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            <tr>
              {/* CHECK-IN SCORE */}
              <td className="modalScoreCell">
                Check-in
                <span className="modalScore">
                  {this.props.checkIn}
                </span>
                <div className="modalScoreBar">
                  <div className="modalScoreRating" style={{ width: JSON.stringify(((Number(this.props.checkIn)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            {/* VALUE SCORE */}
            <tr>
              <td className="modalScoreCell">
                Value
                <span className="modalScore">
                  {this.props.value}
                </span>
                <div className="modalScoreBar">
                  <div className="modalScoreRating" style={{ width: JSON.stringify(((Number(this.props.value)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default ModalReviews;
