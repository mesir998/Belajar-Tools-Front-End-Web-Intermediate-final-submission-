import Home from '../pages/home';
import Dasbor from '../pages/user/dasbor';
import Tambah from '../pages/user/tambah-cerita';
import Edit from '../pages/user/edit-cerita';
import Akun from '../pages/user/akun';
import Pengaturan from '../pages/user/pengaturan';

import Login from '../pages/auth/login';
import Register from '../pages/auth/register';

import PenggunaAuth from '../pages/auth/pengguna-auth';

const routes = {
  '/': Home,
  '/user/dasbor.html': Dasbor,
  '/user/tambah-cerita.html': Tambah,
  '/user/edit-ceita.html': Edit,
  '/user/akun.html': Akun,
  '/user/pengaturan.html': Pengaturan,
  '/auth/login.html': Login,
  '/auth/register.html': Register,
};

const detectRoute = () => routes[window.location.pathname];

const initPages = () => {
  const header = document.querySelector('header-bar');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer-bar');

  if (header && main && footer) {
    main.style.minHeight = `calc(100vh - ${header.clientHeight + footer.clientHeight}px)`;
  }
};

window.addEventListener('DOMContentLoaded', async () => {
  initPages();

  PenggunaAuth.verifikasiStatusLogin();
  const route = detectRoute();
  await route.init();
});
