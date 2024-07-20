import TableApp from './aplikasi-tabel';

class AplikasiTabelPengguna extends TableApp {
  constructor() {
    super();
    this.tab = 'user';
  }
}

customElements.define('aplikasi-tabel-pengguna', AplikasiTabelPengguna);
