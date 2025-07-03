import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import useFilters from "@/hooks/useFilters";

export function SearchInput() {
  const [{ q }, setSearchQuery] = useFilters();

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar documentos..."
        className="pl-8 w-full md:w-[300px] lg:w-[400px]"
        value={q ?? ""}
        onChange={(e) => setSearchQuery({ q: e.target.value })}
      />
    </div>
  );
}
