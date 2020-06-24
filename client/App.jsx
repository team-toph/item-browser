import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import Title from './Title.jsx';
import StyleSelector from './StyleSelector.jsx';
import Cart from './Cart.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      variations: [],
      currentVariant: {},
      variantIndex: 0,
      currentVariantsImages: [],
      imageIndex: 0,
      currentImageUrl: ''
    }
  }

  componentDidMount() {
    // Make a request for a user with a given ID
    axios.get('api/products?id=5ef2760055d4085a0be8980e')
    .then((response) => {
      // handle success
      // console.log(response.data);
      this.setState({
        product: response.data,
        variations: response.data.variations,
        currentVariant: response.data.variations[0],
        variantIndex: 0,
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

  onStyleClick(e) {
    e.preventDefault();
    console.log(e.target.id);
    const index = e.target.id;

    this.setState({
      variantIndex: index,
      currentVariant: this.state.product.variations[index],
      currentVariantsImages: this.state.product.variations[index].images,
      imageIndex: 0,
    })
    this.setNewImageUrlAfterVariationSwitch();
  }

  setNewImageUrlAfterVariationSwitch() {
    this.setState((state) => ({
      currentImageUrl: state.currentVariantsImages[0].src
    }));
  }

  render() {
    return(
      <div className={"wrapper"}>
        <div className="title">
          <Title
            product={this.state.product}
            currentVariant={this.state.currentVariant}
            rating={this.state.product.rating}
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
          <div className="stockInfo">
            <h4>In Stock & Ready to Ship</h4>
            <p>Most orders placed before noon ET ship same day (except weekends and holidays).</p>
          </div>
          <StyleSelector
            variations={this.state.variations}
            currentVariant={this.state.currentVariant}
            variantIndex={this.state.variantIndex}
            handleClick={this.onStyleClick.bind(this)}
          />
        </div>
        <div className="three">
          <Cart cost={this.state.currentVariant.cost}/>
        </div>
      </div>
    )
  }
}

export default App;