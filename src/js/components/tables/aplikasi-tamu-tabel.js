import TableApp from './aplikasi-tabel';

class AplikasiTabelTamu extends TableApp {
  constructor() {
    super();
    this.tab = 'guest';
  }
}

customElements.define('aplikasi-tabel-tamu', AplikasiTabelTamu);
