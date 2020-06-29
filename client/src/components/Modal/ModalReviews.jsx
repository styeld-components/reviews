/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

import ModalReviewsEntry from './ModalReviewsEntry.jsx';
import ModalScores from './ModalScores.jsx';
import styles from '../../styles/style.css';
import Parser from '../Parser.js';

const roomId = 10;

class ModalReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      pageNumber: 1,
      reviews: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.loadReviews = this.loadReviews.bind(this);

    window.onscroll = () => {
      const {
        loadReviews,
        state: {
          error,
          isLoading,
          hasMore
        }
      } = this;

      console.log('ONSCROLL');

      if (error || isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadReviews(this.state.pageNumber);
      }
    };
  }

  componentDidMount() {
    this.loadReviews(this.state.pageNumber);
  }

  handleClick() {
    this.props.hideModal();
  }

  loadReviews(pageNumber) {
    this.setState({ isLoading: true }, () => {
      axios({
        method: 'GET',
        url: `api/${roomId}/reviews/all?page=${pageNumber}&limit=10`
      })
        .then((res) => {
          const nextReviews = res.data;
          this.setState({
            hasMore: (this.state.reviews.length < 100),
            isLoading: false,
            pageNumber: this.state.pageNumber + 1,
            reviews: [
              ...this.state.reviews,
              ...nextReviews
            ]
          });
        })
        .catch((err) => {
          this.setState({
            error: true,
            isLoading: false,
          });
        });
    });
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;
    const {
      error,
      hasMore,
      isLoading,
      reviews,
    } = this.state;
    return (
      <div>
        {/* CLOSE MODAL BUTTON */}
        <header className={styles.modalHeader}>
          <div>
            <button className={styles.modalBtn} type="button" onClick={this.handleClick}> × </button>
          </div>
        </header>
        {/* OVERALL SCORE */}
        <div className={styles.modalOverview}>
          <span className={styles.modalStar}>★</span>{this.props.overall} <span>({this.props.totalReviews} reviews)</span>
        </div>
        {/* REVIEWS LIST */}

        {/* <table className={styles.modalTable}>
          <tbody>
            {reviews.map((review) => (
              <ModalReviewsEntry review={review} key={review._id} />
            ))}
          </tbody>
        </table> */}

        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadReviews}
          hasMore={this.state.hasMore}
          loader={loader}
        >

          <div>
            {reviews.map((review) => (
              <ModalReviewsEntry review={review} key={review._id} />
            ))}
          </div>
        </InfiniteScroll>

        <div>
          <ModalScores
            cleanliness={this.props.cleanliness}
            accuracy={this.props.accuracy}
            communication={this.props.communication}
            location={this.props.location}
            checkIn={this.props.checkIn}
            value={this.props.value}
          />
        </div>

      </div>
    );
  }
}
export default ModalReviews;
