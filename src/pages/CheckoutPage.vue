<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Coșul meu</div>

    <div v-if="cos.length === 0" class="text-subtitle1 text-grey text-center">
      Coșul este gol momentan.
    </div>

    <q-card v-else flat bordered class="q-pa-md q-mb-md">
      <q-list>
        <q-item v-for="(produs, index) in cos" :key="produs.id" class="q-mb-sm">
          <q-item-section avatar>
            <q-img :src="produs.imagine" style="width: 80px; height: 60px" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1">{{ produs.denumire }}</q-item-label>
            <q-item-label caption> {{ produs.descriere.slice(0, 60) }}... </q-item-label>

            <div class="row items-center q-mt-sm">
              <q-btn round dense flat icon="remove" @click="decrementCant(produs)" />
              <q-input
                v-model.number="produs.cantitate"
                type="number"
                dense
                outlined
                style="width: 60px"
                @update:model-value="
                  (val) => {
                    if (typeof val === 'number' && val >= 1) {
                      actualizeazaCantitate(produs.id, val);
                    }
                  }
                "
              />
              <q-btn round dense flat icon="add" @click="incrementCant(produs)" />
            </div>
          </q-item-section>

          <q-item-section side class="text-right">
            <div class="text-h6">{{ produs.pret * (produs.cantitate || 1) }} RON</div>
            <q-btn icon="delete" flat dense color="red" @click="store.stergeDinCos(index)" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-my-md" />

      <div class="q-mb-md">
        <q-input
          v-model="adresaLivrare"
          label="Adresa de livrare"
          outlined
          :loading="loadingAdresa"
          :disable="loadingAdresa"
          placeholder="Introduceți adresa de livrare"
        />
      </div>

      <div class="row justify-between items-center">
        <div class="text-h6">Total: {{ total }} RON</div>
        <q-btn label="Finalizează comanda" color="primary" @click="trimiteComanda" :loading="loading" :disable="!adresaLivrare" />
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useProductStore } from 'src/stores/useProductStore';
import type { Produs } from 'src/stores/useProductStore';
import { api } from 'boot/axios';
import { useAuthStore } from 'stores/useAuthStore';
import { useRouter } from 'vue-router';

const store = useProductStore();
const authStore = useAuthStore();
const router = useRouter();

const cos = computed(() => store.cos);
const loading = ref(false);
const adresaLivrare = ref('');
const loadingAdresa = ref(true);

onMounted(async () => {
  if (authStore.isLoggedIn) {
    loadingAdresa.value = true;
    try {
      const response = await api.get('/api/user/me');
      adresaLivrare.value = response.data.adresa || '';
    } catch (error) {
      console.error("Nu s-a putut prelua adresa:", error);
    } finally {
      loadingAdresa.value = false;
    }
  } else {
    loadingAdresa.value = false;
  }
});

const total = computed(() =>
  store.cos.reduce((suma, produs) => suma + produs.pret * (produs.cantitate || 1), 0),
);

function actualizeazaCantitate(id: number, cant: number) {
  if (cant < 1) return;
  store.actualizeazaCantitate(id, cant);
}

function incrementCant(produs: Produs) {
  actualizeazaCantitate(produs.id, (produs.cantitate || 1) + 1);
}

function decrementCant(produs: Produs) {
  if ((produs.cantitate || 1) > 1) {
    actualizeazaCantitate(produs.id, (produs.cantitate || 1) - 1);
  }
}

async function trimiteComanda() {
  if (!authStore.isLoggedIn) {
    alert('Trebuie să fii autentificat pentru a plasa o comandă.');
    await router.push('/login');
    return;
  }

  loading.value = true;
  const detaliiComanda = cos.value.map(produs => ({
    idProdus: produs.id,
    cantitate: produs.cantitate || 1,
    pretUnitar: produs.pret
  }));

  try {
    await api.post('/api/comenzi', {
      detaliiComanda,
      adresaLivrare: adresaLivrare.value
    });
    alert('Comanda a fost înregistrată! Mulțumim pentru achiziție.');
    store.golesteCos();
  } catch (error: unknown) {
    let errorMessage = 'A apărut o eroare la trimiterea comenzii.';
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const response = (error as { response?: { data?: { message?: string } } }).response;
      if (response?.data?.message) {
        errorMessage = response.data.message;
      }
    }
    alert(`Eroare: ${errorMessage}`);
  } finally {
    loading.value = false;
  }
}
</script>
