import {
  Document,
  DocumentsResponse,
  DocumentFilters,
  User,
  UsersResponse,
  AdminStats,
  UpdateUserRequest,
  UpdateDocumentRequest,
  CreateDocumentRequest,
  UploadResponse,
} from "./lib/types";

// Configuração da API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Função utilitária para fazer requisições HTTP
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Para cookies de autenticação
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Função para upload de arquivos
async function uploadFile(
  endpoint: string,
  formData: FormData,
  options: RequestInit = {}
): Promise<any> {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    ...options,
    // Não definir Content-Type para FormData - o browser faz isso automaticamente
    headers: {
      ...options.headers,
    },
    body: formData,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Upload failed for ${endpoint}:`, error);
    throw error;
  }
}

// ========================
// DOCUMENT API FUNCTIONS
// ========================

export async function fetchDocuments(filters: Partial<DocumentFilters> = {}): Promise<DocumentsResponse> {
  const params = new URLSearchParams();
  
  // Converter filtros para parâmetros de query
  if (filters.q) params.append('search', filters.q);
  if (filters.documentType) params.append('documentType', filters.documentType);
  if (filters.researchArea) params.append('researchArea', filters.researchArea);
  if (filters.author) params.append('author', filters.author);
  if (filters.limit) params.append('limit', filters.limit.toString());
  
  // Converter page para offset (backend usa offset, frontend usa page)
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const offset = (page - 1) * limit;
  params.append('offset', offset.toString());
  
  const query = params.toString();
  const endpoint = `/api/documents${query ? '?' + query : ''}`;
  
  const response = await apiRequest<{
    success: boolean;
    data: Document[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }>(endpoint);
  
  // Converter formato do backend para formato esperado pelo frontend
  return {
    documents: response.data,
    pagination: {
      page: Math.floor(response.pagination.offset / response.pagination.limit) + 1,
      pages: response.pagination.pages,
      total: response.pagination.total,
      limit: response.pagination.limit,
    },
  };
}

export async function fetchDocumentById(id: string): Promise<Document | null> {
  try {
    const response = await apiRequest<{
      success: boolean;
      data: Document;
    }>(`/api/documents/${id}`);
    
    return response.data;
  } catch (error) {
    // Se o documento não for encontrado, retornar null
    return null;
  }
}

export async function uploadDocument(
  documentData: CreateDocumentRequest,
): Promise<UploadResponse> {
  if (!documentData.file) {
    return {
      success: false,
      message: "Arquivo é obrigatório",
    };
  }

  // Criar FormData para upload
  const formData = new FormData();
  formData.append('file', documentData.file);
  formData.append('title', documentData.title);
  formData.append('description', documentData.description);
  formData.append('documentType', documentData.documentType);
  formData.append('researchArea', documentData.researchArea);
  
  // Adicionar autores como JSON array
  formData.append('authors', JSON.stringify(documentData.authors));
  
  // Adicionar keywords como JSON array
  formData.append('keywords', JSON.stringify(documentData.keywords));

  try {
    const response = await uploadFile('/api/documents', formData);
    
    if (response.success) {
      return {
        success: true,
        document: response.data,
        message: response.message || "Documento enviado com sucesso!",
      };
    } else {
      return {
        success: false,
        message: response.error || "Erro ao enviar documento",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro ao enviar documento",
    };
  }
}

export async function updateDocument(
  documentId: string,
  updates: UpdateDocumentRequest,
): Promise<Document> {
  const response = await apiRequest<{
    success: boolean;
    data: Document;
  }>(`/api/documents/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  
  return response.data;
}

export async function deleteDocument(documentId: string): Promise<void> {
  await apiRequest(`/api/documents/${documentId}`, {
    method: 'DELETE',
  });
}

// Função para download de documento
export async function downloadDocument(documentId: string): Promise<void> {
  const url = `${API_URL}/api/documents/${documentId}/download`;
  
  try {
    const response = await fetch(url, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Erro ao baixar documento');
    }
    
    // Extrair nome do arquivo dos headers
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = `document-${documentId}`;
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    
    // Criar blob e link para download
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
}

// ========================
// USER API FUNCTIONS
// ========================

export async function fetchUsers(searchQuery = ""): Promise<UsersResponse> {
  const params = new URLSearchParams();
  if (searchQuery) params.append('search', searchQuery);
  
  const query = params.toString();
  const endpoint = `/api/users${query ? '?' + query : ''}`;
  
  const response = await apiRequest<{
    success: boolean;
    data: {
      users: User[];
      pagination: any;
    };
  }>(endpoint);
  
  // Converter formato do backend para frontend
  return {
    users: response.data.users,
    pagination: response.data.pagination,
  };
}

export async function updateUser(
  userId: string,
  updates: UpdateUserRequest,
): Promise<User> {
  const response = await apiRequest<{
    success: boolean;
    data: User;
  }>(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  
  return response.data;
}

// ========================
// ADMIN API FUNCTIONS
// ========================

export async function getAdminStats(): Promise<AdminStats> {
  const response = await apiRequest<{
    success: boolean;
    data: AdminStats;
  }>('/api/admin/stats');
  
  return response.data;
}

// ========================
// HELPER FUNCTIONS
// ========================

export async function getFilterStats() {
  const response = await apiRequest<{
    success: boolean;
    data: any;
  }>('/api/documents/filters');
  
  return response.data;
}

// Funções para preview de documentos
export function canPreviewDocument(document: Document): boolean {
  const previewableTypes = [
    "application/pdf",
    "text/plain",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  return previewableTypes.includes(document.fileMimeType);
}

export function openDocumentPreview(document: Document): void {
  if (canPreviewDocument(document)) {
    // Para preview, vamos abrir o link de download em uma nova aba
    const previewUrl = `${API_URL}/api/documents/${document.id}/download`;
    window.open(previewUrl, "_blank");
  } else {
    // Force download para tipos não visualizáveis
    downloadDocument(document.id).catch(console.error);
  }
}

// ========================
// AUTHENTICATION FUNCTIONS
// ========================

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await apiRequest<{
      success: boolean;
      data: { user: User };
    }>('/auth/me');
    
    return response.data.user;
  } catch (error) {
    // Se não autenticado, retornar null
    return null;
  }
}

export function loginWithGoogle(): void {
  window.location.href = `${API_URL}/auth/google`;
}

export async function logout(): Promise<void> {
  await apiRequest('/auth/logout', {
    method: 'POST',
  });
}
