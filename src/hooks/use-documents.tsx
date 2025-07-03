import { useQuery } from "@tanstack/react-query";
import { fetchDocuments, fetchDocumentById } from "@/lib/api";
import { DocumentsResponse, Document } from "@/lib/types";
import useFilters from "./useFilters";
import useDebounce from "./useDebounce";

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
