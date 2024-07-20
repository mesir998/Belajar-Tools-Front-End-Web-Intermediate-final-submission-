import Utils from '../../utils/utils';

const PenggunaAuth = {
  kecualikanHalamanRedirect: ['login.html', 'register.html'],

  verifikasiStatusLogin() {
    const tokenPengguna = Utils.ambilTokenUser();
    const apakahPenggunaMasuk = Boolean(tokenPengguna);
    const statusHalamanPenggunaAuth = this._statusHalamanPenggunaAuth(this.kecualikanHalamanRedirect);

    if (apakahPenggunaMasuk) {
      if (statusHalamanPenggunaAuth) {
        window.location.href = '/';
      } else {
        this._tampilkanMenuLoginAtauMenuAkun(apakahPenggunaMasuk);
      }
    } else if (!statusHalamanPenggunaAuth) {
      window.location.href = '/auth/login.html';
    }
  },

  _tampilkanMenuLoginAtauMenuAkun(statusMasukPengguna) {
    const signInMenu = document.querySelector('#signInMenu');
    const menuLogPengguna = document.querySelector('#menuLogPengguna');

    if (!statusMasukPengguna) {
      signInMenu?.classList.add('d-block');
      menuLogPengguna?.classList.add('d-none');

      signInMenu?.classList.remove('d-none');
      menuLogPengguna?.classList.remove('d-block');

      return;
    }

    signInMenu?.classList.add('d-none');
    menuLogPengguna?.classList.add('d-block');

    signInMenu?.classList.remove('d-block');
    menuLogPengguna?.classList.remove('d-none');
  },

  _statusHalamanPenggunaAuth(pages) {
    const halamanYangDifilter = pages.filter((item) => window.location.pathname.endsWith(item));
    return Boolean(halamanYangDifilter.length);
  },
};

export default PenggunaAuth;
