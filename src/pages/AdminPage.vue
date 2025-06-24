<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Panou Administrator</div>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="orders" label="Comenzi Recente" />
      <q-tab name="products" label="Gestionare Produse" />
      <q-tab name="add_product" label="Adăugare Produs" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="orders">
        <AdminOrders />
      </q-tab-panel>

      <q-tab-panel name="products">
        <AdminProducts />
      </q-tab-panel>

      <q-tab-panel name="add_product">
        <AdminAddProduct />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminOrders from 'components/AdminOrders.vue';
import AdminProducts from 'components/AdminProducts.vue';
import AdminAddProduct from 'components/AdminAddProduct.vue';

const tab = ref('orders');
</script>

<style scoped></style>
