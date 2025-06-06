<template>
  <q-page class="q-pa-md">
    <!-- NAVBAR LOCAL -->
    <q-header elevated class="bg-primary text-white q-mb-md">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="shopping_cart" class="q-mr-sm" />
          E-Commerce App
        </q-toolbar-title>

        <q-btn flat dense label="Acasă" to="/" />
        <q-btn flat dense label="Produse" to="/products" />
        <q-btn flat dense label="Despre" to="/about" />

        <q-space />

        <q-btn flat dense icon="shopping_bag" to="/checkout">
          <q-badge v-if="cosCount > 0" color="red" floating transparent>
            {{ cosCount }}
          </q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- CONȚINUT PAGINĂ -->
    <div class="text-h4 q-mt-md">Bine ai venit!</div>
    <p class="text-subtitle1 q-mt-sm">
      Descoperă cele mai bune produse în magazinul nostru online.
    </p>
  </q-page>
</template>

<script setup lang="ts">
import { useProductStore } from 'src/stores/useProductStore';
import { computed } from 'vue';

const store = useProductStore();
const cosCount = computed(() => store.cos.length);
</script>
