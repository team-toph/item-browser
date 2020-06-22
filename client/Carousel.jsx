import React from 'react';
import ImageSlide from './ImageSlide.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomedIn: false,
      backgroundPostion: 'center'
    }
  }

  onMainImageClick(e) {
    e.preventDefault();

    //toggle zoom state
    var zoom;
    this.state.zoomedIn ? zoom = false : zoom = true;

    var position;
    zoom ? position = this.getCoordinates(e) : position = 'center';

    this.setState({
      zoomedIn: zoom,
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

  render() {

    return(
      <div>
        <div className="carousel"></div>
        <div><ImageSlide src={this.props.currentImageUrl} zoomedIn={this.state.zoomedIn} backgroundPosition={this.state.backgroundPostion} handleClick={this.onMainImageClick.bind(this)}/></div>
      </div>
    )
  }
}

export default Carousel;