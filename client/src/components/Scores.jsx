import React from 'react';
import styles from '../styles/style.css';

const Scores = (props) => (
  <tbody>
    <tr>
      {/* CLEANLINESS SCORE */}
      <td className={styles.scoreCol1}>
        Cleanliness
        <span className={styles.scoreCell}>
          {props.cleanliness}
        </span>
        <div className={styles.scoreBar}>
          <div className={styles.scoreRating} style={{ width: JSON.stringify(((Number(props.cleanliness)) / 5) * 100) + '%' }} />
        </div>
      </td>
      {/* ACCURACY SCORE */}
      <td className={styles.scoreCol2}>
        Accuracy
        <span className={styles.scoreCell}>
          {props.accuracy}
        </span>
        <div className={styles.scoreBar}>
          <div className={styles.scoreRating} style={{ width: JSON.stringify(((Number(props.accuracy)) / 5) * 100) + '%' }} />
        </div>
      </td>
    </tr>
    <tr>
      {/* COMMUNICATION SCORE */}
      <td className={styles.scoreCol1}>
        Communication
        <span className={styles.scoreCell}>
          {props.communication}
        </span>
        <div className={styles.scoreBar}>
          <div className={styles.scoreRating} style={{ width: JSON.stringify(((Number(props.communication)) / 5) * 100) + '%' }} />
        </div>
      </td>
      {/* LOCATION SCORE */}
      <td className={styles.scoreCol2}>
        Location
        <span className={styles.scoreCell}>
          {props.location}
        </span>
        <div className={styles.scoreBar}>
          <div className={styles.scoreRating} style={{ width: JSON.stringify(((Number(props.location)) / 5) * 100) + '%' }} />
        </div>
      </td>
    </tr>
    <tr>
      {/* CHECK-IN SCORE */}
      <td className={styles.scoreCol1}>
        Check-in
        <span className={styles.scoreCell}>
          {props.checkIn}
        </span>
        <div className={styles.scoreBar}>
          <div className={styles.scoreRating} style={{ width: JSON.stringify(((Number(props.checkIn)) / 5) * 100) + '%' }} />
        </div>
      </td>
      {/* VALUE SCORE */}
      <td className={styles.scoreCol2}>
        Value
        <span className={styles.scoreCell}>
          {props.value}
        </span>
        <div className={styles.scoreBar}>
          <div className={styles.scoreRating} style={{ width: JSON.stringify(((Number(props.value)) / 5) * 100) + '%' }} />
        </div>
      </td>
    </tr>
  </tbody>
);

export default Scores;
