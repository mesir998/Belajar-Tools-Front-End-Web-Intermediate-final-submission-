import { html } from 'lit';
import LitTanpaShadowDom from '../base/Lit-tanpa-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class ResetPaginasi extends LitTanpaShadowDom {
  static properties = {
    type: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  handleClick() {
    sessionStorage.setItem(this.type, 0);
    window.location.reload();
  }

  render() {
    return html`
      <nav aria-label="..." class="d-flex justify-content-center">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" @click=${this.handleClick()}>${msg(`reset`)}</a>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('reset-paginasi', ResetPaginasi);
