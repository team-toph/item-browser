import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  margin-left: 100px;
`;

const Thumb = styled.div`
  background-image: ${props => 'url(' + props.src +')'};
  background-size: cover;
  width: 58px;
  height: 58px;
`;

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thumbs = this.props.images.map((image, index) =>
      <td key={image._id}> <Thumb src={image.src} onClick={this.props.handleClick} id={index}></Thumb></td>
    );
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