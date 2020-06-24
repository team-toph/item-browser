import React from 'react';
import StarRatings from 'react-star-ratings';

function Title(props) {
  return (
    <div>
      <h1>{props.product.title + ' ' + props.currentVariant.color}</h1>
      <span>
        {'Item #: ' + props.product._id}
        <StarRatings
          rating={props.rating}
          numberOfStars={5}
          starRatedColor="gold"
          starEmptyColor="lightgray"
          starDimension="15px"
          starSpacing="0.25px"
          name='rating'/>
          9 Reviews | Write a Review | Questions & Answers
      </span>
    </div>
  );
}

export default Title;