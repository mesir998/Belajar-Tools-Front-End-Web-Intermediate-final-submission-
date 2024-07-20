import { html } from 'lit';
import LitTanpaShadowDom from './base/Lit-tanpa-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import Utils from '../utils/utils';

class AplikasiAkun extends LitTanpaShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this._getData();
  }

  _getData() {
    this.name = Utils.dapatkanNamaPengguna();
    this.email = Utils.dapatkanEmail();
  }

  render() {
    return html`
      <akun-label type="user" value="${this.name}"></akun-label>
      <akun-label type="email" value="${this.email}"></akun-label>
      <akun-label type="password"></akun-label>
      <masukkan-akun type="user"></masukkan-akun>
      <masukkan-akun type="password"></masukkan-akun>
      <button type="button" class="btn btn-danger">${msg(`hapus akun`)}</button>
    `;
  }
}

customElements.define('aplikasi-akun', AplikasiAkun);
