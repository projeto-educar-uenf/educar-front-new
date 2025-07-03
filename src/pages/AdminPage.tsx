import { Footer } from '@/components/footer'
import { AdminTabs } from '@/components/admin-tabs'

export function AdminPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Administração</h1>
              <p className="text-muted-foreground mt-2">
                Gerencie usuários, documentos e configurações do sistema
              </p>
            </div>
          </div>
          <AdminTabs />
        </div>
      </div>
      <Footer />
    </>
  )
}
