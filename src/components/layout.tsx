import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"
import { DrawerProvider, useDrawer } from "./drawer-provider"
import { DocumentFilters } from "./document-filters"
import { Drawer } from "./ui/drawer"

function LayoutContent() {
  const { isFilterDrawerOpen, closeFilterDrawer } = useDrawer()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Drawer renderizado no nível do Layout */}
      <Drawer 
        open={isFilterDrawerOpen} 
        onClose={closeFilterDrawer} 
        side="right"
      >
        <DocumentFilters />
      </Drawer>
    </div>
  )
}

export function Layout() {
  return (
    <DrawerProvider>
      <LayoutContent />
    </DrawerProvider>
  )
}
