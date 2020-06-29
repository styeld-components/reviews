import React from 'react';
import styles from '../../styles/style.css';

const ModalScores = (props) => (
  <table className={styles.modalScores}>
    <tbody>
      {/* CLEANLINESS SCORE */}
      <tr>
        <td className={styles.modalScoreCell}>
          Cleanliness
                <span className={styles.modalScore}>
            {props.cleanliness}
          </span>
          <div className={styles.modalScoreBar}>
            <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(props.cleanliness)) / 5) * 100) + '%' }} />
          </div>
        </td>
      </tr>
      {/* ACCURACY SCORE */}
      <tr>
        <td className={styles.modalScoreCell}>
          Accuracy
                <span className={styles.modalScore}>
            {props.accuracy}
          </span>
          <div className={styles.modalScoreBar}>
            <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(props.accuracy)) / 5) * 100) + '%' }} />
          </div>
        </td>
      </tr>
      <tr>
        {/* COMMUNICATION SCORE */}
        <td className={styles.modalScoreCell}>
          Communication
                <span className={styles.modalScore}>
            {props.communication}
          </span>
          <div className={styles.modalScoreBar}>
            <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(props.communication)) / 5) * 100) + '%' }} />
          </div>
        </td>
      </tr>
      {/* LOCATION SCORE */}
      <tr>
        <td className={styles.modalScoreCell}>
          Location
                <span className={styles.modalScore}>
            {props.location}
          </span>
          <div className={styles.modalScoreBar}>
            <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(props.location)) / 5) * 100) + '%' }} />
          </div>
        </td>
      </tr>
      <tr>
        {/* CHECK-IN SCORE */}
        <td className={styles.modalScoreCell}>
          Check-in
                <span className={styles.modalScore}>
            {props.checkIn}
          </span>
          <div className={styles.modalScoreBar}>
            <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(props.checkIn)) / 5) * 100) + '%' }} />
          </div>
        </td>
      </tr>
      {/* VALUE SCORE */}
      <tr>
        <td className={styles.modalScoreCell}>
          Value
                <span className={styles.modalScore}>
            {props.value}
          </span>
          <div className={styles.modalScoreBar}>
            <div className={styles.modalScoreRating} style={{ width: JSON.stringify(((Number(props.value)) / 5) * 100) + '%' }} />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);

export default ModalScores;