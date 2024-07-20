const USER_TOKEN_KEY = 'userToken';

const Utils = {
  simpanTokenPengguna(value) {
    return localStorage.setItem(USER_TOKEN_KEY, value);
  },
  ambilTokenUser() {
    return localStorage.getItem(USER_TOKEN_KEY);
  },
  hilangkanTokenPengguna() {
    return localStorage.removeItem(USER_TOKEN_KEY);
  },
  setelNamaPengguna(value) {
    return localStorage.setItem('userName', value);
  },
  dapatkanNamaPengguna() {
    return localStorage.getItem('userName');
  },
  hilangkanNamaPengguna() {
    return localStorage.removeItem('userName');
  },
  tetapkanEmail(value) {
    return localStorage.setItem('email', value);
  },
  dapatkanEmail() {
    return localStorage.getItem('email');
  },
};

export default Utils;
