import { html } from 'lit';
import LitTanpaShadowDom from '../base/Lit-tanpa-shadow-dom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import Crud from '../../network/crud';
import Utils from '../../utils/utils';

class AplikasiTabel extends LitTanpaShadowDom {
  static properties = {
    data: { type: Array, reflect: true },
    chunk: { type: Number, reflect: true },
    totalChunk: { type: Number, reflect: true },
    status: { type: String, reflect: true },
    guest: { type: String, reflect: true },
    tab: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.data = [];
    this._fetchData();
  }

  async _fetchData() {
    try {
      const response = (await Crud.getSemuaCerita()).data.listStory;
      const chunkedData =
        this.guest == 'true' ? this._chunkArray(response, 9, true) : this._chunkArray(response, 9);

      if (!chunkedData.length == 0) {
        this.chunk = sessionStorage.getItem(this.tab) ? sessionStorage.getItem(this.tab) : 0;
        this.totalChunk = chunkedData.length;
        this.data = chunkedData[this.chunk];

        this._checkStatus();
      } else {
        this.data = chunkedData;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  _checkStatus() {
    if (!this.data) {
      sessionStorage.setItem(this.tab, 0);
      window.location.reload();
    }

    if (this.totalChunk == 1) {
      this.status = 'both';
    } else if (parseInt(this.chunk) + 1 == this.totalChunk) {
      this.status = 'next';
    } else if (this.chunk == 0) {
      this.status = 'prev';
    } else {
      this.status = 'normal';
    }
  }

  _chunkArrayUser(arrays, chunkSize) {
    const result = [];
    const filteredArrays = arrays.filter((array) => array.name === Utils.dapatkanNamaPengguna());

    for (let i = 0; i < filteredArrays.length; i += chunkSize) {
      result.push(filteredArrays.slice(i, i + chunkSize));
    }

    return result;
  }

  _chunkArray(arrays, chunkSize, guest = false) {
    const result = [];
    if (guest == true) {
      const excludeNames = ['guest', 'Guest'];
      const filteredArrays = arrays.filter((array) => excludeNames.includes(array.name));

      for (let i = 0; i < filteredArrays.length; i += chunkSize) {
        result.push(filteredArrays.slice(i, i + chunkSize));
      }
    } else {
      const filteredArrays = arrays.filter((array) => array.name === Utils.dapatkanNamaPengguna());

      for (let i = 0; i < filteredArrays.length; i += chunkSize) {
        result.push(filteredArrays.slice(i, i + chunkSize));
      }
    }
    this.chunk = 0;

    return result;
  }

  render() {
    return html`
      <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col w-75">${msg(`deskripsi`)}</th>
            <th scope="col">${msg(`tanggal`)}</th>
          </tr>
        </thead>
        <tbody>
          ${!this.data.length == 0
            ? html`
                ${this.data.map(
                  (item, index) => html`
                    <tr id="${item.description}]">
                      <th scope="row">${index + 1}</th>
                      <td class="w-75 w-md-25">
                        <p class="p-md-wrap">${item.description}</p>
                      </td>
                      <td class="d-flex justify-content-between gap-4 flex-column flex-lg-row">
                        <div class="d-flex gap-2 ">
                          <i class="bi bi-calendar-check"></i>
                          <small class="text-body-secondary"> ${this._time(item.createdAt)}</small>
                        </div>
                        <div class="d-flex justify-content-center gap-2">
                          <a
                            href="#"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#modal_${this.tab}_${index}"
                            ><i class="bi bi-eye"></i
                          ></a>
                          <a
                            href="#"
                            class="btn btn-primary"
                            @click="${() => this._editStory(item.id)}"
                            ><i class="bi bi-pencil"></i
                          ></a>
                          <a href="#" class="btn btn-primary"><i class="bi bi-trash"></i></a>
                          <barang-modal
                            target="modal_${this.tab}_${index}"
                            name="${item.name}"
                            date="${this._time(item.createdAt)}"
                            img="${item.photoUrl}"
                            description="${item.description}"
                          ></barang-modal>
                        </div>
                      </td>
                    </tr>
                  `,
                )}
              `
            : html`
                <tr>
                  <th scope="row">0.</th>
                  <td class="w-75 w-md-25">
                    <p class="p-md-wrap">${msg(`data tidak ditemukan`)}</p>
                  </td>
                  <td class="w-75 w-md-25"></td>
                </tr>
              `}
        </tbody>
      </table>
      <table-pagination
        chunk=${this.chunk}
        totalChunk=${this.totalChunk}
        status="${this.status}"
        tab="${this.tab}"
      ></table-pagination>
    `;
  }

  _editStory(storyId) {
    const editStoryUrl = `/user/edit-story.html?id=${storyId}`;
    window.location.href = editStoryUrl;
  }

  _time(time) {
    const date = new Date(time);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;

    const withSlashes = [formattedDay, formattedMonth, year].join('/');
    return withSlashes;
  }
}

export default AplikasiTabel;
