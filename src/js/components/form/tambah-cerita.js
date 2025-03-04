import { html } from 'lit';
import LitTanpaShadowDom from '../base/Lit-tanpa-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import Crud from '../../network/crud';
import Utils from '../../utils/utils';
import axios from 'axios';

class TambahCerita extends LitTanpaShadowDom {
  static properties = {
    name: { type: String, reflect: true },
    guest: { type: Boolean },
    location: { type: Boolean },
    lat: { type: String, reflect: true },
    lon: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.sedangMengirim = false;

    this.name = Utils.dapatkanNamaPengguna();
    this.guest = false;
  }

  render() {
    return html`
      <form class="was-validated padded-20">
        <div id="div-alert"></div>
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="${msg(`masukan deskripsi disini`)}"
            id="descriptionInput"
            style="height: 100px"
            minlength="5"
            maxlength="125"
            required
          ></textarea>
          <label for="floatingTextarea2">${msg(`deskripsi`)}</label>
          <div class="invalid-feedback">${msg(`masukan text minimal 5-125 huruf`)}</div>
        </div>
        <div class="input-group">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            class="form-control"
            id="imageInput"
            aria-describedby="inputGroupFileAddon04"
            aria-label="Upload"
            required
            @change=${this._previewImage}
          />
        </div>
        <img id="previewImage" src="" />
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="inputGuest"
            @change=${this._toggleGuestMode}
          />
          <label class="form-check-label" for="inputGuest"
            >${msg(`kirim sebagai`)} ${this.name}/${msg(`tamu`)}?</label
          >
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="inputLocation"
            @change=${this._toggleLocationMode}
          />
          <label class="form-check-label" for="inputLocation"
            >location? <small id="lat">${this.lat}</small>
            <small id="lon">${this.lon}</small></label
          >
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button type="button" class="btn btn-outline-primary" @click=${this._sendPost}>
            ${msg(`kirim`)}
          </button>
        </div>
      </form>
    `;
  }

  _previewImage(event) {
    const imageInput = event.target;
    const previewImage = document.getElementById('previewImage');
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      previewImage.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      previewImage.src = '';
    }
  }

  _toggleGuestMode(event) {
    this.guest = event.target.checked;
  }

  async _reverseGeocode(lat, lon) {
    const key = '';
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${key}`;

    const response = await axios(url);
    const { country } = response.data.features[0].properties;
    const { city } = response.data.features[0].properties;
    alert(country, city);
  }

  async _toggleLocationMode(event) {
    console.log(this.lat);

    if (event.target.checked) {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.location = true;

          // this._reverseGeocode(this.lat, this.lon);
        } catch (error) {
          this._showAllert('location', error.message);
          event.target.checked = false;
          this.location = false;
        }
      } else {
        this._showAllert('location', 'Geolocation is not supported by this browser.');
        this.location = false;
      }
    } else {
      this.lat = null;
      this.lon = null;
      this.location = false;
      if (navigator.geolocation) {
        navigator.geolocation.clearWatch();
      }
    }
  }

  async _sendPost() {
    const formData = this._getFormData();
    const lat = this.lat ? this.lat : null;
    const lon = this.lon ? this.lon : null;

    if (formData.description.length < 5 || formData.description.length > 125) {
      this._showAllert('add', 'Enter the description text of at least 5-125 letters');
      return;
    }

    if (this.sedangMengirim) return;

    if (this._validateFormData({ ...formData })) {
      try {
        if (!this.guest) {
          await Crud.buatCerita({
            description: formData.description,
            photo: formData.image,
            lat,
            lon,
          });
        } else {
          await Crud.tambahCeritaTamu({
            description: formData.description,
            photo: formData.image,
            lat,
            lon,
          });
        }

        sessionStorage.setItem('home', 0);
        this._goToDashboardPage();
      } catch (error) {
        this._showAllert('add', error.response.data.message);
        console.error(error);
      }
    }
  }

  _showAllert(type, message) {
    const alertPlaceholder = document.getElementById('div-alert');
    alertPlaceholder.innerHTML = `<pembungkus-pemberitahuan type="${type}" message="${message}"></pembungkus-pemberitahuan>`;
  }

  _getFormData() {
    const descriptionInput = document.querySelector('#descriptionInput');
    const imageInput = document.querySelector('#imageInput');

    return {
      name: this.name,
      date: new Date().toISOString(),
      image: imageInput.files[0],
      description: descriptionInput.value,
    };
  }

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item == '');

    return formDataFiltered.length == 0;
  }

  _goToDashboardPage() {
    window.location.href = '/';
  }
}

customElements.define('tambah-cerita', TambahCerita);
