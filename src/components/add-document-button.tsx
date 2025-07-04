import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAddDocument } from "@/components/add-document-provider";

export function AddDocumentButton() {
  const { openModal } = useAddDocument();

  return (
    <Button 
      onClick={openModal} 
      size="icon"
      variant="outline"
      title="Adicionar Documento"
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
}
