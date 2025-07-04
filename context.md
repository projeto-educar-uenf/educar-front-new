# Contexto - Migração Next.js → Vite + React

## 🎯 Objetivo
Migrar o projeto Next.js (`educar`) para Vite + React puro (`educar-new`) de forma gradual.

## 📁 Estrutura
```
educar/ (Next.js - ORIGEM)          educar-new/ (Vite + React - DESTINO)
├── app/                            ├── src/
│   ├── pages...                    │   ├── pages/
│   └── api/                        │   ├── components/ui/
├── components/                     │   └── lib/
└── lib/                            └── vite.config.ts
```

## ✅ Status Atual

### Infraestrutura Base
- **Build/Deploy**: Funcionando em produção (Vite + arquivo `_redirects` para SPA)
- **Dependências**: React Router, TanStack Query, Tailwind CSS v3, Radix UI
- **Configuração**: Path alias `@`, PostCSS, design tokens shadcn/ui

### Funcionalidades Implementadas

#### 🔐 Autenticação e Navegação
- **AuthProvider**: Context API com persistência localStorage (mock)
- **ProtectedRoute**: Component para rotas privadas
- **Layout persistente**: Navbar sempre visível com Outlet
- **Redirecionamentos**: Baseados no estado de autenticação

#### 📄 Sistema de Documentos
- **Listagem**: TanStack Query + paginação + busca com debounce
- **Filtros avançados**: Por tipo, área, autor com URL params persistentes
- **Detalhes**: Páginas individuais com rota dinâmica `/documentos/:id`
- **Upload**: Modal com drag & drop, validações (PDF/DOC/DOCX/TXT, max 10MB)
- **Preview**: Visualização inline para PDFs e imagens com blob URLs
- **Edição**: Modal unificado com controle de permissões (criador/admin)

#### 👥 Administração
- **UserManagement**: CRUD de usuários, toggle admin/user
- **DocumentManagement**: Gestão completa de documentos
- **Dashboard**: Estatísticas em tempo real

#### 🎨 UI/UX
- **Theme Provider**: Dark mode funcional (light/dark/system)
- **Notificações**: React Toastify integrado
- **Estados**: Loading, error handling, empty states
- **Responsivo**: Mobile-first com drawer para filtros

#### 🏗️ Arquitetura

- **Mutations**: Organizadas em `src/mutations/` com callbacks reutilizáveis
- **Queries**: Organizadas em `src/queries/` com hooks customizados
- **Separação**: APIs só em `src/api.ts`, componentes só importam hooks
- **Reutilização**: Mutations com callbacks para diferentes contextos

### APIs Mock Implementadas

```typescript
// Todas organizadas com TanStack Query
// src/queries/ - Para busca de dados
fetchDocuments, fetchUsers, fetchDocumentById, getAdminStats, getFilterStats

// src/mutations/ - Para modificação de dados  
uploadDocument, updateDocument, deleteDocument, updateUser

// Arquitetura limpa: componentes apenas importam hooks organizados
```

## 🚀 Como Usar

```bash
cd educar-new
bun install        # instalar dependências
bun run dev        # desenvolvimento
bun run build      # produção
```

## 🎯 Próximos Passos

1. **APIs Reais**: Conectar com backend real (arquitetura já preparada)
2. **Google OAuth**: Substituir autenticação mock
3. **Testes**: Adicionar testes unitários para mutations e queries

## ⚠️ Pontos de Atenção

- **Perfil de usuário**: Não implementado (virá do Google OAuth)
- **APIs**: Todas mockadas com dados de exemplo
- **Arquivos**: Usando blob URLs locais para testes

## 📝 Notas Técnicas

- **Bun**: Usar ao invés de npm (`bun add`, `bun run`)
- **Commits**: Responsabilidade do usuário (assistente só implementa)
- **Funcionalidades incompletas**: Sempre disabled com comentário TODO