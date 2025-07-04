export const DEBOUNCE_DELAY = 250; // ms

// Query keys para React Query
export const QUERY_KEYS = {
  // Documents
  DOCUMENTS: 'documents',
  DOCUMENT: 'document',
  ADMIN_DOCUMENTS: 'admin-documents',
  
  // Users
  USERS: 'users',
  ADMIN_USERS: 'admin-users',
  
  // Stats
  ADMIN_STATS: 'admin-stats',
  
  // Filters
  FILTER_STATS: 'filter-stats',
} as const;

// Mutation keys para React Query
export const MUTATION_KEYS = {
  // Documents
  CREATE_DOCUMENT: 'create-document',
  UPDATE_DOCUMENT: 'update-document',
  DELETE_DOCUMENT: 'delete-document',
  
  // Users
  UPDATE_USER: 'update-user',
} as const;

// Stale times para React Query (em milliseconds)
export const STALE_TIMES = {
  SHORT: 30 * 1000,        // 30 segundos
  MEDIUM: 5 * 60 * 1000,   // 5 minutos
  LONG: 10 * 60 * 1000,    // 10 minutos
  VERY_LONG: 30 * 60 * 1000, // 30 minutos
} as const;

// Debounce delays
export const DEBOUNCE_DELAYS = {
  SHORT: 100,
  MEDIUM: 250,
  LONG: 300,
  SEARCH: 300,
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 9,
  ADMIN_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  PREVIEWABLE_TYPES: [
    'application/pdf',
    'text/plain',
    'text/html',
    'text/markdown',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ],
} as const;

// Toast messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    DOCUMENT_CREATED: 'Documento criado com sucesso!',
    DOCUMENT_UPDATED: 'Documento atualizado com sucesso!',
    DOCUMENT_DELETED: 'Documento excluído com sucesso!',
    USER_UPDATED: 'Usuário atualizado com sucesso!',
    PERMISSIONS_UPDATED: 'Permissões atualizadas com sucesso!',
  },
  ERROR: {
    DOCUMENT_CREATE_FAILED: 'Não foi possível criar o documento.',
    DOCUMENT_UPDATE_FAILED: 'Não foi possível atualizar o documento.',
    DOCUMENT_DELETE_FAILED: 'Não foi possível excluir o documento.',
    DOCUMENT_LOAD_FAILED: 'Não foi possível carregar os documentos.',
    USER_UPDATE_FAILED: 'Não foi possível atualizar o usuário.',
    PERMISSIONS_UPDATE_FAILED: 'Não foi possível atualizar as permissões.',
    GENERIC: 'Ocorreu um erro. Tente novamente.',
  },
} as const;

// Document types for filters
export const DOCUMENT_TYPES = [
  'Artigo Científico',
  'Dissertação',
  'Tese',
  'Relatório de Pesquisa',
  'Livro',
  'Capítulo de Livro',
  'Trabalho de Conclusão de Curso',
  'Monografia',
  'Projeto de Pesquisa',
  'Outros',
] as const;

// Research areas for filters
export const RESEARCH_AREAS = [
  'Ciências Ambientais',
  'Agricultura Sustentável',
  'Geologia',
  'Biodiversidade',
  'Engenharia de Petróleo',
  'Ciência dos Materiais',
  'Engenharia Civil',
  'Engenharia Elétrica',
  'Ciência da Computação',
  'Matemática',
  'Física',
  'Química',
  'Biologia',
  'Medicina',
  'Educação',
  'Outras',
] as const;
