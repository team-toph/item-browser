import React from 'react';
import styled from 'styled-components';

const Image = styled.div`

  transition: background-position linear 0.5s, background-size linear 0.5s;
  width: 457px;
  height: 519px;
  background: ${props=> 'url(' + props.src + ')'};
  background-size: ${(props) =>
    props.zoomLevel === 1 && "250%" ||
    props.zoomLevel === 2 && "300%" ||
    "100%"};
  background-position: ${props => props.backgroundPosition};
  cursor: ${(props) =>
    props.zoomLevel === 2 && "zoom-out" ||
    "zoom-in"};
`;

class ImageSlide extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
      <Image
        className="image-slide"
        src={this.props.src}
        backgroundPosition={this.props.backgroundPosition}
        onClick={this.props.handleClick}
        zoomLevel={this.props.zoomLevel}>
      </Image>

      </div>
    );
  }
}

export default ImageSlide;

{/* <Image src={this.props.src} onClick={this.props.handleClick} zoomedIn={this.props.zoomedIn} backgroundPosition={this.props.backgroundPosition}>
</Image> */}

// const Image = styled.img`

//   width: 457px;
//   height: 519px;
//   background: ${props=> 'url(' + props.src + ')'};
//   background-position: ${props => props.backgroundPosition};
//   background-size: ${props => props.zoomedIn ? "457" : "cover"};
//   cursor: ${props => props.zoomedIn ? "zoom-out" : "zoom-in"};
// `;