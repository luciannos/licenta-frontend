<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Contul meu</div>
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6">Detalii cont</div>
        <div><b>Nume:</b> {{ user.nume }} {{ user.prenume }}</div>
        <div><b>Email:</b> {{ user.email }}</div>
        <div><b>Telefon:</b> {{ user.telefon }}</div>
        <div><b>Adresă:</b> {{ user.adresa }}</div>
        <div><b>Gen:</b> {{ user.gen }}</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-h6 q-mb-sm">Modifică adresa</div>
        <q-input v-model="adresaNoua" label="Adresă nouă" filled class="q-mb-sm" />
        <q-btn label="Salvează adresa" color="primary" @click="updateAdresa" :loading="loadingAdresa" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-h6 q-mb-sm">Modifică numărul de telefon</div>
        <q-input v-model="telefonNou" label="Număr de telefon nou" filled class="q-mb-sm" />
        <q-btn label="Salvează telefonul" color="primary" @click="updateTelefon" :loading="loadingTelefon" />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-h6 q-mb-sm">Schimbă parola</div>
        <q-input v-model="parolaVeche" label="Parola veche" type="password" filled class="q-mb-sm" />
        <q-input v-model="parolaNoua" label="Parola nouă" type="password" filled class="q-mb-sm" />
        <q-input v-model="parolaNouaConfirm" label="Confirmă parola nouă" type="password" filled class="q-mb-sm" />
        <q-btn label="Schimbă parola" color="secondary" @click="updateParola" :loading="loadingParola" />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h6">Ultimele comenzi</div>
        <q-list bordered separator>
          <q-item v-for="comanda in comenzi" :key="comanda.id">
            <q-item-section>
              <q-item-label><b>Comanda #{{ comanda.id }}</b> - {{ comanda.dataComanda ? new Date(comanda.dataComanda).toLocaleString() : '' }}</q-item-label>
              <q-item-label caption>Status: {{ comanda.status }} | Total: {{ comanda.total }} RON</q-item-label>
              <q-item-label caption>Adresă livrare: {{ comanda.adresaLivrare }}</q-item-label>
              <q-list dense>
                <q-item v-for="det in comanda.detaliiComanda" :key="det.produsId">
                  <q-item-section>Produs ID: {{ det.produsId }}</q-item-section>
                  <q-item-section side>Cantitate: {{ det.cantitate }}</q-item-section>
                  <q-item-section side>Preț unitar: {{ det.pretUnitar }} RON</q-item-section>
                </q-item>
              </q-list>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-if="comenzi.length === 0" class="text-grey q-mt-md">Nu ai comenzi plasate.</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useAuthStore } from 'stores/useAuthStore';
import { useRouter } from 'vue-router';
import type { ComandaDto } from 'src/dto/ComandaDto';

interface UserProfile {
  nume: string;
  prenume: string;
  email: string;
  telefon: string;
  adresa: string;
  gen: string;
}

const authStore = useAuthStore();
const router = useRouter();

const user = ref<UserProfile>({ nume: '', prenume: '', email: '', telefon: '', adresa: '', gen: '' });
const comenzi = ref<ComandaDto[]>([]);
const adresaNoua = ref('');
const telefonNou = ref('');
const loadingAdresa = ref(false);
const loadingTelefon = ref(false);
const parolaVeche = ref('');
const parolaNoua = ref('');
const parolaNouaConfirm = ref('');
const loadingParola = ref(false);

const fetchUser = async () => {
  try {
    const resp = await api.get('/api/user/me');
    user.value = resp.data;
    adresaNoua.value = user.value.adresa;
    telefonNou.value = user.value.telefon;
  } catch {
    alert('Eroare la încărcarea datelor de cont.');
    void router.push('/login');
  }
};

const fetchComenzi = async () => {
  try {
    const resp = await api.get('/api/user/comenzi');
    comenzi.value = resp.data;
  } catch {
    comenzi.value = [];
  }
};

const updateAdresa = async () => {
  loadingAdresa.value = true;
  try {
    await api.put('/api/user/adresa', adresaNoua.value);
    user.value.adresa = adresaNoua.value;
    alert('Adresa a fost actualizată!');
  } catch {
    alert('Eroare la actualizarea adresei.');
  } finally {
    loadingAdresa.value = false;
  }
};

const updateTelefon = async () => {
  loadingTelefon.value = true;
  try {
    await api.put('/api/user/telefon', telefonNou.value);
    user.value.telefon = telefonNou.value;
    alert('Numărul de telefon a fost actualizat!');
  } catch {
    alert('Eroare la actualizarea numărului de telefon.');
  } finally {
    loadingTelefon.value = false;
  }
};

const updateParola = async () => {
  if (!parolaNoua.value || parolaNoua.value !== parolaNouaConfirm.value) {
    alert('Parolele noi nu coincid!');
    return;
  }
  loadingParola.value = true;
  try {
    await api.put('/api/user/parola', {
      parolaVeche: parolaVeche.value,
      parolaNoua: parolaNoua.value
    });
    alert('Parola a fost schimbată!');
    parolaVeche.value = '';
    parolaNoua.value = '';
    parolaNouaConfirm.value = '';
  } catch (err) {
    const e = err as { response?: { data?: string } };
    alert(e?.response?.data || 'Eroare la schimbarea parolei.');
  } finally {
    loadingParola.value = false;
  }
};

onMounted(() => {
  if (!authStore.isLoggedIn) {
    void router.push('/login');
    return;
  }
  void fetchUser();
  void fetchComenzi();
});
</script> 