export interface DetaliuComandaDto {
  produsId: number;
  cantitate: number;
  pretUnitar: number;
}

export interface ComandaDto {
  id: number;
  userEmail: string;
  dataComanda: string;
  status: string;
  total: number;
  detaliiComanda: DetaliuComandaDto[];
} 