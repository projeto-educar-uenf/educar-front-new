import { useState } from 'react'
import { DocumentCard } from './document-card'
import { Pagination } from './ui/pagination'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, Filter, X, Loader2 } from 'lucide-react'
import { useDocuments, useDocumentFilters } from '@/hooks/use-documents'

export function DocumentList() {
  const {
    searchQuery,
    setSearchQuery,
    updatePage,
    clearFilters,
    currentFilters
  } = useDocumentFilters()

  const [showFilters, setShowFilters] = useState(false)
  
  // Buscar documentos com os filtros atuais
  const { data, isLoading, error } = useDocuments(currentFilters)

  const handlePageChange = (newPage: number) => {
    updatePage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasActiveFilters = currentFilters.q || currentFilters.documentType || 
    currentFilters.researchArea || currentFilters.author

  if (error) {
    return (
      <div className="text-center py-12 bg-card border rounded-lg">
        <p className="text-destructive">Erro ao carregar documentos: {error.message}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Barra de busca e filtros */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {/* TODO: Migrar filtros avançados - remover disabled após implementação */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="px-3"
            disabled
            title="Filtros em processo de migração"
          >
            <Filter className="h-4 w-4" />
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="px-3"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* TODO: Migrar filtros avançados - implementar Select e Input funcionais */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card border rounded-lg opacity-50">
            <div className="text-center text-muted-foreground text-sm py-8 col-span-full">
              🚧 Filtros em processo de migração - funcionalidade será implementada em breve
            </div>
          </div>
        )}
      </div>

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
              <div key={index} className="h-80 bg-muted animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      ) : data && data.documents.length > 0 ? (
        <>
          {/* Informações dos resultados */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Mostrando {data.documents.length} de {data.pagination.total} documentos
              {currentFilters.page > 1 && ` (página ${currentFilters.page})`}
            </span>
            {hasActiveFilters && (
              <span className="font-medium">
                Filtros ativos
              </span>
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
            <h3 className="text-lg font-medium mb-2">Nenhum documento encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters 
                ? 'Tente ajustar os filtros ou termos de busca.'
                : 'Ainda não há documentos disponíveis.'
              }
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
