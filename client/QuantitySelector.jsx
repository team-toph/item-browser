import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  grid-column: 1
`;

const FieldContainer = styled.div`
  display: inline-block;
`;

const Input = styled.input`
  /* REMOVE DEFAULT CONTROLS */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  color: #676767;

  float: left;
  font-size: 20px;
  font-weight: bold;
  height: 40px;
  margin: 0;
  padding: 0;
  text-align: center;
  width: 36px;
  border: 1px solid #afafaf;
  border-right: 0;
`;


const UpArrow = styled.button`
  width: 16px;
  height: 20px;
  background-position: center;
  background-image: url(http://18.191.148.100:3001//assets/upArrow.png);
`;

const DownArrow = styled.button`
  width: 16px;
  height: 20px;
  background-position: center;
  background-image: url(http://18.191.148.100:3001//assets/downArrow.png);
`;

class QuantitySelector extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      quantity: 1
    }
  }

  increase(e) {
    e.preventDefault();
    var newQuantity = this.state.quantity + 1;
    this.setState({
      quantity: newQuantity
    })
  }

  decrease(e) {
    e.preventDefault();
    if (this.state.quantity === 1) {
      //don't do anything
    }
    else {
      var newQuantity = this.state.quantity - 1;
      this.setState({
        quantity: newQuantity
      })
    }
  }

  onFieldChange(e) {
    e.preventDefault();
    var quantity;

    if (!e.target.value) {
      quantity = 1;
    }

    quantity = parseInt(e.target.value);

    if (typeof quantity === 'number') {
      this.setState({
        quantity: quantity
      })
    }
  }

  render() {
    return (
      <Form>
          <Input type="number" value={this.state.quantity} onChange={this.onFieldChange.bind(this)}/>
          <div>
            <UpArrow onClick={this.increase.bind(this)}></UpArrow>
          </div>
          <div>
            <DownArrow onClick={this.decrease.bind(this)}></DownArrow>
          </div>
      </Form>
    );
  }
}

export default QuantitySelector;