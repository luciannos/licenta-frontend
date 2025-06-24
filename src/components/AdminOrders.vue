<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">Comenzi Recente</div>
    </q-card-section>

    <q-card-section>
      <q-list bordered separator>
        <q-expansion-item
          v-for="comanda in comenzi"
          :key="comanda.id"
          :label="`Comanda #${comanda.id} - ${comanda.userEmail}`"
          :caption="`Total: ${comanda.total} RON - Data: ${new Date(comanda.dataComanda).toLocaleString()}`"
          group="comenzi"
        >
          <q-card>
            <q-card-section>
              <div class="text-subtitle1">Detalii Comandă:</div>
              <q-list dense separator>
                <q-item v-for="detaliu in comanda.detaliiComanda" :key="detaliu.produsId">
                  <q-item-section>
                    <q-item-label>Produs ID: {{ detaliu.produsId }}</q-item-label>
                    <q-item-label caption>Cantitate: {{ detaliu.cantitate }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    Preț unitar: {{ detaliu.pretUnitar }} RON
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <div v-if="loading" class="text-center q-pa-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import type { ComandaDto } from 'src/dto/ComandaDto';

const comenzi = ref<ComandaDto[]>([]);
const loading = ref(true);

const fetchComenzi = async () => {
  loading.value = true;
  try {
    const response = await api.get('/api/admin/comenzi');
    comenzi.value = response.data;
  } catch (error) {
    console.error('Eroare la încărcarea comenzilor:', error);
    alert('A apărut o eroare la încărcarea comenzilor.');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchComenzi);
</script> 