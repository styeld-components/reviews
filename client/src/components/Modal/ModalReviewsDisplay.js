import { useEffect, useState } from 'react';
import axios from 'axios';

const roomId = 10;

export default function ModalReviewsDisplay(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setReviews([]);
  });

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: 'GET',
      url: `api/${roomId}/reviews/all`,
      params: { page: pageNumber },
    }).then(data => {
      setReviews(prevReviews => {
        return [prevReviews, data];
      });
      setHasMore(res.data.docs.length > 0);
      setLoading(false);
    }).catch(e => {
      setError(true);
    });
  }, [pageNumber]);

  return { loading, error, reviews };
}
