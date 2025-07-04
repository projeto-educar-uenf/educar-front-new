import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, Calendar, User, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Document } from "@/lib/types";

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const formattedDate = new Date(document.createdAt).toLocaleDateString(
    "pt-BR",
  );

  const handleDownload = () => {
    // Em um app real, isso faria o download via API
    // Por agora, simula o download
    const link = window.document.createElement("a");
    link.href = document.fileUrl;
    link.download = `${document.title}.pdf`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            {document.documentType}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatFileSize(document.fileSize)}
          </span>
        </div>
        <Link
          to={`/documentos/${document.id}`}
          className="font-semibold text-sm leading-tight line-clamp-2 hover:text-primary transition-colors"
        >
          {document.title}
        </Link>
      </CardHeader>

      <CardContent className="pb-3 flex-grow">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <User className="h-3 w-3" />
            <span className="font-medium">Autores:</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {document.authors.join(", ")}
          </p>

          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{document.viewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span>{document.downloadCount}</span>
            </div>
          </div>
        </div>

        {document.description && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {document.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Button className="flex-1" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/documentos/${document.id}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Detalhes
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
