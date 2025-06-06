<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="shopping_cart" class="q-mr-sm" />
          E-Commerce App
        </q-toolbar-title>

        <q-btn flat dense label="Acasă" to="/home" />
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useProductStore } from 'src/stores/useProductStore';
import { computed } from 'vue';

const store = useProductStore();
const cosCount = computed(() => store.cos.length);
</script>
