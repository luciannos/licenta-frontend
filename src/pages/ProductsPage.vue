<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Catalog produse</div>

    <div class="row q-col-gutter-md q-mb-md">
      <q-input class="col-6" v-model="filtru" label="Caută produs" dense outlined debounce="300" />
      <q-select
        class="col-6"
        v-model="sortare"
        :options="[
          { label: 'Preț crescător', value: 'asc' },
          { label: 'Preț descrescător', value: 'desc' },
        ]"
        label="Sortare"
        dense
        outlined
      />
    </div>

    <q-card flat bordered class="q-pa-sm">
      <q-card-section class="q-gutter-md row q-col-gutter-md">
        <q-card
          v-for="produs in produseFiltrate"
          :key="produs.id"
          class="my-card col-xs-12 col-sm-6 col-md-4 col-lg-3"
          bordered
        >
          <q-img :src="produs.imagine" :alt="produs.nume" ratio="4/3" />

          <q-card-section>
            <div class="text-subtitle1">{{ produs.nume }}</div>
            <div class="text-grey text-caption q-mt-xs">{{ produs.descriere.slice(0, 70) }}...</div>
          </q-card-section>

          <q-card-section class="row items-center justify-between">
            <div class="text-h6">{{ produs.pret }} RON</div>
            <q-btn color="primary" label="Adaugă în coș" @click="adaugaInCos(produs)" />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useProductStore } from 'src/stores/useProductStore';

const store = useProductStore();

const produseFiltrate = computed(() => store.produseFiltrate);
interface Produs {
  id: number;
  nume: string;
  descriere: string;
  imagine: string;
  pret: number;
}

const adaugaInCos = (produs: Produs) => store.adaugaInCos(produs);

const filtru = computed({
  get: () => store.filtru,
  set: (val) => (store.filtru = val),
});

const sortare = computed({
  get: () => store.sortare,
  set: (val) => (store.sortare = val),
});

onMounted(() => {
  store.incarcareProduse();
});
</script>

<style scoped>
.my-card {
  max-width: 100%;
}
</style>
