import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Search } from 'lucide-react'
import { getFilterStats } from '@/lib/api'
import useFilters, { RESET_FILTERS } from '@/hooks/useFilters'

interface DocumentFiltersProps {
  className?: string
}

export function DocumentFilters({ className }: DocumentFiltersProps) {
  const [filters, setFilters] = useFilters();
  
  // Buscar estatísticas de filtros com contadores
  const { data: filterStats } = useQuery({
    queryKey: ['filterStats'],
    queryFn: getFilterStats,
    staleTime: Infinity, // Dados estáticos, não precisam revalidar
  })

  const hasActiveFilters = filters.documentType || 
    filters.researchArea || filters.author

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Bloco superior: Controles de filtro */}
      <div className="flex-1 space-y-4">
        {/* Tipo de Documento */}
        <div className="space-y-2">
          <Label htmlFor="documentType">Tipo de Documento</Label>
          <Select 
            value={filters.documentType || 'all'} 
            onValueChange={(value) => setFilters(p => ({ ...p, documentType: value === 'all' ? null : value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {filterStats?.documentTypes.map((type) => (
                <SelectItem key={type.name} value={type.name}>
                  {type.name} ({type.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Área de Pesquisa */}
        <div className="space-y-2">
          <Label htmlFor="researchArea">Área de Pesquisa</Label>
          <Select 
            value={filters.researchArea || 'all'} 
            onValueChange={(value) => setFilters(p => ({ ...p, researchArea: value === 'all' ? null : value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas as áreas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as áreas</SelectItem>
              {filterStats?.researchAreas.map((area) => (
                <SelectItem key={area.name} value={area.name}>
                  {area.name} ({area.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Autor */}
        <div className="space-y-2">
          <Label htmlFor="author">Autor</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="author"
              placeholder="Nome do autor..."
              value={filters.author || ''}
              onChange={(e) => setFilters(p => ({ ...p, author: e.target.value }))}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filtros ativos - movidos para baixo dos campos */}
        {hasActiveFilters && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Filtros Ativos</h3>
            <div className="flex flex-wrap gap-2">
              {filters.documentType && (
                <Badge variant="outline" className="gap-1">
                  Tipo: {filters.documentType}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:bg-muted rounded" 
                    onClick={() => setFilters(p => ({ ...p, documentType: null }))}
                  />
                </Badge>
              )}
              {filters.researchArea && (
                <Badge variant="outline" className="gap-1">
                  Área: {filters.researchArea}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:bg-muted rounded" 
                    onClick={() => setFilters(p => ({ ...p, researchArea: null }))}
                  />
                </Badge>
              )}
              {filters.author && (
                <Badge variant="outline" className="gap-1">
                  Autor: {filters.author}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:bg-muted rounded" 
                    onClick={() => setFilters(p => ({ ...p, author: null }))}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer do drawer: divider + ações + informações */}
      <div className="space-y-4 pt-4 border-t">
        {/* Ações */}
        <div className="flex flex-col gap-2">
          <Button 
            variant="outline" 
            onClick={() => setFilters(RESET_FILTERS)}
            disabled={!hasActiveFilters}
            className="w-full"
          >
            Limpar Filtros
          </Button>
        </div>

        {/* Informações de ajuda e estatísticas */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            Use os filtros acima para refinar sua busca. Os filtros são aplicados automaticamente e persistem na URL.
          </p>
          {filterStats && (
            <p>
              Total: {filterStats.totalDocuments} documentos, {filterStats.documentTypes.length} tipos, {filterStats.researchAreas.length} áreas de pesquisa.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
