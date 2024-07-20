import { html } from 'lit';
import LitTanpaShadowDom from './base/Lit-tanpa-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class RegisterBar extends LitTanpaShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-4">
          <h1 class="text-center">${msg(`daftar`)}</h1>

          <form id="registerForm" novalidate>
            <div id="div-alert"></div>

            <div class="mb-3">
              <label for="validationCustomRecordName" class="form-label">${msg(`nama`)}</label>
              <masukan-dengan-validasi
                type="text"
                inputId="validationCustomRecordName"
                invalidFeedbackMessage="Input Required"
                required
              ></masukan-dengan-validasi>
            </div>

            <div class="mb-3">
              <label for="validationCustomEmail" class="form-label">${msg(`email`)}</label>
              <masukan-dengan-validasi
                type="email"
                inputId="validationCustomEmail"
                invalidFeedbackMessage="Email incorrect"
                required
              ></masukan-dengan-validasi>
            </div>

            <div class="mb-3">
              <label for="validationCustomPassword" class="form-label">${msg(`kata sandi`)}</label>
              <masukan-password-dengan-validasi
                type="password"
                inputId="validationCustomPassword"
                invalidFeedbackMessage="Enter a minimum of 8 letters"
                required
              ></masukan-password-dengan-validasi>
            </div>

            <div class="col-12 text-end">
              <tombol-kirim type="register"></tombol-kirim>
            </div>
          </form>

          <div class="mt-4 text-center">
            ${msg(`Sudah punya akun?`)} <a href="/auth/login.html">${msg(`masuk`)}</a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('register-bar', RegisterBar);
