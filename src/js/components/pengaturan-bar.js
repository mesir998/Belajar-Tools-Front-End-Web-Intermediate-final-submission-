import { html } from 'lit';
import LitTanpaShadowDom from './base/Lit-tanpa-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class PengaturanBar extends LitTanpaShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="row g-2 text-capitalize gap-3">
        <pilih-tema class="col-md"></pilih-tema>
        <pilih-bahasa class="col-md"></pilih-bahasa>
        <kartu-pengguna class="d-flex justify-content-center"></kartu-pengguna>
        <button type="button" class="btn btn-danger" @click="${this._resetStorage}">
          ${msg(`setel ulang pengaturan`)}
        </button>
      </div>
    `;
  }

  _resetStorage() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }
}

customElements.define('pengaturan-bar', PengaturanBar);
