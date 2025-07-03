import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export function DocumentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Documentos</h1>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-muted-foreground">
              Esta página será migrada do Next.js para incluir listagem de documentos, 
              upload de arquivos, e sistema de filtros usando TanStack Query.
            </p>
            <div className="mt-4 grid gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Documento de Exemplo</h3>
                <p className="text-sm text-muted-foreground">Arquivo de exemplo para demonstração</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold">Outro Documento</h3>
                <p className="text-sm text-muted-foreground">Mais um arquivo de exemplo</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
