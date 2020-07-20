import React from 'react';
import styled from 'styled-components';
import QuantitySelector from './QuantitySelector.jsx';


const QuestionsContainer = styled.div`
  border: 1px solid lightgray;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 12px;
  text-align: center;
`;

const Questions = styled.h5`
  font-size: 100%;
  font-weight: 600;
  margin: 5px;
  padding: 0px;
`;

const Actions = styled.p`
  margin: 0px;
  padding: 0px;
  text-align: center;
`;

const CartContainer = styled.div`
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

const CardContainer = styled.div`
  display: inline-grid;
  grid-column-template: 40px 250px;
  grid-column-gap: 15px;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const FinancingBlurb = styled.span`
  font-size: 10px;
  font-weight: 500;
  grid-column: 2;
`;

const CardImageContainer = styled.div`
  background-position: center;
  background-image: url(http://18.191.148.100:3001/assets/gearCard.png);
  height: 30px;
  width: 40px;
  grid-column: 1;
`


const QuantityAndButtonContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 60px 200px;
  grid-column-gap: 2px;
  margin-top: 5px;
  align-content: center;
`;

const AddToCart = styled.button`
  grid-column: 2;
  background: #cd2418;
  :hover {
    background: #c94739;
  }

  border-radius: 4px;
  border: 1px solid whitesmoke;
  border-width: 0 0 1px 1px;
  border-top: 1px solid #f3f4f5;
  border-right: 1px solid #e6e8e8;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  height: 42px;
  width: 190px;
  color: whitesmoke;
`;


function Cart(props) {
  return (
    <div>
      <QuestionsContainer>
        <Questions>Have Questions? 877-687-5403</Questions>
        <Actions>Call our experts for product info and phone-only specials. Or click here to <u>chat now.</u></Actions>
      </QuestionsContainer>
      <CartContainer>
        <PriceLabel>Price:</PriceLabel>
        <Price>
          {'$' + props.cost}
          <Shipping>+ Free Shipping</Shipping>
        </Price>
        <div>
          <CardContainer>
            <CardImageContainer/>
            <FinancingBlurb>
              Special 6-month financing^ + <u>$34{"\n"} back in rewards.</u> Valid through{"\n"} 12/31/2020. <u>Get Details</u>
            </FinancingBlurb>
          </CardContainer>
        </div>
        <QuantityAndButtonContainer>
          <QuantitySelector/>
          <AddToCart>Add To Cart</AddToCart>
        </QuantityAndButtonContainer>
      </CartContainer>
    </div>
  );
}

export default Cart;