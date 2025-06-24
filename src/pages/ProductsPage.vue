<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-6">
        <q-input v-model="filtru" label="Caută produs" outlined dense debounce="300" />
      </div>
      <div class="col-12 col-md-6">
        <q-select
          v-model="sortare"
          label="Sortare după preț"
          :options="['asc', 'desc']"
          outlined
          dense
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div v-for="produs in produseFiltrate" :key="produs.id" class="col-12 col-sm-6 col-md-4">
        <router-link :to="`/product/${produs.id}`" class="text-dark" style="text-decoration: none">
          <q-card bordered class="q-hoverable">
            <q-img
              class="mb-4"
              :src="produs.imagine"
              alt="Imagine produs"
              fit="scale-down"
              aspect-ratio="16/9"
              spinner-color="primary"
              style="width: 100%; max-height: 200px; object-fit: cover; display: block"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  Nu s-a putut încărca imaginea
                </div>
              </template>
            </q-img>

            <q-card-section>
              <div class="text-h6">{{ produs.denumire }}</div>
              <div class="text-subtitle2">{{ produs.pret }} RON</div>
            </q-card-section>
          </q-card>
        </router-link>

        <q-btn
          label="Adaugă în coș"
          icon="add_shopping_cart"
          color="primary"
          class="q-mt-sm"
          @click="adaugaInCos(produs)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import type { Produs } from 'src/stores/useProductStore';
import { useProductStore } from 'src/stores/useProductStore';

const store = useProductStore();

const produseFiltrate = computed(() => store.produseFiltrate);

const filtru = computed({
  get: () => store.filtru,
  set: (val) => (store.filtru = val),
});

const sortare = computed({
  get: () => store.sortare,
  set: (val) => (store.sortare = val),
});

const adaugaInCos = (produs: Produs) => {
  store.adaugaInCos(produs);
};

onMounted(() => {
  void store.incarcareProduse();
});
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.q-card {
  transition: box-shadow 0.2s ease;
}
.q-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
