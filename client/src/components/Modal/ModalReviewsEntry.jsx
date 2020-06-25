import React from 'react';
import moment from 'moment';

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
      <tr className="reviewCell">
        <td>
          <div>
            <img className="userImage" src={this.props.review.user_image} onClick={this.handleClick}></img>
          </div>
          <div className="reviewUser">
            {this.props.review.user_name}
          </div>
          <div className="reviewDate">
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
