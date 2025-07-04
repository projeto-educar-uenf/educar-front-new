// Tipos para o sistema de documentos

export interface Document {
  id: string;
  title: string;
  description: string;
  authors: string[];
  publicationDate: string;
  documentType: string;
  researchArea: string;
  keywords: string[];
  fileUrl: string;
  fileSize: number;
  fileMimeType: string;
  viewCount: number;
  downloadCount: number;
  uploadedBy: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DocumentsResponse {
  documents: Document[];
  pagination: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

// Tipo baseado no retorno do useFilters hook
export type DocumentFilters = ReturnType<
  typeof import("../hooks/useFilters").default
>[0] & {
  limit?: number;
};

// Tipos para administração de usuários
export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  documentCount: number;
  createdAt: string;
  avatar?: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

// Tipos para estatísticas de administração
export interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  activeUsers: number;
  totalDocuments: number;
  documentsThisMonth: number;
  totalDownloads: number;
}

// Tipos para operações CRUD
export interface UpdateUserRequest {
  role?: "USER" | "ADMIN";
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  authors?: string[];
  documentType?: string;
  researchArea?: string;
  keywords?: string[];
}

// Tipos para upload de documentos
export interface CreateDocumentRequest {
  title: string;
  description: string;
  authors: string[];
  documentType: string;
  researchArea: string;
  keywords: string[];
  file: File;
}

export interface UploadResponse {
  success: boolean;
  document?: Document;
  message: string;
}
