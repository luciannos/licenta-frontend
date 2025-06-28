<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">Adaugă un produs nou</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit.prevent="addProduct">
        <q-input v-model="produs.denumire" label="Denumire Produs" filled required />
        <q-input
          v-model="produs.descriere"
          label="Descriere"
          type="textarea"
          filled
          class="q-mt-md"
        />
        <q-input v-model="produs.categorie" label="Categorie" filled class="q-mt-md" />
        <q-input
          v-model.number="produs.pret"
          label="Preț"
          type="number"
          step="0.01"
          filled
          class="q-mt-md"
          required
        />
        <q-input
          v-model.number="produs.stoc"
          label="Stoc"
          type="number"
          filled
          class="q-mt-md"
          required
        />
        <q-input v-model="produs.imagine" label="URL Imagine" filled class="q-mt-md" />

        <q-btn
          label="Adaugă Produs"
          type="submit"
          color="primary"
          class="q-mt-lg"
          :loading="loading"
        />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'boot/axios';

const loading = ref(false);
const produs = ref({
  denumire: '',
  descriere: '',
  categorie: '',
  pret: 0,
  stoc: 0,
  imagine: '',
});

const addProduct = async () => {
  loading.value = true;
  try {
    await api.post('/api/admin/produse', produs.value);
    alert('Produs adăugat cu succes!');
    produs.value = {
      denumire: '',
      descriere: '',
      categorie: '',
      pret: 0,
      stoc: 0,
      imagine: '',
    };
  } catch (error) {
    console.error('Eroare la adăugarea produsului:', error);
    alert('A apărut o eroare la adăugarea produsului.');
  } finally {
    loading.value = false;
  }
};
</script>
