<template>
  <q-page class="auth-page">
    <div class="auth-form">
      <h2>Login</h2>
      <q-input v-model="email" label="Email" type="email" filled />
      <q-input v-model="password" label="Password" type="password" filled class="q-mt-md" />
      <q-btn label="Login" color="primary" class="q-mt-lg full-width" @click="handleLogin" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');

    const handleLogin = () => {
      alert(`Logging in with ${email.value}`);
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
});
</script>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}
.auth-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
