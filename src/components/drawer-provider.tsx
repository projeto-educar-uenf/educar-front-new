import { createContext, useContext, useState, ReactNode } from "react";

interface DrawerContextType {
  isFilterDrawerOpen: boolean;
  openFilterDrawer: () => void;
  closeFilterDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
}

interface DrawerProviderProps {
  children: ReactNode;
}

export function DrawerProvider({ children }: DrawerProviderProps) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const openFilterDrawer = () => setIsFilterDrawerOpen(true);
  const closeFilterDrawer = () => setIsFilterDrawerOpen(false);

  return (
    <DrawerContext.Provider
      value={{
        isFilterDrawerOpen,
        openFilterDrawer,
        closeFilterDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
