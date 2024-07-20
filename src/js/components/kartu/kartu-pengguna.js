import { html, css, LitElement } from 'lit';

const text = `HALO NAMA SAYA FARID AKBAR ISHAQ MAULANA`;

class KartuPengguna extends LitElement {
  static get properties() {
    return {
      theme: { type: String },
    };
  }

  constructor() {
    super();
    this.theme = this._checkTheme();
  }

  _checkTheme() {
    const KEY = 'theme';
    const theme = localStorage.getItem(KEY) ? localStorage.getItem(KEY) : 'light';
    return theme;
  }

  _applyTheme() {
    const root = this.shadowRoot.host;
    if (this.theme === 'dark') {
      root.style.setProperty('--card-bg-color', '#212529');
      root.style.setProperty('--card-border-color', 'rgba(255, 255, 255, 0.5)');
      root.style.setProperty('--card-shadow-color', 'rgba(0, 0, 0, 0.5)');
      root.style.setProperty('--card-footer-color', '#ccc');
      root.style.setProperty('--card-text-color', 'white');
    } else if (this.theme === 'blue') {
      root.style.setProperty('--card-bg-color', '#0dcaf0');
      root.style.setProperty('--card-border-color', 'rgba(255, 255, 255, 0.25)');
      root.style.setProperty('--card-shadow-color', 'rgba(0, 0, 0, 0.5)');
      root.style.setProperty('--card-footer-color', '#ccc');
      root.style.setProperty('--card-text-color', 'white');
    } else {
      root.style.setProperty('--card-bg-color', 'rgba(255, 255, 255, 0.45)');
      root.style.setProperty('--card-border-color', 'rgba(255, 255, 255, 0.25)');
      root.style.setProperty('--card-shadow-color', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--card-footer-color', '#446');
      root.style.setProperty('--card-text-color', '#224');
    }
  }

  firstUpdated() {
    this._applyTheme();
  }

  static styles = css`
    :host {
      font-size: 20px;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    p {
      margin: 0;
      cursor: pointer;
    }

    p:not(:last-child) {
      margin-bottom: 1.5em;
    }

    .card {
      width: 100%;
      min-height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 35px;
      border: 0.1rem solid var(--card-border-color);
      background-color: var(--card-bg-color);
      box-shadow: 0 3px 6px 0 var(--card-shadow-color);
      border-radius: 5px;
      backdrop-filter: blur(15px);
      color: var(--card-text-color);
      text-transform: lowercase;
    }

    .card-footer {
      font-size: 0.65em;
      color: var(--card-footer-color);
    }

    /* Media Queries for Mobile */
    @media (max-width: 768px) {
      :host {
        font-size: 17px;
      }
    }

    /* Media Queries for Mobile */
    @media (max-width: 600px) {
      :host {
        font-size: 14px;
      }

      .card {
        padding: 20px;
      }

      .card-footer {
        font-size: 0.5em;
      }
    }
  `;

  render() {
    return html`
      <div class="card">
        <pre class="card-footer">${text}</pre>
      </div>
    `;
  }

  _goToLink(url) {
    window.location.href = url;
  }

  
  _toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this._applyTheme();
  }
}

customElements.define('kartu-pengguna', KartuPengguna);
