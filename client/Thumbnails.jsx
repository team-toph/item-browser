import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  margin-left: 100px;
`;


const Thumb = styled.div`
  background-image: ${props => 'url(' + props.src +')'};
  background-size: cover;
  border: ${props => props.isSelected ? "1px solid red" : "1px solid lightgray"};
  width: 58px;
  height: 58px;
`;

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thumbs = this.props.images.map((image, index) => {
      var isSelected;
      if (this.props.imageIndex == index) {
        isSelected = true;
      };
      return(
        <td key={image._id}> <Thumb src={image.src} onClick={this.props.handleClick} id={index} isSelected={isSelected}></Thumb></td>
      )
    });
    return(
      <div className={"thumbnails"}>
        <Table>
          <tbody>
            <tr>
              {thumbs}
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Thumbnails;