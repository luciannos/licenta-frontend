<template>
  <q-layout view="hHh lpR fFf">
    <div class="animated-background"></div>

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
        <q-btn flat dense icon="shopping_bag" to="/checkout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, #2196f3, #e91e63, #ff9800, #4caf50);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
  opacity: 0.2;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
