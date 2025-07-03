import { Footer } from "@/components/footer";
import { DocumentList } from "@/components/document-list";

export function DocumentsPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Biblioteca</h1>
          </div>

          <DocumentList />
        </div>
      </div>
      <Footer />
    </>
  );
}
