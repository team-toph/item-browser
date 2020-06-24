import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
  background-image: ${props => 'url(' + props.src +')'};
  background-size: cover;
  width: 58px;
  height: 58px;
  border: ${props => props.isSelected ? "1px solid red" : "1px solid lightgray"};
`;

function StyleSelector(props) {

  const styles = props.variations.map((variant, index) => {
    var isSelected;
    if (props.variantIndex == index) {
      isSelected = true;
    };

    return(
      <td key={variant._id}>
        <Style
          src={variant.images[0].src}
          id={index}
          isSelected={isSelected}
          onClick={props.handleClick}
        />
      </td>
    )
  });


  return(
    <div className="styleSelector">
      <p><b>Choose Style:</b> {props.currentVariant.color}</p>
      <table>
        <tbody>
          <tr>
            {styles}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StyleSelector;