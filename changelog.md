# Changelog - Projeto Educar UENF

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.19.0] - 2024-03-XX

### Adicionado

- **Sistema de Notificações com React Toastify**
  - Biblioteca React Toastify v11.0.5 instalada
  - ToastContainer integrado no main.tsx
  - Estilos customizados para integração com shadcn/ui
  - Posicionamento no canto inferior esquerdo
  - Funcionalidades: auto-close, drag & drop, pause on hover, progress bar
  - Tipos de notificação: Success (verde), Error (vermelho), Info (azul), Warning (amarelo)
  - Hook useToast mantendo mesma interface para compatibilidade

## [0.18.0] - 2024-03-XX

### Adicionado

- **Sistema de Edição de Documentos**
  - Modal unificado adaptado para upload e edição
  - Detecção automática do modo (upload vs edição)
  - Pré-preenchimento de formulário com dados existentes
  - Validação adaptada (arquivo não obrigatório na edição)
  - UI contextual com títulos e botões dinâmicos
  - Controle de permissões (apenas criador ou admin podem editar)
  - API updateDocument mock funcional
  - Botões de edição em DocumentCard, DocumentDetailPage e AdminPage
  - Preservação de arquivo (apenas metadados são editáveis)
  - Invalidação de queries para atualização automática

## [0.17.0] - 2024-03-XX

### Adicionado

- **Visualização Inline de Documentos**
  - Sistema de preview baseado em blob URLs
  - Função canPreviewDocument para verificar tipos suportados (PDF, TXT, imagens)
  - openDocumentPreview abre documento em nova aba ou força download
  - Botão "Visualizar Online" funcional na DocumentDetailPage
  - Botão "Preview" nos DocumentCards com 3 ações (Download/Preview/Detalhes)
  - Blob URLs reais para documentos enviados

## [0.16.0] - 2024-03-XX

### Adicionado

- **Sistema de Upload de Documentos**
  - AddDocumentModal completo com drag & drop
  - Upload por arrastar/soltar ou seleção de arquivo
  - Formulário completo (título, descrição, autores, área, tipo, keywords)
  - Validação de tipos de arquivo (PDF, DOC, DOCX, TXT)
  - Validação de tamanho (máx 10MB)
  - Loading states e feedback de upload
  - AddDocumentButton global na navbar (ícone +)
  - AddDocumentProvider context global para modal
  - API uploadDocument mock com blob URLs reais
  - Atualização automática das listas após upload

## [0.15.0] - 2024-03-XX

### Adicionado

- **AdminPage Totalmente Funcional**
  - AdminTabs com abas funcionais para usuários e documentos
  - UserManagement com dashboard de estatísticas
  - Busca de usuários com debounce
  - Toggle de permissões admin/user com validações
  - DocumentManagement com gestão completa
  - Dashboard com estatísticas (total docs, docs mês, downloads)
  - Ações de visualizar e deletar documentos
  - APIs mock: fetchUsers, updateUser, deleteDocument, getAdminStats
  - Tipos TypeScript completos: User, AdminStats, UpdateRequests

## [0.14.0] - 2024-03-XX

### Adicionado

- **Filtros Avançados Totalmente Funcionais**
  - SearchInput integrado no navbar para páginas /documentos e /admin
  - FilterButton com ícone que abre drawer responsivo
  - DocumentFilters completo com filtros por tipo, área e autor + contadores
  - DrawerProvider context para gerenciar estado global do drawer
  - Layout com Drawer global renderizado para filtros
  - useFilters hook com integração URL params para filtros persistentes
  - UX otimizada: aplicação automática, clear filters, badges de filtros ativos
  - Design responsivo: drawer em mobile/tablet, funciona perfeitamente em desktop

## [0.13.0] - 2024-03-XX

### Adicionado

- **Navegação e Redirecionamentos Completos**
  - Sistema de roteamento baseado no estado de autenticação
  - Redirecionamentos automáticos implementados

## [0.12.0] - 2024-03-XX

### Adicionado

- **Layout Persistente com Navbar**
  - Layout component criado com Outlet do React Router
  - Navbar sempre visível no topo da aplicação
  - Todas as páginas restructuradas para usar layout comum
  - Footer mantido em cada página conforme necessário

## [0.11.0] - 2024-03-XX

### Adicionado

- **Páginas Individuais de Documentos**
  - Rota dinâmica `/documentos/:id` implementada
  - DocumentDetailPage completa com informações detalhadas
  - Navegação clicável dos DocumentCards para detalhes
  - Layout responsivo com informações organizadas
  - Estados de loading, erro e documento não encontrado
  - Botões de download e visualização
  - Breadcrumbs e navegação de volta para listagem
  - Integração completa com TanStack Query

## [0.10.0] - 2024-03-XX

### Adicionado

- **DocumentosPage Funcional**
  - Sistema completo de listagem com TanStack Query
  - DocumentCard migrado com download funcional
  - Busca por título implementada com debounce
  - Paginação funcional integrada com URL params
  - APIs mockadas com 160+ documentos de exemplo
  - UX melhorada: loading states, error handling, empty states

## [0.9.0] - 2024-03-XX

### Adicionado

- **Autenticação Mock Implementada**
  - AuthProvider customizado com Context API
  - Sistema de login/logout com persistência localStorage
  - UserNav dropdown com opções de logout
  - ProtectedRoute component para rotas privadas
  - Páginas DocumentosPage e AdminPage criadas
  - Integração completa com navbar dinâmico

## [0.8.0] - 2024-03-XX

### Adicionado

- **Theme Provider Implementado**
  - ThemeProvider customizado criado (sem dependência next-themes)
  - Dark mode totalmente funcional (light/dark/system)
  - ThemeToggle com 3 estados e persistência localStorage
  - Footer com logo dinâmica baseada no tema
  - Integração completa no main.tsx e navbar

## [0.7.0] - 2024-03-XX

### Adicionado

- **Assets Migrados**
  - Imagens logo-preta.webp e logo-branca.webp copiadas
  - Título da página atualizado para "Projeto Educar UENF"
  - Meta description configurada

## [0.6.0] - 2024-03-XX

### Adicionado

- **Página Inicial Migrada**
  - HomePage funcional com roteamento React Router
  - LoginPage básica criada
  - Navbar simples com theme toggle mockado
  - Footer completo com logo e informações UENF

## [0.5.0] - 2024-03-XX

### Corrigido

- **CSS Corrigido**
  - Downgrade do Tailwind CSS v4 → v3 para estabilidade
  - Configuração PostCSS corrigida
  - CSS customizado do shadcn/ui funcionando

## [0.4.0] - 2024-03-XX

### Adicionado

- **Build e Deploy Funcionando**
  - Projeto compila sem erros com `bun run build`
  - Aplicação roda corretamente em produção com `bun run serve`
  - Arquivo `_redirects` configurado para SPAs (resolve erro 404)
  - Vite preview configurado para servir em produção na porta 80

## [0.3.0] - 2024-03-XX

### Adicionado

- **Componentes UI Migrados**
  - Todos os componentes de `educar/components/ui/` copiados
  - Componentes funcionando sem dependências Next.js

## [0.2.0] - 2024-03-XX

### Adicionado

- **Configuração Base**
  - Path alias `@` configurado no Vite e TypeScript
  - CSS com design tokens do shadcn/ui
  - QueryClient configurado no main.tsx

## [0.1.0] - 2024-03-XX

### Adicionado

- **Dependências Básicas Instaladas**
  - React Router DOM
  - TanStack Query
  - Tailwind CSS
  - Radix UI
  - Estrutura inicial do projeto Vite + React

## Legenda

- **Adicionado** para novas funcionalidades
- **Modificado** para mudanças em funcionalidades existentes
- **Corrigido** para correções de bugs
- **Removido** para funcionalidades removidas
