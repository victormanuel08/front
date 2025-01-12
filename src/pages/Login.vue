<template>
  <q-page class="flex flex-center q-mt-xl" style="display: block;">
    <form-login />
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import FormLogin from 'components/login/FormLogin.vue';
import commonTypes from '../store/modules/common/types';

export default {
  name: 'PageLogin',
  computed: {
    ...mapState(commonTypes.PATH, ['item']),
  },
  components: {
    FormLogin,
  },
};
</script>
