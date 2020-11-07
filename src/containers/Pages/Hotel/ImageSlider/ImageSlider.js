import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageSlider.scss';
import classNames from 'classnames';

class ImageSlider extends Component {
    constructor(props){
        super();
        this.state = {
            currentItem: '',
            bannerUrl: '',
            isSelected: false
        }
    }
    
    componentDidMount() {
        this.setState({
            bannerUrl: './images/hotel-slider-img.jpg'
        })
    }

    thumbnailClicked = (image) => {
        this.setState({
            bannerUrl: image.bannerUrl,
            isSelected: true,
            currentItem: image.id
        })
    }

    render() {
        const { bannerUrl, isSelected } = this.state;
        const { images } = this.props;
        return(
            <div className="container my-5">
                <div className="row">
                    <div className="col-9">
                        <div className="images-carousel">
                            <div className="images-wrapper animated">
                                {/* <span> {images.length} </span> */}
                                <img src={bannerUrl}  alt="" id="slide" width="760" height="365" />
                            </div>
                            <div className="thumbs-wrapper">
                                {
                                    images && images.map( (image, index) => {
                                        return(
                                            <div className={classNames('thumb', {'selected': isSelected})} key={index}>
                                                <img src={image.thumbUrl} alt={image.title} onClick={ () => this.thumbnailClicked(image) } />
                                            </div>
                                        )
                                    }) 
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ImageSlider.propTypes = {
    images: PropTypes.array
}

export default ImageSlider;