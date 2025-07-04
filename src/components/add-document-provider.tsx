import React, { createContext, useContext, useState } from "react";
import { AddDocumentModal } from "@/components/add-document-modal";
import { Document } from "@/lib/types";

interface AddDocumentContextType {
  isOpen: boolean;
  editingDocument: Document | null;
  openModal: () => void;
  openEditModal: (document: Document) => void;
  closeModal: () => void;
}

const AddDocumentContext = createContext<AddDocumentContextType | undefined>(
  undefined
);

export function useAddDocument() {
  const context = useContext(AddDocumentContext);
  if (context === undefined) {
    throw new Error("useAddDocument must be used within an AddDocumentProvider");
  }
  return context;
}

interface AddDocumentProviderProps {
  children: React.ReactNode;
}

export function AddDocumentProvider({ children }: AddDocumentProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);

  const openModal = () => {
    setEditingDocument(null);
    setIsOpen(true);
  };

  const openEditModal = (document: Document) => {
    setEditingDocument(document);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingDocument(null);
  };

  return (
    <AddDocumentContext.Provider 
      value={{ isOpen, editingDocument, openModal, openEditModal, closeModal }}
    >
      {children}
      <AddDocumentModal 
        open={isOpen} 
        onClose={closeModal}
        editingDocument={editingDocument}
      />
    </AddDocumentContext.Provider>
  );
}
