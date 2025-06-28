<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6">Gestionează Stocul Produselor</div>
    </q-card-section>

    <q-card-section>
      <q-list bordered separator>
        <q-item v-for="produs in produse" :key="produs.id">
          <q-item-section>
            <q-item-label>{{ produs.denumire }}</q-item-label>
            <q-item-label caption>Stoc curent: {{ produs.stoc }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-input
              v-model.number="stocuri[produs.id]"
              type="number"
              dense
              outlined
              style="width: 100px"
              @keyup.enter="updateStock(produs)"
            />
          </q-item-section>
          <q-item-section side>
            <q-btn
              label="Actualizează"
              color="secondary"
              dense
              @click="updateStock(produs)"
              :loading="loading[produs.id]"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductStore, type Produs } from 'stores/useProductStore';
import { api } from 'boot/axios';

const productStore = useProductStore();
const produse = ref<Produs[]>([]);
const stocuri = ref<Record<number, number>>({});
const loading = ref<Record<number, boolean>>({});

onMounted(async () => {
  await productStore.incarcareProduse();
  produse.value = productStore.produse;
  produse.value.forEach((p) => {
    stocuri.value[p.id] = p.stoc;
  });
});

const updateStock = async (produs: Produs) => {
  const newStock = stocuri.value[produs.id];
  if (typeof newStock !== 'number' || newStock < 0) {
    alert('Valoarea stocului este invalidă.');
    return;
  }

  loading.value[produs.id] = true;
  try {
    const updatedProdus = { ...produs, stoc: newStock };
    await api.put(`/api/admin/produse/${produs.id}`, updatedProdus);

    const pToUpdate = produse.value.find((p) => p.id === produs.id);
    if (pToUpdate) {
      pToUpdate.stoc = newStock;
    }
    alert('Stoc actualizat cu succes!');
  } catch (error) {
    console.error('Eroare la actualizarea stocului:', error);
    alert('A apărut o eroare la actualizarea stocului.');
  } finally {
    loading.value[produs.id] = false;
  }
};
</script>
