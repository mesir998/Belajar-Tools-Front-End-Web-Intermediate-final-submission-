const dasborBar = document.querySelector('aplikasi-dasbor');

const Dasbor = {
  async init() {
    this._initialHandler();
  },

  _initialHandler() {
    this._checkTab();
  },

  _checkTab() {
    if (!sessionStorage.getItem('tab')) {
      const tab = sessionStorage.getItem('tab') ? sessionStorage.getItem('tab') : 'user';
      sessionStorage.setItem('tab', tab);
    }
    const tab = sessionStorage.getItem('tab') ? sessionStorage.getItem('tab') : 'user';
    dasborBar.setAttribute('tab', tab);
  },

  _changeTab(tab) {
    sessionStorage.setItem('tab', tab);
  },
};

export default Dasbor;
