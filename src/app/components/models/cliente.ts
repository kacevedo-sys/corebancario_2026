// src/app/core/models/cliente.model.ts

//Ejemplo
export interface Cliente {
  id: number;
  code?: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  identification?: string;
  email?: string;
  phone?: string;
  status?: string;
  companyId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientePage {
  content: Cliente[];
  totalSize: number;
  pageNumber: number;
  pageSize: number;
}