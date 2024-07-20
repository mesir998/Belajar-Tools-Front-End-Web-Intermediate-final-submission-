import axios from 'axios';
import ApiEndpoint from '../utils/api-end-point';
import Utils from '../utils/utils';

const api = axios.create({
  baseURL: ApiEndpoint.BASE_URL,
  timeout: 1000,
});

const Crud = {
  async getSemuaCerita() {
    return await api.get(ApiEndpoint.GET_ALL_STORIES, {
      headers: {
        Authorization: `Bearer ${Utils.ambilTokenUser()}`,
      },
    });
  },

  async dapatkanCeritaById(id) {
    return await api.get(ApiEndpoint.DAPATKAN_DETAIL_CERITA(id), {
      headers: {
        Authorization: `Bearer ${Utils.ambilTokenUser()}`,
      },
    });
  },

  async buatCerita({ description, photo, lat, lon }) {
    const data = { description, photo, lat, lon };
    return await api.post(ApiEndpoint.POST_STORY, data, {
      headers: {
        Authorization: `Bearer ${Utils.ambilTokenUser()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async tambahCeritaTamu({ description, photo, lat, lon }) {
    const data = { description, photo, lat, lon };
    return await api.post(ApiEndpoint.POST_STORY_GUEST, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default Crud;
