import { DocumentCard } from "./document-card";
import { Pagination } from "./ui/pagination";
import { Button } from "./ui/button";
import { Search, Loader2 } from "lucide-react";
import { useDocuments } from "@/queries";
import useFilters, { RESET_FILTERS } from "@/hooks/useFilters";

export function DocumentList() {
  const [filters, setFilters] = useFilters();
  const { data, isLoading, error } = useDocuments();

  const handlePageChange = (newPage: number) => {
    setFilters((f) => ({ ...f, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasActiveFilters =
    filters.q || filters.documentType || filters.researchArea || filters.author;

  if (error) {
    return (
      <div className="text-center py-12 bg-card border rounded-lg">
        <p className="text-destructive">
          Erro ao carregar documentos: {error.message}
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resultados */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Carregando documentos...</span>
          </div>
          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 bg-muted animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      ) : data && data.documents.length > 0 ? (
        <>
          {/* Informações dos resultados */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Mostrando {data.documents.length} de {data.pagination.total}{" "}
              documentos
              {filters.page > 1 && ` (página ${filters.page})`}
            </span>
            {hasActiveFilters && (
              <span className="font-medium">Filtros ativos</span>
            )}
          </div>

          {/* Grid de documentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.documents.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>

          {/* Paginação */}
          {data.pagination.pages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={data.pagination.page}
                totalPages={data.pagination.pages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-card border rounded-lg">
          <div className="max-w-md mx-auto">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Nenhum documento encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters
                ? "Tente ajustar os filtros ou termos de busca."
                : "Ainda não há documentos disponíveis."}
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => setFilters(RESET_FILTERS)}
              >
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
