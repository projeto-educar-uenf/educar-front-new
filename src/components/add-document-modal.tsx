import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { X, Upload, Loader2 } from "lucide-react";
import { uploadDocument } from "@/lib/api";
import { CreateDocumentRequest } from "@/lib/types";

interface AddDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DOCUMENT_TYPES = [
  "Artigo Científico",
  "Tese",
  "Dissertação",
  "Trabalho de Conclusão",
  "Relatório Técnico",
  "Manual",
  "Livro",
  "Capítulo de Livro",
];

const RESEARCH_AREAS = [
  "Ciência da Computação",
  "Engenharia",
  "Matemática",
  "Física",
  "Química",
  "Biologia",
  "Medicina Veterinária",
  "Produção Animal",
  "Agronomia",
  "Ciências Sociais",
];

export function AddDocumentModal({ open, onOpenChange }: AddDocumentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authors: [] as string[],
    documentType: "",
    researchArea: "",
    keywords: [] as string[],
  });
  const [file, setFile] = useState<File | null>(null);
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Sucesso!",
          description: response.message,
        });
        onOpenChange(false);
        resetForm();
        // Invalidar queries para atualizar a lista
        queryClient.invalidateQueries({ queryKey: ["admin-documents"] });
        queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
        queryClient.invalidateQueries({ queryKey: ["documents"] }); // Lista principal de documentos
      } else {
        toast({
          title: "Erro no upload",
          description: response.message,
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao enviar documento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      authors: [],
      documentType: "",
      researchArea: "",
      keywords: [],
    });
    setFile(null);
    setCurrentAuthor("");
    setCurrentKeyword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Arquivo obrigatório",
        description: "Por favor, selecione um arquivo para upload.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title || !formData.description || formData.authors.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha título, descrição e adicione pelo menos um autor.",
        variant: "destructive",
      });
      return;
    }

    const uploadData: CreateDocumentRequest = {
      ...formData,
      file,
    };

    uploadMutation.mutate(uploadData);
  };

  const addAuthor = () => {
    if (currentAuthor.trim() && !formData.authors.includes(currentAuthor.trim())) {
      setFormData(prev => ({
        ...prev,
        authors: [...prev.authors, currentAuthor.trim()]
      }));
      setCurrentAuthor("");
    }
  };

  const removeAuthor = (author: string) => {
    setFormData(prev => ({
      ...prev,
      authors: prev.authors.filter(a => a !== author)
    }));
  };

  const addKeyword = () => {
    if (currentKeyword.trim() && !formData.keywords.includes(currentKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, currentKeyword.trim()]
      }));
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Adicionar Novo Documento
          </DialogTitle>
          <DialogDescription>
            Preencha as informações do documento e faça o upload do arquivo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload de Arquivo */}
          <div className="space-y-2">
            <Label>Arquivo *</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? "border-primary bg-primary/5" 
                  : file 
                    ? "border-green-500 bg-green-50" 
                    : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <Upload className="h-5 w-5" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Remover
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium">Arraste um arquivo aqui ou clique para selecionar</p>
                    <p className="text-sm text-muted-foreground">
                      PDF, DOC, DOCX ou TXT (máx. 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileInput}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Selecionar Arquivo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Digite o título do documento"
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o conteúdo do documento"
              rows={3}
              required
            />
          </div>

          {/* Tipo e Área */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Documento *</Label>
              <Select
                value={formData.documentType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, documentType: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Área de Pesquisa *</Label>
              <Select
                value={formData.researchArea}
                onValueChange={(value) => setFormData(prev => ({ ...prev, researchArea: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  {RESEARCH_AREAS.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Autores */}
          <div className="space-y-2">
            <Label>Autores *</Label>
            <div className="flex gap-2">
              <Input
                value={currentAuthor}
                onChange={(e) => setCurrentAuthor(e.target.value)}
                placeholder="Nome do autor"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAuthor())}
              />
              <Button type="button" variant="outline" onClick={addAuthor}>
                +
              </Button>
            </div>
            {formData.authors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.authors.map((author) => (
                  <Badge key={author} variant="secondary" className="flex items-center gap-1">
                    {author}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeAuthor(author)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Palavras-chave */}
          <div className="space-y-2">
            <Label>Palavras-chave</Label>
            <div className="flex gap-2">
              <Input
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                placeholder="Palavra-chave"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" variant="outline" onClick={addKeyword}>
                +
              </Button>
            </div>
            {formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.keywords.map((keyword) => (
                  <Badge key={keyword} variant="outline" className="flex items-center gap-1">
                    {keyword}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={uploadMutation.isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={uploadMutation.isPending}>
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar Documento
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
