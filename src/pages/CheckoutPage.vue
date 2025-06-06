<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Coșul meu</div>

    <div v-if="cos.length === 0" class="text-subtitle1 text-grey text-center">
      Coșul este gol momentan.
    </div>

    <q-card v-else flat bordered class="q-pa-md q-mb-md">
      <q-list>
        <q-item v-for="(produs, index) in cos" :key="index" class="q-mb-sm">
          <q-item-section avatar>
            <q-img :src="produs.imagine" style="width: 80px; height: 60px" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1">{{ produs.nume }}</q-item-label>
            <q-item-label caption>{{ produs.descriere.slice(0, 60) }}...</q-item-label>
          </q-item-section>

          <q-item-section side class="text-right">
            <div class="text-h6">{{ produs.pret }} RON</div>
            <q-btn icon="delete" flat dense color="red" @click="stergeProdus(index)" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-my-md" />

      <div class="row justify-between items-center">
        <div class="text-h6">Total: {{ total }} RON</div>
        <q-btn label="Finalizează comanda" color="primary" @click="finalizeazaComanda" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from 'src/stores/useProductStore';

const store = useProductStore();
const cos = computed(() => store.cos);

const total = computed(() => store.cos.reduce((suma, produs) => suma + produs.pret, 0));

function stergeProdus(index: number) {
  store.cos.splice(index, 1);
}

function finalizeazaComanda() {
  alert('Comanda a fost înregistrată! Mulțumim pentru achiziție.');
  store.cos = [];
}
</script>
