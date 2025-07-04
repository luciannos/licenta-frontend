import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'products', component: () => import('pages/ProductsPage.vue') },
      { path: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'checkout', component: () => import('pages/CheckoutPage.vue') },
      { path: 'account', component: () => import('pages/AccountPage.vue') },
      { path: '/product/:id', component: () => import('pages/ProductDetailsPage.vue') },
      { path: 'admin', component: () => import('pages/AdminPage.vue') },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
