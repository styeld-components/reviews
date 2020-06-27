import React from 'react';
import moment from 'moment';
import styles from '../../styles/style.css';

class ModalReviewsEntry extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.open(this.props.review.user_url);
  }

  render() {
    return (
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
            {this.props.review.text}
          </p>
        </td>
      </tr>
    );
  }
}

export default ModalReviewsEntry;
