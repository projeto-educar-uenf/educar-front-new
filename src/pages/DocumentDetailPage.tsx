import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchDocumentById } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  FileText, 
  Tag,
  Users,
  ExternalLink
} from 'lucide-react'

export function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: document, isLoading, error } = useQuery({
    queryKey: ['document', id],
    queryFn: () => fetchDocumentById(id!),
    enabled: !!id,
  })

  const handleDownload = () => {
    if (!document) return
    
    // Simula download do documento
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-muted-foreground mb-2">
              Documento não encontrado
            </h1>
            <p className="text-muted-foreground">
              O documento que você está procurando não existe ou foi removido.
            </p>
          </div>
          <Button onClick={() => navigate('/documentos')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Documentos
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb e botão voltar */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link to="/documentos" className="hover:text-foreground">
            Documentos
          </Link>
          <span>/</span>
          <span className="text-foreground">{document.title}</span>
        </div>

        <Button 
          onClick={() => navigate('/documentos')} 
          variant="ghost" 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Documentos
        </Button>

        {/* Cabeçalho do documento */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{document.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Publicado em {formatDate(document.publicationDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{document.viewCount} visualizações</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{document.downloadCount} downloads</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline">{document.documentType}</Badge>
            <Badge variant="secondary">{document.researchArea}</Badge>
          </div>

          <Button onClick={handleDownload} size="lg" className="mb-6">
            <Download className="mr-2 h-4 w-4" />
            Download ({formatFileSize(document.fileSize)})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="md:col-span-2 space-y-6">
            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resumo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {document.description}
                </p>
              </CardContent>
            </Card>

            {/* Autores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Autores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {document.authors.map((author, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{author}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Palavras-chave */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Palavras-chave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {document.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com informações */}
          <div className="space-y-6">
            {/* Informações do documento */}
            <Card>
              <CardHeader>
                <CardTitle>Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Tipo de Documento
                  </label>
                  <p className="font-medium">{document.documentType}</p>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Área de Pesquisa
                  </label>
                  <p className="font-medium">{document.researchArea}</p>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Tamanho do Arquivo
                  </label>
                  <p className="font-medium">{formatFileSize(document.fileSize)}</p>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Formato
                  </label>
                  <p className="font-medium">PDF</p>
                </div>
              </CardContent>
            </Card>

            {/* Criado por */}
            <Card>
              <CardHeader>
                <CardTitle>Criado por</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={document.createdBy.image} />
                    <AvatarFallback>
                      {document.createdBy.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{document.createdBy.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {document.createdBy.email}
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-sm text-muted-foreground">
                  <p>Criado em {formatDate(document.createdAt)}</p>
                  {document.updatedAt !== document.createdAt && (
                    <p>Atualizado em {formatDate(document.updatedAt)}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={handleDownload} 
                  className="w-full" 
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  disabled
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visualizar Online
                  {/* TODO: Implementar visualização online - remover disabled após implementação */}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
