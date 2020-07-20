import React from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import styles from '../styles/style.css';

class ReviewsEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.open(this.props.review.user_url);
  }

  render() {
    return (
      <LazyLoad>
        <tr className={styles.reviewCell}>
          <td>
            <div>
              <img className={styles.userImage} src={this.props.review.user_image} onClick={this.handleClick}></img>
            </div>
            <div className={styles.reviewUser}>
              {this.props.review.user_name}
            </div>
            <div className={styles.reviewDate}>
              {moment(this.props.review.date).format('MMMM YYYY')}
            </div>
            <p>
              {this.props.review.body}
            </p>
          </td>
        </tr>
      </LazyLoad>
    );
  }
}

export default ReviewsEntry;
