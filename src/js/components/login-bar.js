import { html } from 'lit';
import LitTanpaShadowDom from './base/Lit-tanpa-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class LoginBar extends LitTanpaShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-4">
          <h1 class="text-center">${msg(`Masuk`)}</h1>

          <form id="formMasuk" novalidate>
            <div id="div-alert"></div>

            <div class="mb-3">
              <label for="validationCustomRecordEmail" class="form-label">${msg(`email`)}</label>
              <masukan-dengan-validasi
                type="email"
                inputId="validationCustomRecordEmail"
                invalidFeedbackMessage="email incorrect"
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
              <tombol-kirim type="login"></tombol-kirim>
            </div>
          </form>

          <div class="mt-4 text-center">
            ${msg(`Belum punya akun?`)} <a href="/auth/register.html">${msg(`daftar`)}</a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('login-bar', LoginBar);
