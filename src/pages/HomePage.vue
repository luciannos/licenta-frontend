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
  </q-page>
</template>

<script setup lang="ts"></script>
