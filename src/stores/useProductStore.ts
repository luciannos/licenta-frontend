import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export interface Produs {
  id: number;
  denumire: string;
  descriere: string;
  pret: number;
  categorie: string;
  imagine: string;
  stoc: number;
  cantitate?: number;
}

export const useProductStore = defineStore('product', {
  state: () => ({
    produse: [] as Produs[],
    filtru: '',
    sortare: 'asc',
    cos: [] as Produs[],
  }),

  getters: {
    produseFiltrate(state): Produs[] {
      const filtrate = state.produse.filter((p) =>
        p.denumire.toLowerCase().includes(state.filtru.toLowerCase()),
      );
      if (state.sortare === 'asc') {
        filtrate.sort((a, b) => a.pret - b.pret);
      } else {
        filtrate.sort((a, b) => b.pret - a.pret);
      }
      return filtrate;
    },
  },

  actions: {
    async incarcareProduse() {
      try {
        const response = await api.get<Produs[]>('/api/produse');
        this.produse = response.data;
      } catch (error) {
        console.error('Eroare la încărcarea produselor:', error);
        this.produse = [];
      }
    },

    async fetchProdus(id: number) {
      // Check if product is already in the list
      const existent = this.produse.find((p) => p.id === id);
      if (existent) {
        return existent;
      }
      // Otherwise, fetch from API
      try {
        const response = await api.get<Produs>(`/api/produse/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Eroare la încărcarea produsului ${id}:`, error);
        return null;
      }
    },

    adaugaInCos(produsNou: Produs) {
      const existent = this.cos.find((p) => p.id === produsNou.id);
      if (existent) {
        existent.cantitate = (existent.cantitate || 1) + 1;
      } else {
        this.cos.push({ ...produsNou, cantitate: 1 });
      }
      this.salveazaCos();
    },

    actualizeazaCantitate(id: number, cant: number) {
      const produs = this.cos.find((p) => p.id === id);
      if (produs) {
        produs.cantitate = cant;
        this.salveazaCos();
      }
    },

    stergeDinCos(index: number) {
      this.cos.splice(index, 1);
      this.salveazaCos();
    },

    golesteCos() {
      this.cos = [];
      this.salveazaCos();
    },

    salveazaCos() {
      localStorage.setItem('cos', JSON.stringify(this.cos));
    },
  },
});
