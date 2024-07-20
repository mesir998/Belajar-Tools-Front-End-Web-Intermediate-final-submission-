const Akun = {
  async init() {
    await this._dataAwal();
    this._initialHandler();
  },

  async _dataAwal() {
    // console.log("init data Akun");
  },

  _initialHandler() {
    // console.log("init handler Akun");
  },
};

export default Akun;
