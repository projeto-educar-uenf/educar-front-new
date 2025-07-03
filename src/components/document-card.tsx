import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, Calendar, User } from "lucide-react"
import { Document } from "@/lib/types"

interface DocumentCardProps {
  document: Document
}

export function DocumentCard({ document }: DocumentCardProps) {
  const formattedDate = new Date(document.createdAt).toLocaleDateString("pt-BR")
  
  const handleDownload = () => {
    // Em um app real, isso faria o download via API
    // Por agora, simula o download
    const link = window.document.createElement('a')
    link.href = document.fileUrl
    link.download = `${document.title}.pdf`
    window.document.body.appendChild(link)
    link.click()
    window.document.body.removeChild(link)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            {document.documentType}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatFileSize(document.fileSize)}
          </span>
        </div>
        {/* TODO: Migrar página individual de documento - remover cursor-not-allowed e adicionar Link após implementação */}
        <div 
          className="font-semibold text-sm leading-tight line-clamp-2 cursor-not-allowed opacity-75"
          title="Página do documento em processo de migração"
        >
          {document.title}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <User className="h-3 w-3" />
            <span className="font-medium">Autores:</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {document.authors.join(", ")}
          </p>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{document.viewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span>{document.downloadCount}</span>
            </div>
          </div>
        </div>
        
        {document.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {document.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          size="sm"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
