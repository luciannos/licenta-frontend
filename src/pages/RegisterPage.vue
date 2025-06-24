<template>
  <q-page class="auth-page">
    <div class="auth-form">
      <h4>Inregistrare</h4>
      <q-input v-model="nume" label="Nume" type="text" filled />
      <q-input v-model="prenume" label="Prenume" type="text" filled class="q-mt-md" />

      <div class="q-mt-md">
        <label class="q-mb-sm">Gen</label>
        <q-option-group v-model="gen" :options="genderOptions" type="radio" inline />
      </div>

      <q-input v-model="email" label="Email" type="email" filled class="q-mt-md" />
      
      <q-input
        v-model="parola"
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Parolă"
        class="q-mt-md"
        :rules="[
          val => !!val || 'Parola este obligatorie',
          val => val.length >= 8 || 'Parola trebuie să aibă minim 8 caractere',
          val => /[A-Z]/.test(val) || 'Parola trebuie să conțină cel puțin o literă mare',
          val => /[a-z]/.test(val) || 'Parola trebuie să conțină cel puțin o literă mică',
          val => /[0-9]/.test(val) || 'Parola trebuie să conțină cel puțin un număr',
          val => /[!@#$%^&*]/.test(val) || 'Parola trebuie să conțină cel puțin un caracter special (!@#$%^&*)'
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
        <template v-slot:hint>
          Parola trebuie să conțină minim 8 caractere, o literă mare, o literă mică, un număr și un caracter special
        </template>
      </q-input>

      <q-input
        v-model="confirmaParola"
        filled
        :type="isPwdConfirm ? 'password' : 'text'"
        label="Confirmă Parola"
        class="q-mt-md"
        :rules="[
          val => !!val || 'Confirmarea parolei este obligatorie',
          val => val === parola || 'Parolele nu coincid'
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdConfirm = !isPwdConfirm"
          />
        </template>
      </q-input>

      <q-input v-model="telefon" label="Număr de telefon" type="tel" filled class="q-mt-md" />
      <q-input v-model="adresa" label="Adresă" type="text" filled class="q-mt-md" />

      <q-btn
        label="Înregistrează-te"
        color="secondary"
        class="q-mt-lg full-width"
        @click="handleRegister"
        :disable="!isFormValid"
      />
      <div class="text-center q-mt-md">
        <q-btn flat color="primary" label="Ai deja un cont? Autentifică-te" to="/login" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const nume = ref('');
const prenume = ref('');
const gen = ref('Bărbat');
const email = ref('');
const parola = ref('');
const confirmaParola = ref('');
const telefon = ref('');
const adresa = ref('');
const isPwd = ref(true);
const isPwdConfirm = ref(true);

const genderOptions = [
  { label: 'Bărbat', value: 'Bărbat' },
  { label: 'Femeie', value: 'Femeie' },
];

const isFormValid = computed(() => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return nume.value &&
         prenume.value &&
         gen.value &&
         email.value &&
         parola.value &&
         confirmaParola.value &&
         parola.value === confirmaParola.value &&
         passwordRegex.test(parola.value) &&
         telefon.value &&
         adresa.value;
});

const handleRegister = async () => {
  if (!isFormValid.value) {
    alert('Te rugăm să completezi toate câmpurile și să te asiguri că parola respectă toate cerințele.');
    return;
  }

  try {
    await authStore.register({
      nume: nume.value,
      prenume: prenume.value,
      gen: gen.value,
      email: email.value,
      parola: parola.value,
      telefon: telefon.value,
      adresa: adresa.value,
    });
    alert('Înregistrare reușită! Vă rugăm să vă autentificați.');
    await router.push('/login');
  } catch (error: unknown) {
    let errorMessage = 'A apărut o eroare la înregistrare.';
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const response = (error as { response?: { data?: string } }).response;
      if (response?.data) {
        errorMessage = response.data;
      }
    }
    alert(`Eroare: ${errorMessage}`);
  }
};
</script>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 1rem 0;
}
.auth-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
