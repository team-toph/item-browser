import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import Title from './Title.jsx';
import StyleSelector from './StyleSelector.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      variations: [],
      currentVariant: {},
      currentVariantsImages: [],
      imageIndex: 0,
      currentImageUrl: ''
    }
  }

  componentDidMount() {
    // Make a request for a user with a given ID
    axios.get('api/products?id=5ef13ad97b2c233b7ce05aa2')
    .then((response) => {
      // handle success
      // console.log(response.data);
      this.setState({
        product: response.data,
        variations: response.data.variations,
        currentVariant: response.data.variations[0],
        currentVariantsImages: response.data.variations[0].images,
        currentImageUrl: response.data.variations[0].images[this.state.imageIndex].src
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  onThumbnailClick(e) {
    e.preventDefault();
    console.log(e.target.id);
    const index = e.target.id;
    this.setState({
      imageIndex: index,
      currentImageUrl: this.state.currentVariantsImages[index].src
    })
  }

  render() {
    return(
      <div className={"wrapper"}>
        <div className="title">
          <Title
            product={this.state.product}
            currentVariant={this.state.currentVariant}
          />
        </div>
        <div className="one">
          <Carousel
            images={this.state.currentVariantsImages}
            currentImageUrl={this.state.currentImageUrl}
            imageIndex={this.state.imageIndex}
            handleClick={this.onThumbnailClick.bind(this)}
          />
        </div>
        <div className="two">
          <div className="description">
            <h5><b>Product Description</b></h5>
            <p>{this.state.product.description}</p>
          </div>
          <div>
          <h4>In Stock & Ready to Ship</h4>
          <p>Most orders placed before noon ET ship same day (except weekends and holidays).</p>
          </div>
        </div>
        <div className="three">

        </div>
      </div>
    )
  }
}

export default App;