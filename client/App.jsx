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
          <Carousel images={this.state.currentVariantsImages} currentImageUrl={this.state.currentImageUrl} handleClick={this.onThumbnailClick.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default App;