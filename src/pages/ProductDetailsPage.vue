<template>
  <q-page class="q-pa-md">
    <q-card v-if="produs" class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <q-img :src="produs.imagine" :alt="produs.denumire" fit="scale-down" />
        </div>

        <div class="col-12 col-md-8">
          <div class="text-h5">{{ produs.denumire }}</div>
          <div class="text-subtitle1 text-grey q-mt-sm" style="white-space: pre-wrap;">{{ produs.descriere }}</div>
          <div class="text-h6 q-mt-md">Preț: {{ produs.pret }} RON</div>
          <div class="text-subtitle2 q-mt-sm">În stoc: {{ produs.stoc }} buc.</div>

          <q-separator class="q-my-md" />

          <q-btn
            color="primary"
            icon="shopping_cart"
            class="q-mt-md"
            label="Adaugă în coș"
            :disable="produs.stoc === 0"
            @click="adaugaInCos"
          />
        </div>
      </div>
    </q-card>

    <q-card v-else class="q-pa-md text-center">
      <q-spinner-dots color="primary" size="40px" v-if="loading" />
      <div v-else class="text-h6 text-negative">Produsul nu a fost găsit.</div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore, type Produs } from 'src/stores/useProductStore';
import { ref, onMounted } from 'vue';

const route = useRoute();
const store = useProductStore();

const produs = ref<Produs | null>(null);
const loading = ref(true);

onMounted(async () => {
  const produsId = parseInt(route.params.id as string, 10);
  produs.value = await store.fetchProdus(produsId);
  loading.value = false;
});

function adaugaInCos() {
  if (produs.value) {
    store.adaugaInCos(produs.value);
  }
}
</script>

<style scoped lang="scss">
.q-card img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
}
</style>
