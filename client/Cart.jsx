import React from 'react';
import styled from 'styled-components';

const CartBox = styled.div`
  background-color: whitesmoke;
  border: 1px solid lightgray;
  padding: 15px;
`;

const PriceLabel = styled.div`
  font-size: 14px;
  padding-bottom: 5px;
  font-weight: 700;
`;

const Price = styled.span`
  font-size: 42px;
  font-weight: 500;
  white-space: nowrap;
`;

const Shipping = styled.div`
  display: inline-block;
  font-size: 11px;
  vertical-align: top;
  margin-top: 6px;
`;

const FinancingBlurb = styled.span`
  font-size: 10px;
  font-weight: 500;
  white-space: pre-line
`;

const CardImageContainer = styled.div`
  background-position: center;
  background-image: url(/assets/gearCard.png);
  float: left;
  height: 33px;
  text-indent: -9999px;
  width: 44px;
  margin: 2px 10px 0 0;
`

function Cart(props) {
  return (
    <CartBox>
      <PriceLabel>Price:</PriceLabel>
      <Price>
        {'$' + props.cost}
        <Shipping>+ Free Shipping</Shipping>
      </Price>
      <div>
        <span>
          <CardImageContainer/>
          <FinancingBlurb>
            Special 6-month financing^ + <u>$34{"\n"} back in rewards.</u> Valid through{"\n"} 12/31/2020. <u>Get Details</u>
          </FinancingBlurb>
        </span>
      </div>
    </CartBox>
  );
}

export default Cart;