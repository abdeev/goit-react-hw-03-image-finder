import React, { Component } from 'react';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

import PixabayApi from '../../static/api/PixabayApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../App/App.module.css';

export class App extends Component {
  state = {
    pictures: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    modalUrl: '',
    descr: '',
  };

  componentDidUpdate(_, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeSerchQuery = query => {
    this.setState({
      pictures: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  };

  fetchImages = async () => {
    this.setState({ isLoading: true });
    try {
      const { currentPage, searchQuery } = this.state;
      const response = await PixabayApi({
        page: currentPage,
        searchQuery: searchQuery,
      });

      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...response],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = (largeUrl, descr) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalUrl: largeUrl,
      descr: descr,
    }));
  };

  render() {
    const { pictures, isLoading, showModal, modalUrl, descr } = this.state;
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.onChangeSerchQuery} />
        <div>
          <ImageGallery pictures={pictures} onClick={this.toggleModal} />
        </div>
        <span className={css.button_wrapper}>
          <Loader loading={isLoading} />
          {pictures.length % 12 < 1 && pictures.length > 0 && (
            <Button onClick={this.fetchImages} />
          )}
        </span>
        {showModal && (
          <Modal url={modalUrl} descr={descr} toggleModal={this.toggleModal} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
