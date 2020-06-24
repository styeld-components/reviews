import React from 'react';
import ReviewsEntry from './ReviewsEntry.jsx';

const Reviews = (props) => (
  <tbody>
    <tr>
      {props.reviews.slice(0, 2).map(review => (
        <ReviewsEntry review={review} key={review._id} />
      ))}
    </tr>
    <tr>
      {props.reviews.slice(2, 4).map(review => (
        <ReviewsEntry review={review} key={review._id} />
      ))}
    </tr>
    <tr>
      {props.reviews.slice(4, 6).map(review => (
        <ReviewsEntry review={review} key={review._id} />
      ))}
    </tr>
  </tbody>
);

export default Reviews;
