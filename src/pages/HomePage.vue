<template>
  <q-page class="q-pa-xl q-mt-lg flex flex-center column">
    <div class="text-h3 text-primary text-center q-mb-md">
      Bine ai venit în magazinul nostru online!
    </div>

    <div class="text-subtitle1 text-center q-mb-xl">
      Descoperă cele mai bune produse, oferte și servicii, toate la un click distanță.
    </div>

    <q-img
      src="https://hostvision.ro/blog/wp-content/uploads/2020/07/hostvision-blog.png"
      alt="Magazin virtual"
      style="max-width: 900px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2)"
      spinner-color="primary"
    />

    <q-btn label="Vezi Produsele" color="primary" class="q-mt-xl" to="/products" unelevated />

    <div class="q-mt-xl" style="width: 100%; max-width: 900px;">
      <div class="text-h5 q-mb-md">Recomandate pentru tine</div>
      <q-card v-if="loadingRecomandari" flat class="q-pa-md text-center">
        <q-spinner-dots color="primary" size="40px" />
      </q-card>
      <div v-else>
        <q-card v-if="recomandari.length === 0" flat class="q-pa-md text-center text-grey">
          Nu există recomandări momentan.
        </q-card>
        <div v-else class="row q-col-gutter-md">
          <div v-for="produs in recomandari" :key="produs.id" class="col-12 col-sm-6 col-md-4">
            <q-card bordered class="q-hoverable">
              <q-img
                :src="produs.imagine"
                :alt="produs.denumire"
                fit="scale-down"
                style="width: 100%; max-height: 200px; object-fit: cover; display: block"
              />
              <q-card-section>
                <div class="text-h6">{{ produs.denumire }}</div>
                <div class="text-subtitle2">{{ produs.pret }} RON</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn label="Detalii" color="primary" :to="`/product/${produs.id}`" flat />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import type { Produs } from 'src/stores/useProductStore';

const recomandari = ref<Produs[]>([]);
const loadingRecomandari = ref(true);

onMounted(async () => {
  loadingRecomandari.value = true;
  try {
    const resp = await api.get<Produs[]>('/api/produse/recomandate');
    recomandari.value = resp.data;
  } catch {
    recomandari.value = [];
  } finally {
    loadingRecomandari.value = false;
  }
});
</script>
