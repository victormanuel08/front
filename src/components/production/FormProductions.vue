<template>
  <div class="q-pa-md">
    <q-dialog v-model="modal.show" persistent>
      <q-card style="width: 900px; max-width: 90vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ modal.title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 70vh" class="scroll">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input outlined label="Fecha de Cargue *" v-model="production.date" :rules="rules.date" />
            <q-input outlined label="Fecha de Descargue *" v-model="production.date_download" :rules="rules.date_download" />
            <q-select outlined label="Horno *" v-model="production.oven" :options="ovens" option-label="name" option-value="id" :rules="rules.oven" />
            <q-input outlined label="Eficiencia *" v-model="production.performance" :rules="rules.performance" />
            <q-select outlined label="Producto Inicial *" v-model="production.starting" :options="materials" option-label="name" option-value="id" :rules="rules.starting" />
            <q-select outlined label="Producto Medio" v-model="production.medium" :options="materials" option-label="name" option-value="id" />
            <q-select outlined label="Producto Final *" v-model="production.finished" :options="materials" option-label="name" option-value="id" :rules="rules.finished" />
            <q-input outlined label="Capacidad" v-model="production.capacity" />
            <q-input outlined label="Performance Ton" v-model="production.performance_ton" />
            <q-input outlined label="Horas" v-model="production.hours" />
            <q-checkbox v-model="production.finalized" label="Finalizado" />
            <q-separator />
            <div class="row text-center">
              <q-btn label="Cancelar" type="reset" color="primary" outline class="col" v-close-popup @click="modal.show = false" />
              <q-btn label="Aceptar" type="submit" color="primary" class="col q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import productionTypes from '../../store/modules/production/types';
import { showNotifications } from '../../helpers/showNotifications';
import { showLoading } from '../../helpers/showLoading';
import { validateDate } from '../../helpers/validateDate';

export default {
  data() {
    return {
      modal: {
        show: false,
        title: '',
        type: '',
      },
      production: {
        id: null,
        date: '',
        date_download: '',
        oven: null,
        performance: '',
        starting: null,
        medium: null,
        finished: null,
        capacity: '',
        performance_ton: '',
        hours: '',
        finalized: false,
      },
      rules: {
        date: [
          (val) => (!!val) || 'La fecha de cargue es requerida',
          (val) => (validateDate(val) === true) || 'La fecha ingresada no es válida',
        ],
        date_download: [
          (val) => (!!val) || 'La fecha de descargue es requerida',
          (val) => (validateDate(val) === true) || 'La fecha ingresada no es válida',
        ],
        oven: [
          (val) => (!!val) || 'El horno es requerido',
        ],
        performance: [
          (val) => (!!val) || 'La eficiencia es requerida',
        ],
        starting: [
          (val) => (!!val) || 'El producto inicial es requerido',
        ],
        finished: [
          (val) => (!!val) || 'El producto final es requerido',
        ],
      },
      ovens: [],
      materials: [],
    };
  },
  props: [
    'showNotificationsRef',
    'listProductionsMountedRef',
  ],
  computed: {
    ...mapState(productionTypes.PATH, [
      'status',
      'responseMessages',
    ]),
  },
  methods: {
    ...mapActions(productionTypes.PATH, {
      saveProduction: productionTypes.actions.SAVE_PRODUCTION,
      updateProduction: productionTypes.actions.UPDATE_PRODUCTION,
      deleteProduction: productionTypes.actions.DELETE_PRODUCTION,
      getProduction: productionTypes.actions.GET_PRODUCTION,
      listOvens: productionTypes.actions.LIST_OVENS,
      listMaterials: productionTypes.actions.LIST_MATERIALS,
    }),
    async onSubmit() {
      showLoading('Procesando...', 'Por favor, espere', true);
      if (this.modal.type === 'C') {
        await this.saveProduction(this.production);
      } else if (this.modal.type === 'E') {
        await this.updateProduction(this.production);
      } else if (this.modal.type === 'D') {
        await this.deleteProduction(this.production.id);
      }
      if (this.status === true) {
        this.showNotificationsRef(this.responseMessages, this.status, 'top-right', 5000);
        this.$q.loading.hide();
        this.resetForm();
        this.listProductionsMountedRef();
        this.modal.show = false;
      } else {
        this.showNotification(this.responseMessages, this.status, 'top-right', 5000);
        this.$q.loading.hide();
      }
    },
    async showModal(id, production, type) {
      await this.listOvens();
      await this.listMaterials();
      if (id !== null) {
        await this.getProduction(id);
        this.production = { ...this.production };
      } else {
        this.resetForm();
      }
      this.modal.title = type === 'C' ? 'Agregar Producción' : (type === 'E' ? 'Editar Producción' : 'Eliminar Producción');
      this.modal.type = type;
      this.modal.show = true;
    },
    resetForm() {
      this.production = {
        id: null,
        date: '',
        date_download: '',
        oven: null,
        performance: '',
        starting: null,
        medium: null,
        finished: null,
        capacity: '',
        performance_ton: '',
        hours: '',
        finalized: false,
      };
    },
    showNotification(messages, status, align, timeout) {
      showNotifications(messages, status, align, timeout);
    },
  },
};
</script>
