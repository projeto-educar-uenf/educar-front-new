import React, { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { fetchDocuments, fetchDocumentById } from '@/lib/api'
import { DocumentFilters, DocumentsResponse, Document } from '@/lib/types'

// Hook para buscar documentos com filtros e paginação
export function useDocuments(filters: DocumentFilters = {}) {
  const [searchParams] = useSearchParams()
  
  // Combinar filtros passados com parâmetros da URL
  const mergedFilters = useMemo(() => ({
    ...filters,
    q: searchParams.get('q') || filters.q,
    page: parseInt(searchParams.get('page') || '1') || filters.page || 1,
    documentType: searchParams.get('documentType') || filters.documentType,
    researchArea: searchParams.get('researchArea') || filters.researchArea,
    author: searchParams.get('author') || filters.author,
  }), [filters, searchParams])

  return useQuery<DocumentsResponse, Error>({
    queryKey: ['documents', mergedFilters],
    queryFn: () => fetchDocuments(mergedFilters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  })
}

// Hook para buscar um documento específico
export function useDocument(id: string) {
  return useQuery<Document | null, Error>({
    queryKey: ['document', id],
    queryFn: () => fetchDocumentById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

// Hook para gerenciar filtros e busca com debounce
export function useDocumentFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [localSearchQuery, setLocalSearchQuery] = useState(searchParams.get('q') || '')

  // Debounce para a busca
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(localSearchQuery)

  // Efeito para debounce da busca
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(localSearchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [localSearchQuery])

  // Atualizar URL quando filtros mudarem
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams)
    
    if (debouncedSearchQuery) {
      params.set('q', debouncedSearchQuery)
    } else {
      params.delete('q')
    }
    
    // Resetar página quando busca mudar
    if (params.get('q') !== searchParams.get('q')) {
      params.delete('page')
    }

    setSearchParams(params, { replace: true })
  }, [debouncedSearchQuery, searchParams, setSearchParams])

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams)
    
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    
    // Resetar página quando filtros mudarem
    params.delete('page')
    
    setSearchParams(params, { replace: true })
  }

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    
    setSearchParams(params, { replace: true })
  }

  const clearFilters = () => {
    setSearchParams({}, { replace: true })
    setLocalSearchQuery('')
  }

  return {
    searchQuery: localSearchQuery,
    setSearchQuery: setLocalSearchQuery,
    updateFilter,
    updatePage,
    clearFilters,
    currentFilters: {
      q: searchParams.get('q') || undefined,
      documentType: searchParams.get('documentType') || undefined,
      researchArea: searchParams.get('researchArea') || undefined,
      author: searchParams.get('author') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
    }
  }
}

