import { html } from 'lit';
import LitTanpaShadowDom from '../base/Lit-tanpa-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

const KEY = 'theme';
const theme = localStorage.getItem(KEY);
const themes = {
  light: msg(`terang`),
  dark: msg(`gelap`),
  blue: msg(`biru`),
};

class PilihTema extends LitTanpaShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  firstUpdated() {
    const selectElement = this.renderRoot.querySelector('#floatingSelectGrid');
    selectElement.addEventListener('change', this._handleSelectChange.bind(this));
  }

  _handleSelectChange(event) {
    const selectedValue = event.target.value;

    if (selectedValue == 'light') {
      this._changeTheme('light');
    } else if (selectedValue == 'dark') {
      this._changeTheme('dark');
    } else if (selectedValue == 'blue') {
      this._changeTheme('blue');
    } else {
      this._light();
    }
  }

  _changeTheme(value) {
    localStorage.setItem(KEY, value);
    window.location.reload();
  }

  render() {
    return html`
      <div class="form-floating">
        <select class="form-select" id="floatingSelectGrid">
          ${Object.keys(themes).map(
            (item) => html`
              ${item == theme
                ? html` <option value="${item}" selected>${themes[item]}</option> `
                : html` <option value="${item}">${themes[item]}</option> `}
            `,
          )}
        </select>
        <label for="floatingSelectGrid">${msg(`ganti tema`)}</label>
      </div>
    `;
  }
}

customElements.define('pilih-tema', PilihTema);
