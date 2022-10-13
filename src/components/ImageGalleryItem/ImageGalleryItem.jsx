import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, descr, largeImageURL, onClick }) => {
  const handleLargePic = () => {
    onClick(largeImageURL, descr);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img src={webformatURL} alt={descr} onClick={handleLargePic} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  descr: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
