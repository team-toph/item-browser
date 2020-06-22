import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      variations: [],
      currentVariantsImages: [],
      currentImageUrl: ''
    }
  }

  componentDidMount() {
    // Make a request for a user with a given ID
    axios.get('api/products?id=5eec29ed009ae7f194ad98da')
    .then((response) => {
      // handle success
      // console.log(response.data);
      this.setState({
        product: response.data,
        variations: response.data.variations,
        currentVariantsImages: response.data.variations[0].images,
        currentImageUrl: response.data.variations[0].images[0].src
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  render() {
    // var imageUrl = '';
    // if (this.state.variations[0]) {
    //   var variant = this.state.variations[0];
    //   imageUrl = variant.images[0].src;
    // }
    return(
      <div>
        <div>
          <h4>{this.state.product.title}</h4>
        </div>
        <div>
          <p>{this.state.product.description}</p>
        </div>
        <div>
          <Carousel images={this.state.currentVariantsImages} currentImageUrl={this.state.currentImageUrl}/>
        </div>
      </div>
    )
  }
}

export default App;