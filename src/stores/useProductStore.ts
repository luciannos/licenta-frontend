// src/stores/useProductStore.ts
import { defineStore } from 'pinia';

export interface Produs {
  id: number;
  nume: string;
  descriere: string;
  pret: number;
  imagine: string;
}

export const useProductStore = defineStore('product', {
  state: () => ({
    produse: [] as Produs[],
    cos: [] as Produs[],
    filtru: '',
    sortare: 'asc' as 'asc' | 'desc',
  }),

  getters: {
    produseFiltrate(): Produs[] {
      const lista = this.produse.filter((p) =>
        p.nume.toLowerCase().includes(this.filtru.toLowerCase()),
      );
      return this.sortare === 'asc'
        ? lista.sort((a, b) => a.pret - b.pret)
        : lista.sort((a, b) => b.pret - a.pret);
    },
  },

  actions: {
    incarcareProduse() {
      this.produse = [
        {
          id: 1,
          nume: 'Căști wireless Bluetooth',
          descriere: 'Căști confortabile cu microfon și autonomie extinsă',
          pret: 199,
          imagine: 'https://via.placeholder.com/300x200.png?text=Produs+1',
        },
        {
          id: 2,
          nume: 'Laptop performant 15"',
          descriere: 'Procesor Intel i7, 16GB RAM, SSD 512GB',
          pret: 3499,
          imagine: 'https://via.placeholder.com/300x200.png?text=Produs+2',
        },
        {
          id: 3,
          nume: 'Ceas inteligent',
          descriere: 'Monitorizare puls, notificări și funcții sportive',
          pret: 499,
          imagine: 'https://via.placeholder.com/300x200.png?text=Produs+3',
        },
        {
          id: 4,
          nume: 'Aspirator robot',
          descriere: 'Curățare automată și programabilă a locuinței',
          pret: 899,
          imagine: 'https://via.placeholder.com/300x200.png?text=Produs+4',
        },
      ];
    },

    adaugaInCos(produs: Produs) {
      this.cos.push(produs);
    },
  },
});
