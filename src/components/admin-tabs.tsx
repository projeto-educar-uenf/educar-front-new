import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "./user-management";
import { DocumentManagement } from "./document-management";

export function AdminTabs() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="users">Usuários</TabsTrigger>
        <TabsTrigger value="documents">Documentos</TabsTrigger>
      </TabsList>

      <TabsContent value="users">
        <UserManagement />
      </TabsContent>

      <TabsContent value="documents">
        <DocumentManagement />
      </TabsContent>
    </Tabs>
  );
}
