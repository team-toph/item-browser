import React from 'react';
import styled from 'styled-components';
import { Lightbox } from "react-modal-image";
import ImageSlide from './ImageSlide.jsx';
import Thumbnails from './Thumbnails.jsx';
import ImageButtons from './ImageButtons.jsx';


const InlineDiv = styled.div`
  display: inline-block
`;

const BottomBarContainer = styled.div`
  display: inline-grid;
  grid-column-template: 50px 450px
  grid-column-gap: 10px;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  grid-column: 1;
`;

const ThumbnailContainer = styled.div`
  grid-column: 2;
`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomedIn: false,
      zoomLevel: 0,
      backgroundPostion: 'center',
      fullScreen: false
    }
  }

  onMainImageClick(e) {
    e.preventDefault();

    //toggle zoom state
    var zoom;
    //this.state.zoomedIn ? zoom = false : zoom = true;

    if (this.state.zoomLevel === 0) {zoom = 1}
    else if (this.state.zoomLevel === 1) {zoom = 2}
    else {zoom = 0}

    var position;
    if (zoom === 1 || zoom === 2) {
      position = this.getCoordinates(e);
    } else {
      position = 'center'
    }
    //zoom ? position = this.getCoordinates(e) : position = 'center';
    ////zoomedIn: zoom,
    this.setState({
      zoomLevel: zoom,
      backgroundPostion: position
    })
  }

  getCoordinates(e) {
    var boxWidth = e.target.clientWidth;

    var xPos = e.pageX - e.target.offsetLeft;
    var yPos = e.pageY - e.target.offsetTop;

    var xPercent = xPos / (boxWidth / 100) + '%';
    var yPercent = yPos / (boxWidth  / 100) + '%';

    //get background position of final image
    return xPercent + ' ' + yPercent;
  }

  onFullScreenButtonClick(e) {
    e.preventDefault();
    this.setState({
      fullScreen : true
    })
  }

  onZoomInButtonClick(e) {
    var zoom;

    if (this.state.zoomLevel === 0) {zoom = 1}
    else if (this.state.zoomLevel === 1) {zoom = 2}
    else {zoom = 2}

    this.setState({
      zoomLevel: zoom
    })
  }
  onZoomOutButtonClick(e) {
    e.preventDefault();
    var zoom;

    if (this.state.zoomLevel === 1) {zoom = 0}
    else if (this.state.zoomLevel === 2) {zoom = 1}
    else {zoom = 0}

    this.setState({
      zoomLevel: zoom
    })
  }

  onResetButtonClick(e) {
    e.preventDefault();
    this.setState({
      zoomLevel: 0
    })
  }

  closeLightbox() {
    this.setState({
      fullScreen : false
    })
  }

  render() {

    return(
      <div className="carousel">
        <div><ImageSlide
          src={this.props.currentImageUrl}
          zoomLevel={this.state.zoomLevel}
          backgroundPosition={this.state.backgroundPostion}
          handleClick={this.onMainImageClick.bind(this)}/>
        </div>
        <BottomBarContainer>
          <ButtonContainer>
            <ImageButtons
              handleFullScreenClick={this.onFullScreenButtonClick.bind(this)}
              handleZoomInClick={this.onZoomInButtonClick.bind(this)}
              handleZoomOutClick={this.onZoomOutButtonClick.bind(this)}
              handleResetButtonClick={this.onResetButtonClick.bind(this)}
              zoomLevel={this.state.zoomLevel}
            />
          </ButtonContainer>
          <ThumbnailContainer>
            <Thumbnails
            images={this.props.images}
            imageIndex={this.props.imageIndex}
            handleClick={this.props.handleClick}/>
          </ThumbnailContainer>
        </BottomBarContainer>
        <div>
          {
            this.state.fullScreen &&
            <Lightbox
              small={this.props.currentImageUrl}
              large={this.props.currentImageUrl}
              //alt="Hello World!"
              hideDownload={true}
              hideZoom={true}
              onClose={this.closeLightbox.bind(this)}
            />
          }
        </div>
      </div>

    )
  }
}

export default Carousel;