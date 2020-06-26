import React from 'react';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';

const Text = styled.span`
  color: #333;
  :hover {
    color: #c94739;
  }
`;

const ItemNum = styled.span`
  color: #333;
`;

function Title(props) {
  return (
    <div>
      <h1>{props.product.title + ' ' + props.currentVariant.color}</h1>
      <ItemNum>
        {'Item #: ' + props.product._id}
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <StarRatings
            rating={props.rating}
            numberOfStars={5}
            starRatedColor="gold"
            starEmptyColor="lightgray"
            starDimension="15px"
            starSpacing="0.25px"
            name='rating'/>
        </span>
        <Text>
            &nbsp;&nbsp;&nbsp;&nbsp;<u>9 Reviews</u>
        </Text>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <Text>
            <u>Write a Review</u>
        </Text>
          <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <Text>
            <u>Questions & Answers</u>
        </Text>
      </ItemNum>
    </div>
  );
}

export default Title;