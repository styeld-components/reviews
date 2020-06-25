import React from 'react';
import ReviewsEntry from './ReviewsEntry.jsx';

const Reviews = (props) => (
  <tbody>
    {props.reviews.slice(0, 6).map(review => (
      <ReviewsEntry review={review} key={review._id} />
    ))}
  </tbody>
);

export default Reviews;
