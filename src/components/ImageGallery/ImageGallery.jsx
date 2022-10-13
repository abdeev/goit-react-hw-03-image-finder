import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    const { pictures, onClick } = this.props;
    return (
      <ul className={css.ImageGallery}>
        {pictures.map(pic => {
          return (
            <ImageGalleryItem
              key={pic.webformatURL}
              webformatURL={pic.webformatURL}
              descr={pic.tags}
              largeImageURL={pic.largeImageURL}
              onClick={onClick}
            />
          );
        })}
      </ul>
    );
  }
}
ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func,
};

export default ImageGallery;
