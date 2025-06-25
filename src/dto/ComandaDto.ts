export interface DetaliuComandaDto {
  produsId: number;
  cantitate: number;
  pretUnitar: number;
  denumireProdus?: string;
}

export interface ComandaDto {
  id: number;
  userEmail?: string;
  userName: string;
  dataComanda: string;
  status: string;
  total: number;
  adresaLivrare: string;
  detaliiComanda: DetaliuComandaDto[];
} 