import Crud from '../network/crud';

const Home = {
  async init() {
    await this._dataAwal();
    this._initialHandler();
    this._hideLoading();
  },

  _chunkArrayUser(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  },

  async _dataAwal() {
    try {
      const postListElement = document.querySelector('daftar-pasca');

      const storyList = (await Crud.getSemuaCerita()).data.listStory;
      const chunkedData = this._chunkArrayUser(storyList, 6);

      this.chunk = sessionStorage.getItem('home') ? sessionStorage.getItem('home') : 0;
      this.totalChunk = chunkedData.length;
      this.data = chunkedData[this.chunk];

      postListElement.setAttribute('chunk', this.chunk);
      postListElement.setAttribute('totalChunk', this.totalChunk);
      postListElement.setAttribute('data', JSON.stringify(this.data));

      this._checkStatus();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  _showLoading() {
    const element = document.querySelector('element-pemuatan');
    element.classList.remove('d-none');
  },

  _hideLoading() {
    const element = document.querySelector('element-pemuatan');
    element.classList.add('d-none');
  },

  _checkStatus() {
    const postListElement = document.querySelector('daftar-pasca');

    if (!this.data) {
      sessionStorage.setItem('home', 0);
      window.location.reload();
    }

    if (this.totalChunk == 1) {
      this.status = 'both';
    } else if (parseInt(this.chunk) + 1 === this.totalChunk) {
      this.status = 'next';
    } else if (this.chunk == 0) {
      this.status = 'prev';
    } else {
      this.status = 'normal';
    }

    postListElement.setAttribute('status', this.status);
  },

  _initialHandler() {},
};

export default Home;
