import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useDrawer } from "./drawer-provider";

export function FilterButton() {
  const { openFilterDrawer } = useDrawer();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={openFilterDrawer}
      aria-label="Filtros"
    >
      <Filter className="h-4 w-4" />
    </Button>
  );
}
