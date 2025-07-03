
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Limitar o número de páginas exibidas
  let pagesToShow: (number | string)[] = pages
  if (totalPages > 5) {
    if (currentPage <= 3) {
      pagesToShow = [...pages.slice(0, 5), "...", totalPages]
    } else if (currentPage >= totalPages - 2) {
      pagesToShow = [1, "...", ...pages.slice(totalPages - 5)]
    } else {
      pagesToShow = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
    }
  }

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Página anterior</span>
      </Button>

      {pagesToShow.map((page, i) =>
        typeof page === "number" ? (
          <Button
            key={i}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={i} className="px-2">
            {page}
          </span>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Próxima página</span>
      </Button>
    </div>
  )
}
