import { css, html } from 'lit';
import LitTanpaShadowDom from '../base/Lit-tanpa-shadow-dom';

class ElementPemuatan extends LitTanpaShadowDom {
  static styles = css`
    .min-vh-50 {
      min-height: 100rem !important;
      font-size: 100rem;
    }

    .spinner-border {
      width: 5rem;
      height: 5rem;
      border-width: 0.5rem;
    }
  `;

  render() {
    return html`
      <div class="d-flex justify-content-center align-items-center" style="height: 500px;">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
  }
}

customElements.define('element-pemuatan', ElementPemuatan);
