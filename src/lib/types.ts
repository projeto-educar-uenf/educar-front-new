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
  createdBy: {
    id: string;
    name: string;
    email: string;
    image?: string;
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

export interface DocumentFilters {
  q?: string;
  documentType?: string;
  researchArea?: string;
  author?: string;
  page?: number;
  limit?: number;
}
