import { html } from 'lit';
import LitTanpaShadowDom from './base/Lit-tanpa-shadow-dom';

class FooterBar extends LitTanpaShadowDom {
  render() {
    return html`
      <div class="container p-4 pb-0">
        <section class="mb-4">
          <!-- Instagram -->
          <a
            data-mdb-ripple-init
            class="btn text-white btn-floating m-1 rounded-circle"
            style="background-color: #ac2bac;"
            href="https://www.instagram.com/fariidakbr_?igsh=MTd0OHRodnd1ZWN3ZA=="
            role="button"
            ><i class="bi bi-instagram"></i
          ></a>
          <!-- Linkedin -->
          <a
            data-mdb-ripple-init
            class="btn text-white btn-floating m-1 rounded-circle"
            style="background-color: #0082ca;"
            href="https://www.linkedin.com/in/farid-akbar-ishaq-maulana"
            role="button"
            ><i class="bi bi-linkedin"></i
          ></a>
          <!-- Github -->
          <a
            data-mdb-ripple-init
            class="btn text-white btn-floating m-1 rounded-circle"
            style="background-color: #333333;"
            href="https://github.com/mesir998"
            role="button"
            ><i class="bi bi-github"></i
          ></a>
        </section>
      </div>
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
        © 2024 Copyright FARID AKBAR ISHAQ MAULANA
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
