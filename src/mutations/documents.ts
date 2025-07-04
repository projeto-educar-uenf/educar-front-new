import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDocument, updateDocument, uploadDocument } from "../api";
import { UpdateDocumentRequest, UploadResponse } from "../lib/types";
import { toast } from "../components/ui/use-toast";

// Mutation para deletar documento
export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      queryClient.invalidateQueries({ queryKey: ["documents"] }); // Invalidar lista geral também
      toast({
        title: "Documento excluído",
        description: "O documento foi excluído com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Erro:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o documento.",
        variant: "destructive",
      });
    },
  });
}

// Mutation para atualizar documento
export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: UpdateDocumentRequest }) =>
      updateDocument(id, updates),
    onSuccess: (updatedDocument) => {
      queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["document", updatedDocument.id] });
      toast({
        title: "Documento atualizado",
        description: "O documento foi atualizado com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Erro:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o documento.",
        variant: "destructive",
      });
    },
  });
}

// Mutation para atualizar documento com callbacks personalizados
export function useUpdateDocumentWithCallbacks({
  onSuccess,
  onError,
}: {
  onSuccess?: (updatedDocument: any) => void;
  onError?: (error: any) => void;
} = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ documentId, data }: { documentId: string; data: any }) =>
      updateDocument(documentId, data),
    onSuccess: (updatedDocument) => {
      queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["document", updatedDocument.id] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      
      if (onSuccess) {
        onSuccess(updatedDocument);
      } else {
        toast({
          title: "Documento atualizado",
          description: "O documento foi atualizado com sucesso.",
        });
      }
    },
    onError: (error) => {
      console.error("Erro:", error);
      
      if (onError) {
        onError(error);
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível atualizar o documento.",
          variant: "destructive",
        });
      }
    },
  });
}

// Mutation para criar/upload documento
export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: (response: UploadResponse) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
        queryClient.invalidateQueries({ queryKey: ["documents"] });
        queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
        toast({
          title: "Documento criado",
          description: response.message,
        });
      } else {
        toast({
          title: "Erro",
          description: response.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("Erro:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o documento.",
        variant: "destructive",
      });
    },
  });
}

// Mutation para criar/upload documento com callbacks personalizados
export function useCreateDocumentWithCallbacks({
  onSuccess,
  onError,
}: {
  onSuccess?: (response: UploadResponse) => void;
  onError?: (error: any) => void;
} = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDocument,
    onSuccess: (response: UploadResponse) => {
      // Invalidar queries sempre
      queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      
      if (onSuccess) {
        onSuccess(response);
      } else {
        if (response.success) {
          toast({
            title: "Documento criado",
            description: response.message,
          });
        } else {
          toast({
            title: "Erro",
            description: response.message,
            variant: "destructive",
          });
        }
      }
    },
    onError: (error) => {
      console.error("Erro:", error);
      
      if (onError) {
        onError(error);
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível criar o documento.",
          variant: "destructive",
        });
      }
    },
  });
}
