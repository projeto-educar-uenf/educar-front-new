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

// Importar dados mockados dos arquivos JSON
import documentsData from "./data/documentsMock.json";
import usersData from "./data/usersMock.json";

// Função utilitária para simular delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Dados mockados importados dos arquivos JSON
const mockDocuments: Document[] = [...documentsData] as Document[];
const mockUsers: User[] = [...usersData] as User[];

// ========================
// DOCUMENT API FUNCTIONS
// ========================

export async function fetchDocuments(filters: Partial<DocumentFilters> = {}): Promise<DocumentsResponse> {
  await delay(300); // Simular latência de rede

  let filteredDocuments = [...mockDocuments];

  // Aplicar filtros
  if (filters.q) {
    const searchTerm = filters.q.toLowerCase();
    filteredDocuments = filteredDocuments.filter(
      doc =>
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.description.toLowerCase().includes(searchTerm) ||
        doc.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
        doc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  }

  if (filters.documentType) {
    filteredDocuments = filteredDocuments.filter(
      doc => doc.documentType === filters.documentType
    );
  }

  if (filters.researchArea) {
    filteredDocuments = filteredDocuments.filter(
      doc => doc.researchArea === filters.researchArea
    );
  }

  if (filters.author) {
    filteredDocuments = filteredDocuments.filter(
      doc => doc.authors.some(author => 
        author.toLowerCase().includes(filters.author!.toLowerCase())
      )
    );
  }

  // Paginação
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  return {
    documents: paginatedDocuments,
    pagination: {
      page,
      pages: Math.ceil(filteredDocuments.length / limit),
      total: filteredDocuments.length,
      limit,
    },
  };
}

export async function fetchDocumentById(id: string): Promise<Document | null> {
  await delay(200);

  const document = mockDocuments.find(doc => doc.id === id);
  if (!document) {
    return null;
  }

  // Incrementar view count
  document.viewCount += 1;

  return document;
}

export async function uploadDocument(
  documentData: CreateDocumentRequest,
): Promise<UploadResponse> {
  await delay(500); // Simular upload

  // Validações básicas
  if (!documentData.file) {
    return {
      success: false,
      message: "Arquivo é obrigatório",
    };
  }

  // Validar tipo de arquivo
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  if (!allowedTypes.includes(documentData.file.type)) {
    return {
      success: false,
      message: "Tipo de arquivo não suportado. Use PDF, DOC, DOCX ou TXT.",
    };
  }

  // Validar tamanho (10MB max)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (documentData.file.size > maxSize) {
    return {
      success: false,
      message: "Arquivo muito grande. Tamanho máximo: 10MB.",
    };
  }

  // Criar blob URL para o arquivo (simular upload)
  const blobUrl = URL.createObjectURL(documentData.file);

  const newDocument: Document = {
    id: `doc-${Date.now()}`,
    title: documentData.title,
    description: documentData.description,
    authors: documentData.authors,
    publicationDate: new Date().toISOString(),
    documentType: documentData.documentType,
    researchArea: documentData.researchArea,
    keywords: documentData.keywords,
    fileUrl: blobUrl, // Blob URL real para visualização/download
    fileSize: documentData.file.size,
    fileMimeType: documentData.file.type,
    viewCount: 0,
    downloadCount: 0,
    createdBy: {
      id: "current-user",
      name: "Admin Usuário",
      email: "admin@uenf.br",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Adicionar à lista mock (simular persistência)
  mockDocuments.unshift(newDocument);

  return {
    success: true,
    document: newDocument,
    message: "Documento enviado com sucesso!",
  };
}

export async function updateDocument(
  documentId: string,
  updates: UpdateDocumentRequest,
): Promise<Document> {
  await delay(200);

  const docIndex = mockDocuments.findIndex(doc => doc.id === documentId);
  if (docIndex === -1) {
    throw new Error("Documento não encontrado");
  }

  // Atualizar o documento
  mockDocuments[docIndex] = {
    ...mockDocuments[docIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  return mockDocuments[docIndex];
}

export async function deleteDocument(documentId: string): Promise<void> {
  await delay(200);

  const docIndex = mockDocuments.findIndex(doc => doc.id === documentId);
  if (docIndex === -1) {
    throw new Error("Documento não encontrado");
  }

  // Remover o documento
  mockDocuments.splice(docIndex, 1);

  // Atualizar contagem de documentos dos usuários
  mockUsers.forEach(user => {
    if (user.id === mockDocuments[docIndex]?.createdBy.id) {
      user.documentCount = Math.max(0, user.documentCount - 1);
    }
  });
}

// ========================
// USER API FUNCTIONS
// ========================

export async function fetchUsers(searchQuery = ""): Promise<UsersResponse> {
  await delay(300);

  let filteredUsers = [...mockUsers];

  if (searchQuery) {
    const searchTerm = searchQuery.toLowerCase();
    filteredUsers = filteredUsers.filter(
      user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }

  return {
    users: filteredUsers,
    pagination: {
      page: 1,
      pages: 1,
      total: filteredUsers.length,
      limit: filteredUsers.length,
    },
  };
}

export async function updateUser(
  userId: string,
  updates: UpdateUserRequest,
): Promise<User> {
  await delay(200);

  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new Error("Usuário não encontrado");
  }

  // Atualizar o usuário
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
  };

  return mockUsers[userIndex];
}

// ========================
// ADMIN API FUNCTIONS
// ========================

export async function getAdminStats(): Promise<AdminStats> {
  await delay(200);

  const totalUsers = mockUsers.length;
  const totalAdmins = mockUsers.filter(user => user.role === "ADMIN").length;
  const activeUsers = mockUsers.length; // Simular todos como ativos
  const totalDocuments = mockDocuments.length;
  
  // Simular documentos do mês atual
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const documentsThisMonth = mockDocuments.filter(doc => {
    const docDate = new Date(doc.createdAt);
    return docDate.getMonth() === thisMonth && docDate.getFullYear() === thisYear;
  }).length;

  const totalDownloads = mockDocuments.reduce(
    (total, doc) => total + doc.downloadCount,
    0
  );

  return {
    totalUsers,
    totalAdmins,
    activeUsers,
    totalDocuments,
    documentsThisMonth,
    totalDownloads,
  };
}

// ========================
// HELPER FUNCTIONS
// ========================

export function getFilterStats() {
  // Retornar estatísticas para filtros
  const documentTypes = [...new Set(mockDocuments.map(doc => doc.documentType))];
  const researchAreas = [...new Set(mockDocuments.map(doc => doc.researchArea))];
  const authors = [...new Set(mockDocuments.flatMap(doc => doc.authors))];

  return {
    documentTypes,
    researchAreas,
    authors,
  };
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
    window.open(document.fileUrl, "_blank");
  } else {
    // Force download para tipos não visualizáveis
    const link = window.document.createElement("a");
    link.href = document.fileUrl;
    link.download = `${document.title}.${document.fileMimeType.split("/")[1] || "file"}`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }
  
  // Incrementar download count
  document.downloadCount += 1;
}
