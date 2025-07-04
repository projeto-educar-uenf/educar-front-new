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
} from "../lib/types";

// Base URL para a API (pode ser configurada via environment)
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Utilitário para fazer requisições HTTP
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Document endpoints
  async getDocuments(filters: DocumentFilters): Promise<DocumentsResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    return this.request<DocumentsResponse>(`/api/documents?${params.toString()}`);
  }

  async getDocument(id: string): Promise<Document> {
    return this.request<Document>(`/api/documents/${id}`);
  }

  async createDocument(data: CreateDocumentRequest): Promise<UploadResponse> {
    // Para upload de arquivos, precisamos usar FormData
    const formData = new FormData();
    formData.append('file', data.file);
    
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'file') {
        if (Array.isArray(value)) {
          value.forEach(item => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return this.request<UploadResponse>('/api/documents', {
      method: 'POST',
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  }

  async updateDocument(id: string, data: UpdateDocumentRequest): Promise<Document> {
    return this.request<Document>(`/api/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDocument(id: string): Promise<void> {
    return this.request<void>(`/api/documents/${id}`, {
      method: 'DELETE',
    });
  }

  // User endpoints
  async getUsers(search: string = ''): Promise<UsersResponse> {
    const params = search ? `?q=${encodeURIComponent(search)}` : '';
    return this.request<UsersResponse>(`/api/users${params}`);
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    return this.request<User>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Admin endpoints
  async getAdminStats(): Promise<AdminStats> {
    return this.request<AdminStats>('/api/admin/stats');
  }
}

// Singleton instance
export const apiClient = new ApiClient();

// Export individual methods for easier migration
export const documentsApi = {
  getAll: (filters: DocumentFilters) => apiClient.getDocuments(filters),
  getById: (id: string) => apiClient.getDocument(id),
  create: (data: CreateDocumentRequest) => apiClient.createDocument(data),
  update: (id: string, data: UpdateDocumentRequest) => apiClient.updateDocument(id, data),
  delete: (id: string) => apiClient.deleteDocument(id),
};

export const usersApi = {
  getAll: (search?: string) => apiClient.getUsers(search),
  update: (id: string, data: UpdateUserRequest) => apiClient.updateUser(id, data),
};

export const adminApi = {
  getStats: () => apiClient.getAdminStats(),
};
