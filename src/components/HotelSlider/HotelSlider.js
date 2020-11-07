import React, { Component } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HotelSlider.scss";

class HotelSlider extends Component {
  constructor(props) {
    super();
    this.state = {
      currentItem: 0
    };
  }

  thumbnailClicked = (index, img) => {
    this.setState({
      currentItem: index
    });
  };

  render() {
    const { images, showIndicators, showThumbs } = this.props;
    const sliderSettings = {
      selectedItem: this.state.currentItem
    };

    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-8">
            <Carousel {...sliderSettings} showIndicators={showIndicators} showThumbs={showThumbs}>
              {images &&
                images.map((image, index) => (
                  <LazyLoad key={index} throttle={200} overflow height={300} once>
                    <img src={`${image.imageUrl}?w=760&h=365&mode=stretch`} alt={image.imageTitle} />
                  </LazyLoad>
                ))}
            </Carousel>
            <div className="thumbs-container">
              {images && images.map((img, i) => (
                <div key={i} className="thumb-wrapper">
                  <img
                    src={`${img.imageUrl}?w=100&h=65&mode=stretch`}
                    alt={img.imageTitle}
                    className="thumb"
                    onClick={() => this.thumbnailClicked(i, img)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelSlider;

HotelSlider.defaultProps = {
  showIndicators: false,
  showThumbs: false
};

HotelSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      imageUrl: PropTypes.string,
      imageTitle: PropTypes.string
    }).isRequired
  )
};
