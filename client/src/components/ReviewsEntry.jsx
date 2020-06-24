import React from 'react';
import moment from 'moment';

class ReviewsEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.open(this.props.review.user_url);
  }

  render() {
    return (
      <td className="reviewCell">
        <div>
          <img className="userImage" src={this.props.review.user_image} onClick={this.handleClick}></img>
        </div>
        <div className="reviewUser">
          {this.props.review.user_name}
        </div>
        <div className="reviewDate">
          {moment(this.props.review.date).format('MMMM YYYY')}
        </div>
        <div className="reviewText">
          {this.props.review.text}
        </div>
      </td>
    );
  }
}

export default ReviewsEntry;
