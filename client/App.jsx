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
    const params = this.getUrlParams();
    if (!params.id) {
      alert('No product id is present in the url, add an id between 1 and 100 as a query to display a product. example: localhost:3000/?id=4');
    } else {
      const path = 'api/products?id=' + params.id
      axios.get(path)
      .then((response) => {
        // handle success
        //console.log(response.data[0]);
        const data = response.data[0];
        this.setState({
          product: data,
          variations: data.variations,
          currentVariant: data.variations[0],
          variantIndex: 0,
          currentVariantsImages: data.variations[0].images,
          currentImageUrl: data.variations[0].images[this.state.imageIndex].src
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
  }

  getUrlParams() {
    const url = window.location.href;
    console.log("The URL of this page is: " + url);
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
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