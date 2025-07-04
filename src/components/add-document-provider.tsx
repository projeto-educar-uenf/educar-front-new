import React, { createContext, useContext, useState } from "react";
import { AddDocumentModal } from "@/components/add-document-modal";

interface AddDocumentContextType {
  isOpen: boolean;
  openModal: () => void;
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

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AddDocumentContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <AddDocumentModal open={isOpen} onOpenChange={setIsOpen} />
    </AddDocumentContext.Provider>
  );
}
