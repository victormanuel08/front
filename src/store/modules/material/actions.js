import types from './types';
import materialApi from '../../../api/material/materialApi';

export default {
  async [types.actions.LIST_MATERIALS]({ commit }, payload) {
    try {
      // alert(`LIST_MATERIALS - displayAll: ${payload.displayAll}, id: ${payload.id}`);
      const response = await materialApi.list(payload);
      // alert(`Response: ${JSON.stringify(response)}`); // Agrega un alert para verificar la respuesta
      if (response && response.data && response.data.data) {
        commit(types.mutations.SET_STATUS, true);
        commit(types.mutations.SET_MATERIALS, response.data.data);
      } else {
        throw new Error('La respuesta del servidor no contiene la propiedad data');
      }
    } catch (error) {
      // alert(`Error fetching materials: ${error}`);
      console.error('Error fetching materials:', error);
      commit(types.mutations.SET_STATUS, false);
      if (error.message !== 'Network Error') {
        commit(types.mutations.SET_RESPONSE_MESSAGES, error.response ? error.response.data.message : error.message);
      } else {
        commit(types.mutations.SET_RESPONSE_MESSAGES, [
          {
            text: 'Error de red',
            detail: 'Intente conectarse a otra red de internet',
          },
        ]);
      }
    }
  },
  async [types.actions.GET_MATERIAL]({ commit }, id) {
    try {
      const response = await materialApi.get(id);
      commit(types.mutations.SET_STATUS, true);
      commit(types.mutations.SET_MATERIAL, response.data.data);
    } catch (error) {
      commit(types.mutations.SET_STATUS, false);
      if (error.message !== 'Network Error') {
        commit(types.mutations.SET_RESPONSE_MESSAGES, error.response.data.message);
      } else {
        commit(types.mutations.SET_RESPONSE_MESSAGES, [
          {
            text: 'Error de red',
            detail: 'Intente conectarse a otra red de internet',
          },
        ]);
      }
    }
  },
  async [types.actions.GET_MATERIALS_BY_YARD]({ commit }, id) {
    try {
      const response = await materialApi.getByYard(id);
      commit(types.mutations.SET_STATUS, true);
      commit(types.mutations.SET_MATERIALS, response.data.data);
    } catch (error) {
      commit(types.mutations.SET_STATUS, false);
      if (error.message !== 'Network Error') {
        commit(types.mutations.SET_RESPONSE_MESSAGES, error.response.data.message);
      } else {
        commit(types.mutations.SET_RESPONSE_MESSAGES, [
          {
            text: 'Error de red',
            detail: 'Intente conectarse a otra red de internet',
          },
        ]);
      }
    }
  },
  async [types.actions.SAVE_MATERIAL]({ commit }, payload) {
    try {
      const response = await materialApi.save(payload);
      commit(types.mutations.SET_STATUS, true);
      commit(types.mutations.SET_RESPONSE_MESSAGES, response.data.message);
    } catch (error) {
      commit(types.mutations.SET_STATUS, false);
      if (error.message !== 'Network Error') {
        commit(types.mutations.SET_RESPONSE_MESSAGES, error.response.data.message);
      } else {
        commit(types.mutations.SET_RESPONSE_MESSAGES, [
          {
            text: 'Error de red',
            detail: 'Intente conectarse a otra red de internet',
          },
        ]);
      }
    }
  },
  async [types.actions.UPDATE_MATERIAL]({ commit }, payload) {
    try {
      const response = await materialApi.update(payload);
      commit(types.mutations.SET_STATUS, true);
      commit(types.mutations.SET_RESPONSE_MESSAGES, response.data.message);
    } catch (error) {
      commit(types.mutations.SET_STATUS, false);
      if (error.message !== 'Network Error') {
        commit(types.mutations.SET_RESPONSE_MESSAGES, error.response.data.message);
      } else {
        commit(types.mutations.SET_RESPONSE_MESSAGES, [
          {
            text: 'Error de red',
            detail: 'Intente conectarse a otra red de internet',
          },
        ]);
      }
    }
  },
  async [types.actions.DELETE_MATERIAL]({ commit }, payload) {
    try {
      const response = await materialApi.delete(payload);
      commit(types.mutations.SET_STATUS, true);
      commit(types.mutations.SET_RESPONSE_MESSAGES, response.data.message);
    } catch (error) {
      commit(types.mutations.SET_STATUS, false);
      if (error.message !== 'Network Error') {
        commit(types.mutations.SET_RESPONSE_MESSAGES, error.response.data.message);
      } else {
        commit(types.mutations.SET_RESPONSE_MESSAGES, [
          {
            text: 'Error de red',
            detail: 'Intente conectarse a otra red de internet',
          },
        ]);
      }
    }
  },
};
