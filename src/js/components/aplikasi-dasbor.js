import { html } from 'lit';
import LitTanpaShadowDom from './base/Lit-tanpa-shadow-dom';

class AplikasiDasbor extends LitTanpaShadowDom {
  static properties = {
    tab: { type: String, reflect: true },
  };

  _changeTab(tab) {
    sessionStorage.setItem('tab', tab);
  }

  render() {
    const tabUser = sessionStorage.getItem('tab') == 'user';

    return html`
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link ${tabUser ? 'active' : ''}"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home-tab-pane"
            type="button"
            role="tab"
            aria-controls="home-tab-pane"
            aria-selected="${tabUser}"
            @click=${() => this._changeTab('user')}
          >
            user
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link ${tabUser ? '' : 'active'}"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile-tab-pane"
            type="button"
            role="tab"
            aria-controls="profile-tab-pane"
            aria-selected="${!tabUser}"
            @click=${() => this._changeTab('guest')}
          >
            tamu
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade ${tabUser ? 'show active' : ''}"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
          <aplikasi-tabel-pengguna guest="false"></aplikasi-tabel-pengguna>
        </div>
        <div
          class="tab-pane fade ${tabUser ? '' : 'show active'}"
          id="profile-tab-pane"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
          < guest="true"></aplikasi-tabel-tamu>
        </div>
      </div>
    `;
  }
}

customElements.define('aplikasi-dasbor', AplikasiDasbor);
