<template>
  <q-page class="auth-page">
    <div class="auth-form">
      <h2>Login</h2>
      <q-input v-model="email" label="Email" type="email" filled />
      <q-input v-model="parola" label="Parola" type="password" filled class="q-mt-md" />
      <q-btn label="Login" color="primary" class="q-mt-lg full-width" @click="handleLogin" />
      <div class="text-center q-mt-md">
        <q-btn flat color="secondary" label="Nu ai cont? Înregistrează-te" to="/register" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const parola = ref('');

const handleLogin = async () => {
  try {
    await authStore.login(email.value, parola.value);
    if (authStore.isAdmin) {
      await router.push('/admin');
    } else {
      await router.push('/');
    }
  } catch {
    alert('Autentificare eșuată. Verificați email-ul și parola.');
  }
};
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
