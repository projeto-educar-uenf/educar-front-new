import { useQuery } from "@tanstack/react-query";
import { fetchDocuments, fetchDocumentById, getAdminStats, getFilterStats } from "../api";
import { DocumentsResponse, Document, AdminStats } from "../lib/types";
import useFilters from "../hooks/useFilters";
import useDebounce from "../hooks/useDebounce";

// Hook para buscar documentos com filtros e paginação
export function useDocuments() {
  const [filters] = useFilters();
  const debouncedFilters = useDebounce(filters, 250);

  return useQuery<DocumentsResponse, Error>({
    queryKey: ["documents", debouncedFilters],
    queryFn: () => fetchDocuments({ ...debouncedFilters, limit: 9 }),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
}

// Hook para buscar um documento específico
export function useDocument(id: string) {
  return useQuery<Document | null, Error>({
    queryKey: ["document", id],
    queryFn: () => fetchDocumentById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

// Hook para buscar documentos para administração
export function useAdminDocuments(searchQuery = "") {
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  return useQuery<DocumentsResponse, Error>({
    queryKey: ["admin-documents", debouncedSearchQuery],
    queryFn: () =>
      fetchDocuments({
        q: debouncedSearchQuery,
        page: 1,
        documentType: undefined,
        researchArea: undefined,
        author: undefined,
        limit: 20,
      }),
    staleTime: 30000,
  });
}

// Hook para buscar estatísticas de administração
export function useAdminStats() {
  return useQuery<AdminStats, Error>({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    staleTime: 60000,
  });
}

// Hook para buscar estatísticas de filtros
export function useFilterStats() {
  return useQuery({
    queryKey: ["filterStats"],
    queryFn: getFilterStats,
    staleTime: Infinity, // Dados estáticos, não precisam revalidar
  });
}
