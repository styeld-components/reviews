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
      <div>
        <div>
          <img src={this.props.review.user_image} onClick={this.handleClick}></img>
        </div>
        <div>
          {this.props.review.user_name}
        </div>
        <div>
          {moment(this.props.review.date).format('MMMM YYYY')}
        </div>
        <div>
          {this.props.review.text}
        </div>
      </div>
    );
  }
}

export default ReviewsEntry;
