// src/types/index.ts

export enum Role {
  MANAGER = "MANAGER",
  TECHNICIAN = "TECHNICIAN",
}

export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum AttachementType {
  PHOTO = "PHOTO",
  FACTURE = "FACTURE",
  RECU = "RECU",
  DEVIS = "DEVIS",
  AUTRE = "AUTRE",
}


export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}


export interface Attachement {
  id: number;
  fileName: string;
  originalFileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  attachmentType: AttachementType;
  uploadedAt: string;
  interventionId: number;
}


export interface Intervention {
  id: number;

  title: string;
  description?: string;

  clientName: string;
  clientPhone?: string;
  clientAddress?: string;

  latitude?: number;
  longitude?: number;

  status: Status;

  report?: string;
  interventionCompleted: boolean;

  startDate?: string;
  endDate?: string;

  createdAt: string;
  updatedAt: string;

  technician?: User;

  attachments?: Attachement[];
}


export interface LoginCredentials {
  email: string;
  password: string;
}


export interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}


export interface CreateTechnicianRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}


export interface CreateInterventionRequest {
  title: string;
  description?: string;

  clientName: string;
  clientPhone?: string;
  clientAddress?: string;

  latitude?: number;
  longitude?: number;

  technicianId: number;
}