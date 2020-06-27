import React from 'react';
import ModalReviewsEntry from './ModalReviewsEntry.jsx';
import styles from '../../styles/style.css';

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
        <header className={styles.modalHeader}>
          <div>
            <button className={styles.modalBtn} type="button" onClick={this.handleClick}> × </button>
          </div>
        </header>
        {/* OVERALL SCORE */}
        <div className={styles.modalOverview}>
          <span className={styles.modalStar}>★</span>{this.props.overall} <span>({this.props.totalReviews} reviews)</span>
        </div>
        {/* REVIEWS LIST */}
        <table className={styles.modalTable}>
          <tbody>
            {this.props.reviews.map(review => (
              <ModalReviewsEntry review={review} key={review._id} />
            ))}
          </tbody>
        </table>
        <table className={styles.modalScores}>
          <tbody>
            {/* CLEANLINESS SCORE */}
            <tr>
              <td className={styles.modalScoreCell}>
                Cleanliness
                <span className={styles.modalScore}>
                  {this.props.cleanliness}
                </span>
                <div className={styles.modalScoreBar}>
                  <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(this.props.cleanliness)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            {/* ACCURACY SCORE */}
            <tr>
              <td className={styles.modalScoreCell}>
                Accuracy
                <span className={styles.modalScore}>
                  {this.props.accuracy}
                </span>
                <div className={styles.modalScoreBar}>
                  <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(this.props.accuracy)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            <tr>
              {/* COMMUNICATION SCORE */}
              <td className={styles.modalScoreCell}>
                Communication
                <span className={styles.modalScore}>
                  {this.props.communication}
                </span>
                <div className={styles.modalScoreBar}>
                  <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(this.props.communication)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            {/* LOCATION SCORE */}
            <tr>
              <td className={styles.modalScoreCell}>
                Location
                <span className={styles.modalScore}>
                  {this.props.location}
                </span>
                <div className={styles.modalScoreBar}>
                  <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(this.props.location)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            <tr>
              {/* CHECK-IN SCORE */}
              <td className={styles.modalScoreCell}>
                Check-in
                <span className={styles.modalScore}>
                  {this.props.checkIn}
                </span>
                <div className={styles.modalScoreBar}>
                  <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(this.props.checkIn)) / 5) * 100) + '%' }} />
                </div>
              </td>
            </tr>
            {/* VALUE SCORE */}
            <tr>
              <td className={styles.modalScoreCell}>
                Value
                <span className={styles.modalScore}>
                  {this.props.value}
                </span>
                <div className={styles.modalScoreBar}>
                  <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(this.props.value)) / 5) * 100) + '%' }} />
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
