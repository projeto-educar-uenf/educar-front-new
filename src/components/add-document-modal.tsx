import { useState, useEffect } from "react";
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
import { CreateDocumentRequest, Document } from "@/lib/types";
import { 
  useCreateDocumentWithCallbacks, 
  useUpdateDocumentWithCallbacks 
} from "@/mutations";

interface AddDocumentModalProps {
  open: boolean;
  onClose: () => void;
  editingDocument?: Document | null;
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

export function AddDocumentModal({
  open,
  onClose,
  editingDocument = null,
}: AddDocumentModalProps) {
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

  // Determinar se está em modo de edição
  const isEditing = editingDocument !== null;

  // Mutations organizadas com callbacks personalizados
  const uploadMutation = useCreateDocumentWithCallbacks({
    onSuccess: (response) => {
      if (response.success) {
        toast({
          title: "Sucesso!",
          description: response.message,
        });
        onClose();
        resetForm();
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

  const updateMutation = useUpdateDocumentWithCallbacks({
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Documento atualizado com sucesso!",
      });
      onClose();
      resetForm();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao atualizar documento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  // useEffect para preencher formulário quando estiver editando
  useEffect(() => {
    if (editingDocument) {
      setFormData({
        title: editingDocument.title,
        description: editingDocument.description,
        authors: editingDocument.authors,
        documentType: editingDocument.documentType,
        researchArea: editingDocument.researchArea,
        keywords: editingDocument.keywords,
      });
      // Não definir arquivo porque é apenas para edição de metadados
      setFile(null);
    } else {
      // Resetar form se não estiver editando
      resetForm();
    }
  }, [editingDocument]);

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

    // Validação completa dos campos obrigatórios
    const validationErrors: string[] = [];

    // Validar arquivo (apenas obrigatório para novo upload, não para edição)
    if (!isEditing && !file) {
      validationErrors.push("Arquivo é obrigatório");
    }

    // Validar título
    if (!formData.title.trim()) {
      validationErrors.push("Título é obrigatório");
    } else if (formData.title.trim().length < 5) {
      validationErrors.push("Título deve ter pelo menos 5 caracteres");
    }

    // Validar descrição
    if (!formData.description.trim()) {
      validationErrors.push("Descrição é obrigatória");
    } else if (formData.description.trim().length < 10) {
      validationErrors.push("Descrição deve ter pelo menos 10 caracteres");
    }

    // Validar tipo de documento
    if (!formData.documentType) {
      validationErrors.push("Tipo de documento é obrigatório");
    }

    // Validar área de pesquisa
    if (!formData.researchArea) {
      validationErrors.push("Área de pesquisa é obrigatória");
    }

    // Validar autores
    if (formData.authors.length === 0) {
      validationErrors.push("Pelo menos um autor é obrigatório");
    }

    // Validar palavras-chave
    if (formData.keywords.length === 0) {
      validationErrors.push("Pelo menos uma palavra-chave é obrigatória");
    }

    // Se há erros de validação, mostrar todos
    if (validationErrors.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: validationErrors.join(", "),
        variant: "destructive",
      });
      return;
    }

    // Verificar permissões para edição
    if (isEditing && editingDocument) {
      // Fazer update do documento
      const updateData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        authors: formData.authors,
        documentType: formData.documentType,
        researchArea: formData.researchArea,
        keywords: formData.keywords,
      };

      updateMutation.mutate({
        documentId: editingDocument.id,
        data: updateData,
      });
    } else {
      // Fazer upload de novo documento
      const uploadData: CreateDocumentRequest = {
        ...formData,
        file: file!, // Safe to use ! here because we validated file exists above
      };

      uploadMutation.mutate(uploadData);
    }
  };

  const addAuthor = () => {
    const trimmedAuthor = currentAuthor.trim();
    if (trimmedAuthor && !formData.authors.includes(trimmedAuthor)) {
      setFormData((prev) => ({
        ...prev,
        authors: [...prev.authors, trimmedAuthor],
      }));
      setCurrentAuthor("");
    } else if (!trimmedAuthor) {
      toast({
        title: "Nome inválido",
        description: "Digite um nome válido para o autor.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Autor duplicado",
        description: "Este autor já foi adicionado.",
        variant: "destructive",
      });
    }
  };

  const removeAuthor = (author: string) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((a) => a !== author),
    }));
  };

  const addKeyword = () => {
    const trimmedKeyword = currentKeyword.trim();
    if (trimmedKeyword && !formData.keywords.includes(trimmedKeyword)) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, trimmedKeyword],
      }));
      setCurrentKeyword("");
    } else if (!trimmedKeyword) {
      toast({
        title: "Palavra-chave inválida",
        description: "Digite uma palavra-chave válida.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Palavra-chave duplicada",
        description: "Esta palavra-chave já foi adicionada.",
        variant: "destructive",
      });
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            {isEditing ? "Editar Documento" : "Adicionar Novo Documento"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edite os metadados do documento. O arquivo não pode ser alterado."
              : "Preencha as informações do documento e faça o upload do arquivo."}
            <br />
            <span className="text-sm text-muted-foreground">
              * Campos obrigatórios: título, descrição, tipo, área, autores e
              palavras-chave
              {!isEditing && ", arquivo"}
            </span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload de Arquivo ou Informações do Documento */}
          <div className="space-y-2">
            <Label>{isEditing ? "Documento Atual" : "Arquivo *"}</Label>
            {isEditing && editingDocument ? (
              // Modo edição: mostrar informações do documento existente
              <div className="border-2 border-solid rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                    <Upload className="h-5 w-5" />
                    <span className="font-medium">
                      {editingDocument.fileUrl.split("/").pop()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(editingDocument.fileSize)} •{" "}
                    {editingDocument.fileMimeType}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ℹ️ O arquivo não pode ser alterado. Apenas os metadados
                    podem ser editados.
                  </p>
                </div>
              </div>
            ) : (
              // Modo upload: área de drag & drop normal
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
                      <p className="font-medium">
                        Arraste um arquivo aqui ou clique para selecionar
                      </p>
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
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      Selecionar Arquivo
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Digite o título do documento"
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.title.length}/∞ caracteres (mínimo 5)
            </p>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Descreva o conteúdo do documento"
              rows={3}
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.description.length}/∞ caracteres (mínimo 10)
            </p>
          </div>

          {/* Tipo e Área */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Documento *</Label>
              <Select
                value={formData.documentType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, documentType: value }))
                }
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
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, researchArea: value }))
                }
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
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addAuthor())
                }
              />
              <Button type="button" variant="outline" onClick={addAuthor}>
                +
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Adicione pelo menos um autor. Pressione Enter ou clique em + para
              adicionar. ({formData.authors.length} autor
              {formData.authors.length !== 1 ? "es" : ""} adicionado
              {formData.authors.length !== 1 ? "s" : ""})
            </p>
            {formData.authors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.authors.map((author) => (
                  <Badge
                    key={author}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
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
            <Label>Palavras-chave *</Label>
            <div className="flex gap-2">
              <Input
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                placeholder="Palavra-chave"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addKeyword())
                }
              />
              <Button type="button" variant="outline" onClick={addKeyword}>
                +
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Adicione pelo menos uma palavra-chave. Pressione Enter ou clique
              em + para adicionar. ({formData.keywords.length} palavra
              {formData.keywords.length !== 1 ? "s" : ""}-chave adicionada
              {formData.keywords.length !== 1 ? "s" : ""})
            </p>
            {formData.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
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
              onClick={() => onClose()}
              disabled={uploadMutation.isPending || updateMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={uploadMutation.isPending || updateMutation.isPending}
            >
              {(
                isEditing ? updateMutation.isPending : uploadMutation.isPending
              ) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Atualizando..." : "Enviando..."}
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {isEditing ? "Atualizar Documento" : "Enviar Documento"}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
