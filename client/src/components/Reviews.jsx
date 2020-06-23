import React from 'react';
import ReviewsEntry from './ReviewsEntry.jsx';

const Reviews = (props) => (
  <div>
    <h1>jest sucks</h1>
    <div>
      {props.reviews.slice(0, 6).map(review => (
        <ReviewsEntry review={review} key={review._id} />
      ))}
    </div>
  </div>
)

export default Reviews;
