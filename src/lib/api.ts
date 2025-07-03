import { Document, DocumentsResponse, DocumentFilters, User, UsersResponse, AdminStats, UpdateUserRequest, UpdateDocumentRequest } from './types';

// Dados mockados para simular uma base de documentos
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Análise de Qualidade da Água no Norte Fluminense',
    description: 'Estudo detalhado sobre a qualidade da água em municípios do norte do estado do Rio de Janeiro, com foco em indicadores de potabilidade e contaminação.',
    authors: ['Dr. João Silva', 'Dra. Maria Santos', 'Dr. Carlos Oliveira'],
    publicationDate: '2023-06-15',
    documentType: 'Artigo Científico',
    researchArea: 'Ciências Ambientais',
    keywords: ['água', 'qualidade', 'norte fluminense', 'contaminação', 'potabilidade'],
    fileUrl: '/uploads/analise-agua-nf.pdf',
    fileSize: 2458672,
    fileMimeType: 'application/pdf',
    viewCount: 234,
    downloadCount: 89,
    createdBy: {
      id: 'user1',
      name: 'Dr. João Silva',
      email: 'joao.silva@uenf.br',
      image: '/placeholder-user.jpg'
    },
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Desenvolvimento de Tecnologias Sustentáveis para Agricultura',
    description: 'Pesquisa sobre implementação de tecnologias sustentáveis na agricultura familiar da região norte fluminense.',
    authors: ['Dra. Ana Costa', 'Dr. Pedro Ferreira'],
    publicationDate: '2023-05-20',
    documentType: 'Dissertação',
    researchArea: 'Agricultura Sustentável',
    keywords: ['agricultura', 'sustentabilidade', 'tecnologia', 'agricultura familiar'],
    fileUrl: '/uploads/tech-sustentavel-agri.pdf',
    fileSize: 3890245,
    fileMimeType: 'application/pdf',
    viewCount: 156,
    downloadCount: 67,
    createdBy: {
      id: 'user2',
      name: 'Dra. Ana Costa',
      email: 'ana.costa@uenf.br',
      image: '/placeholder-user.jpg'
    },
    createdAt: '2023-05-20T14:15:00Z',
    updatedAt: '2023-05-20T14:15:00Z'
  },
  {
    id: '3',
    title: 'Estudo Geológico da Bacia de Campos',
    description: 'Análise geológica detalhada da formação e estrutura da Bacia de Campos, com implications para exploração de recursos naturais.',
    authors: ['Dr. Roberto Dias', 'Dra. Luciana Alves', 'Dr. Marcos Rocha'],
    publicationDate: '2023-04-10',
    documentType: 'Tese',
    researchArea: 'Geologia',
    keywords: ['geologia', 'bacia de campos', 'estrutura', 'recursos naturais'],
    fileUrl: '/uploads/estudo-geologico-bc.pdf',
    fileSize: 4567890,
    fileMimeType: 'application/pdf',
    viewCount: 198,
    downloadCount: 45,
    createdBy: {
      id: 'user3',
      name: 'Dr. Roberto Dias',
      email: 'roberto.dias@uenf.br'
    },
    createdAt: '2023-04-10T09:45:00Z',
    updatedAt: '2023-04-10T09:45:00Z'
  },
  {
    id: '4',
    title: 'Impacto das Mudanças Climáticas na Biodiversidade Local',
    description: 'Estudo sobre os efeitos das mudanças climáticas na fauna e flora da região norte fluminense.',
    authors: ['Dra. Cristina Lima', 'Dr. Fernando Souza'],
    publicationDate: '2023-03-25',
    documentType: 'Relatório de Pesquisa',
    researchArea: 'Biodiversidade',
    keywords: ['mudanças climáticas', 'biodiversidade', 'fauna', 'flora', 'norte fluminense'],
    fileUrl: '/uploads/mudancas-climaticas-bio.pdf',
    fileSize: 1876543,
    fileMimeType: 'application/pdf',
    viewCount: 289,
    downloadCount: 112,
    createdBy: {
      id: 'user4',
      name: 'Dra. Cristina Lima',
      email: 'cristina.lima@uenf.br'
    },
    createdAt: '2023-03-25T16:20:00Z',
    updatedAt: '2023-03-25T16:20:00Z'
  },
  {
    id: '5',
    title: 'Inovações em Engenharia de Petróleo e Gás',
    description: 'Pesquisa sobre novas tecnologias e metodologias para extração e processamento de petróleo e gás natural.',
    authors: ['Dr. Eduardo Santos', 'Dra. Patricia Mendes', 'Dr. Gabriel Torres'],
    publicationDate: '2023-02-14',
    documentType: 'Artigo Científico',
    researchArea: 'Engenharia de Petróleo',
    keywords: ['petróleo', 'gás natural', 'extração', 'processamento', 'inovação'],
    fileUrl: '/uploads/inovacoes-petroleo-gas.pdf',
    fileSize: 3234567,
    fileMimeType: 'application/pdf',
    viewCount: 167,
    downloadCount: 78,
    createdBy: {
      id: 'user5',
      name: 'Dr. Eduardo Santos',
      email: 'eduardo.santos@uenf.br'
    },
    createdAt: '2023-02-14T11:10:00Z',
    updatedAt: '2023-02-14T11:10:00Z'
  },
  {
    id: '6',
    title: 'Desenvolvimento de Materiais Avançados',
    description: 'Estudo sobre síntese e caracterização de novos materiais com propriedades específicas para aplicações industriais.',
    authors: ['Dr. André Silva', 'Dra. Fernanda Costa'],
    publicationDate: '2023-01-30',
    documentType: 'Dissertação',
    researchArea: 'Ciência dos Materiais',
    keywords: ['materiais avançados', 'síntese', 'caracterização', 'propriedades', 'aplicações industriais'],
    fileUrl: '/uploads/materiais-avancados.pdf',
    fileSize: 2987654,
    fileMimeType: 'application/pdf',
    viewCount: 145,
    downloadCount: 56,
    createdBy: {
      id: 'user6',
      name: 'Dr. André Silva',
      email: 'andre.silva@uenf.br'
    },
    createdAt: '2023-01-30T13:45:00Z',
    updatedAt: '2023-01-30T13:45:00Z'
  }
];

// Dados mockados de usuários
const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Dr. João Silva',
    email: 'joao.silva@uenf.br',
    role: 'ADMIN',
    documentCount: 12,
    createdAt: '2023-01-15T10:30:00Z',
    image: '/placeholder-user.jpg'
  },
  {
    id: 'user2',
    name: 'Dra. Ana Costa',
    email: 'ana.costa@uenf.br',
    role: 'USER',
    documentCount: 8,
    createdAt: '2023-02-20T14:15:00Z',
    image: '/placeholder-user.jpg'
  },
  {
    id: 'user3',
    name: 'Dr. Pedro Ferreira',
    email: 'pedro.ferreira@uenf.br',
    role: 'USER',
    documentCount: 5,
    createdAt: '2023-03-10T09:45:00Z',
    image: '/placeholder-user.jpg'
  },
  {
    id: 'user4',
    name: 'Dra. Maria Santos',
    email: 'maria.santos@uenf.br',
    role: 'USER',
    documentCount: 15,
    createdAt: '2023-01-25T16:20:00Z',
    image: '/placeholder-user.jpg'
  },
  {
    id: 'user5',
    name: 'Dr. Carlos Oliveira',
    email: 'carlos.oliveira@uenf.br',
    role: 'USER',
    documentCount: 7,
    createdAt: '2023-04-05T11:10:00Z',
    image: '/placeholder-user.jpg'
  }
];

// Simula um delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para buscar documentos com filtros e paginação
export async function fetchDocuments(filters: DocumentFilters): Promise<DocumentsResponse> {
  await delay(300); // Simula latência da rede

  const {
    q = '',
    documentType,
    researchArea,
    author,
    page = 1,
    limit = 6
  } = filters;

  let filteredDocuments = [...mockDocuments];

  // Filtro por texto de busca (título, descrição, autores, palavras-chave)
  if (q) {
    const searchTerm = q.toLowerCase();
    filteredDocuments = filteredDocuments.filter(doc =>
      doc.title.toLowerCase().includes(searchTerm) ||
      doc.description.toLowerCase().includes(searchTerm) ||
      doc.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
      doc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  }

  // Filtro por tipo de documento
  if (documentType) {
    filteredDocuments = filteredDocuments.filter(doc =>
      doc.documentType === documentType
    );
  }

  // Filtro por área de pesquisa
  if (researchArea) {
    filteredDocuments = filteredDocuments.filter(doc =>
      doc.researchArea === researchArea
    );
  }

  // Filtro por autor
  if (author) {
    filteredDocuments = filteredDocuments.filter(doc =>
      doc.authors.some(a => a.toLowerCase().includes(author.toLowerCase()))
    );
  }

  // Ordenar por data de criação (mais recente primeiro)
  filteredDocuments.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Implementar paginação
  const total = filteredDocuments.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

  return {
    documents: paginatedDocuments,
    pagination: {
      page,
      pages: totalPages,
      total,
      limit
    }
  };
}

// Função para buscar um documento específico por ID
export async function fetchDocumentById(id: string): Promise<Document | null> {
  await delay(200);
  
  const document = mockDocuments.find(doc => doc.id === id);
  return document || null;
}

// Função para obter tipos de documento únicos (para filtros)
export function getDocumentTypes(): string[] {
  return [...new Set(mockDocuments.map(doc => doc.documentType))];
}

// Função para obter áreas de pesquisa únicas (para filtros)
export function getResearchAreas(): string[] {
  return [...new Set(mockDocuments.map(doc => doc.researchArea))];
}

// Função para simular download de documento
export async function downloadDocument(id: string): Promise<string> {
  await delay(100);
  
  const document = mockDocuments.find(doc => doc.id === id);
  if (!document) {
    throw new Error('Documento não encontrado');
  }

  // Em uma aplicação real, isso retornaria a URL real ou faria download
  return document.fileUrl;
}

// Função para obter estatísticas de filtros com contadores
export function getFilterStats() {
  const documentTypeCounts: Record<string, number> = {}
  const researchAreaCounts: Record<string, number> = {}
  
  mockDocuments.forEach(doc => {
    documentTypeCounts[doc.documentType] = (documentTypeCounts[doc.documentType] || 0) + 1
    researchAreaCounts[doc.researchArea] = (researchAreaCounts[doc.researchArea] || 0) + 1
  })

  return {
    documentTypes: Object.entries(documentTypeCounts).map(([name, count]) => ({ name, count })),
    researchAreas: Object.entries(researchAreaCounts).map(([name, count]) => ({ name, count })),
    totalDocuments: mockDocuments.length
  }
}

// ADMIN APIs - Gestão de usuários

// Função para buscar usuários (admin)
export async function fetchUsers(searchQuery = '', page = 1, limit = 10): Promise<UsersResponse> {
  await delay(300);
  
  let filteredUsers = mockUsers;
  
  // Filtrar por busca
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredUsers = filteredUsers.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }
  
  const total = filteredUsers.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    pagination: {
      page,
      pages: totalPages,
      total,
      limit
    }
  };
}

// Função para atualizar permissões de usuário
export async function updateUser(userId: string, updates: UpdateUserRequest): Promise<User> {
  await delay(200);
  
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    throw new Error('Usuário não encontrado');
  }
  
  // Atualizar o usuário
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates
  };
  
  return mockUsers[userIndex];
}

// ADMIN APIs - Gestão de documentos

// Função para atualizar documento (admin)
export async function updateDocument(documentId: string, updates: UpdateDocumentRequest): Promise<Document> {
  await delay(200);
  
  const docIndex = mockDocuments.findIndex(doc => doc.id === documentId);
  if (docIndex === -1) {
    throw new Error('Documento não encontrado');
  }
  
  // Atualizar o documento
  mockDocuments[docIndex] = {
    ...mockDocuments[docIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return mockDocuments[docIndex];
}

// Função para deletar documento (admin)
export async function deleteDocument(documentId: string): Promise<void> {
  await delay(200);
  
  const docIndex = mockDocuments.findIndex(doc => doc.id === documentId);
  if (docIndex === -1) {
    throw new Error('Documento não encontrado');
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

// Função para obter estatísticas administrativas
export async function getAdminStats(): Promise<AdminStats> {
  await delay(150);
  
  const totalUsers = mockUsers.length;
  const totalAdmins = mockUsers.filter(user => user.role === 'ADMIN').length;
  const activeUsers = mockUsers.length; // Todos são considerados ativos no mock
  const totalDocuments = mockDocuments.length;
  
  // Documentos do último mês (simulado)
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const documentsThisMonth = mockDocuments.filter(doc => 
    new Date(doc.createdAt) > lastMonth
  ).length;
  
  // Total de downloads (somando todos os documentos)
  const totalDownloads = mockDocuments.reduce((sum, doc) => sum + doc.downloadCount, 0);
  
  return {
    totalUsers,
    totalAdmins,
    activeUsers,
    totalDocuments,
    documentsThisMonth,
    totalDownloads
  };
}
