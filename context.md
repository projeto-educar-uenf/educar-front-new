# Contexto para Continuação da Migração Next.js → Vite + React

## 🎯 **Objetivo**

Migrar o projeto Next.js (`educar`) para Vite + React puro (`educar-new`) de forma gradual, página por página, com commits incrementais.

## 📁 **Estrutura dos Projetos**

```
educar/ (Next.js - ORIGEM)
├── app/
│   ├── page.tsx (página inicial)
│   ├── layout.tsx
│   ├── login/page.tsx
│   ├── documentos/page.tsx
│   ├── perfil/page.tsx
│   ├── admin/page.tsx
│   └── api/ (APIs do Next.js)
├── components/ (UI components)
├── lib/ (auth, prisma, utils)
└── package.json

educar-new/ (Vite + React - DESTINO)
├── src/
│   ├── App.tsx
│   ├── main.tsx (configurado com Router + Query)
│   ├── components/ui/ (✅ MIGRADO)
│   ├── lib/utils.ts (✅ MIGRADO)
│   └── pages/ (para criar)
└── package.json
```

## ✅ **O que JÁ FOI FEITO**

1. **Dependências básicas instaladas**: React Router DOM, TanStack Query, Tailwind CSS, Radix UI
2. **Configuração base**:
   - Path alias `@` configurado no Vite e TypeScript
   - CSS com design tokens do shadcn/ui
   - QueryClient configurado no main.tsx
3. **Componentes UI migrados**: Todos os componentes de `educar/components/ui/` copiados e funcionando
4. **✅ BUILD E DEPLOY FUNCIONANDO**:
   - Projeto compila sem erros com `bun run build`
   - Aplicação roda corretamente em produção com `bun run serve`
   - Arquivo `_redirects` configurado para SPAs (resolve erro 404 em rotas client-side)
   - Vite preview configurado para servir em produção na porta 80
5. **✅ CSS CORRIGIDO**:
   - Downgrade do Tailwind CSS v4 → v3 para estabilidade
   - Configuração PostCSS corrigida
   - CSS customizado do shadcn/ui funcionando
6. **✅ PÁGINA INICIAL MIGRADA**:
   - HomePage funcional com roteamento React Router
   - LoginPage básica criada
   - Navbar simples com theme toggle mockado
   - Footer completo com logo e informações UENF
7. **✅ ASSETS MIGRADOS**:
   - Imagens logo-preta.webp e logo-branca.webp copiadas
   - Título da página atualizado para "Projeto Educar UENF"
   - Meta description configurada
8. **✅ THEME PROVIDER IMPLEMENTADO**:
   - ThemeProvider customizado criado (sem dependência next-themes)
   - Dark mode totalmente funcional (light/dark/system)
   - ThemeToggle com 3 estados e persistência localStorage
   - Footer com logo dinâmica baseada no tema
   - Integração completa no main.tsx e navbar
9. **✅ AUTENTICAÇÃO MOCK IMPLEMENTADA**:
   - AuthProvider customizado com Context API
   - Sistema de login/logout funcional com persistência localStorage
   - UserNav dropdown com opções de logout (perfil será integrado com Google)
   - ProtectedRoute component para rotas privadas
   - Páginas DocumentosPage e AdminPage criadas
   - Integração completa: login funciona, rotas protegidas, navbar dinâmico
10. **✅ DOCUMENTOS PAGE FUNCIONAL**:

- Sistema completo de listagem de documentos com TanStack Query
- DocumentCard migrado com download funcional
- Busca por título implementada com debounce
- Paginação funcional integrada com URL params
- APIs mockadas com dados realistas (160+ documentos de exemplo)
- UX melhorada: loading states, error handling, empty states
- ✅ **FILTROS AVANÇADOS IMPLEMENTADOS**: Sistema completo de filtros funcionais

11. **✅ PÁGINAS INDIVIDUAIS DE DOCUMENTOS FUNCIONAIS**:

- Rota dinâmica `/documentos/:id` implementada
- DocumentDetailPage completa com informações detalhadas
- Navegação clicável dos DocumentCards para detalhes
- Layout responsivo com informações organizadas
- Estados de loading, erro e documento não encontrado
- Botões de download e visualização (visualização online desabilitada temporariamente)
- Breadcrumbs e navegação de volta para listagem
- Integração completa com TanStack Query

12. **✅ LAYOUT PERSISTENTE COM NAVBAR**:

- Layout component criado com Outlet do React Router
- Navbar sempre visível no topo da aplicação
- Todas as páginas restructuradas para usar o layout comum
- Footer mantido em cada página conforme necessário

13. **✅ NAVEGAÇÃO E REDIRECIONAMENTOS COMPLETOS**:

- Sistema de roteamento baseado no estado de autenticação
- Redirecionamentos automáticos implementados

14. **✅ FILTROS AVANÇADOS TOTALMENTE FUNCIONAIS**:

- **SearchInput**: Integrado no navbar para páginas /documentos e /admin
- **FilterButton**: Botão de filtros com ícone que abre drawer responsivo
- **DocumentFilters**: Componente completo com filtros por tipo, área e autor + contadores
- **DrawerProvider**: Context para gerenciar estado global do drawer de filtros
- **Layout com Drawer**: Drawer global renderizado no layout para filtros
- **useFilters hook**: Integração com URL params para filtros persistentes
- **UX otimizada**: Aplicação automática, clear filters, badges de filtros ativos
- **Responsivo**: Drawer em mobile/tablet, funciona perfeitamente em desktop

15. **✅ ADMINPAGE TOTALMENTE FUNCIONAL**:

- **AdminTabs**: Componente com abas funcionais para usuários e documentos
- **UserManagement**: Sistema completo de gestão de usuários com TanStack Query
  - Dashboard com estatísticas (total usuários, admins, ativos)
  - Busca de usuários com debounce
  - Toggle de permissões admin/user com validações
  - Loading states e error handling completos
- **DocumentManagement**: Sistema completo de gestão de documentos com TanStack Query
  - Dashboard com estatísticas (total docs, docs mês, downloads)
  - Busca e listagem de documentos
  - Ações de visualizar e deletar documentos
  - Confirmações e feedback de operações
- **APIs Mock Funcionais**: fetchUsers, updateUser, deleteDocument, getAdminStats
- **Tipos Completos**: User, AdminStats, UpdateRequests definidos

16. **✅ SISTEMA DE UPLOAD DE DOCUMENTOS FUNCIONAL**:

- **AddDocumentModal**: Modal completo de upload com validações
  - Upload por drag & drop ou seleção de arquivo
  - Formulário completo (título, descrição, autores, área, tipo, keywords)
  - Validação de tipos de arquivo (PDF, DOC, DOCX, TXT)
  - Validação de tamanho (máx 10MB)
  - Loading states e feedback de upload
- **AddDocumentButton**: Botão global na navbar (ícone +)
- **AddDocumentProvider**: Context global para modal
- **API Mock de Upload**: uploadDocument com blob URLs reais
- **Integração Completa**: Atualização automática das listas após upload

17. **✅ VISUALIZAÇÃO INLINE DE DOCUMENTOS FUNCIONAL**:

- **Preview System**: Sistema de preview baseado em blob URLs
- **canPreviewDocument**: Função que verifica tipos suportados (PDF, TXT, imagens)
- **openDocumentPreview**: Abre documento em nova aba ou força download
- **DocumentDetailPage**: Botão "Visualizar Online" funcional e inteligente
- **DocumentCard**: Botão "Preview" nos cards com 3 ações (Download/Preview/Detalhes)
- **Blob URLs**: Documentos enviados geram URLs reais para teste de preview

18. **✅ SISTEMA DE EDIÇÃO DE DOCUMENTOS FUNCIONAL**:

- **Modal Unificado**: AddDocumentModal adaptado para upload e edição
  - Detecção automática do modo (upload vs edição)
  - Pré-preenchimento de formulário com dados existentes
  - Validação adaptada (arquivo não obrigatório na edição)
  - UI contextual com títulos e botões dinâmicos
- **Controle de Permissões**: Apenas criador ou admin podem editar
- **API updateDocument**: Mock funcional para atualizar metadados
- **Botões Estratégicos**: DocumentCard, DocumentDetailPage e AdminPage
- **Preservação de Arquivo**: Apenas metadados são editáveis
- **Invalidação de Queries**: Atualização automática em todas as listas

19. **✅ SISTEMA DE NOTIFICAÇÕES (REACT TOASTIFY) IMPLEMENTADO**:

- **React Toastify**: Biblioteca confiável substituindo useToast customizado
- **Configuração Completa**: ToastContainer integrado no main.tsx
- **Estilos Customizados**: Integração perfeita com design system do shadcn/ui
- **Posicionamento**: Toasts aparecem no canto inferior esquerdo
- **Funcionalidades**: Auto-close, drag & drop, pause on hover, progress bar
- **Tipos**: Success (verde), Error (vermelho), Info (azul), Warning (amarelo)
- **API Compatível**: useToast hook mantém mesma interface para compatibilidade
- **Instalação**: Dependência instalada via bun (react-toastify@11.0.5)

## 🛠 **DETALHES TÉCNICOS DA IMPLEMENTAÇÃO**

### **🔧 Arquitetura do Sistema de Upload**

```tsx
// Fluxo completo de upload:
1. AddDocumentButton (navbar) → 2. AddDocumentProvider (context) → 
3. AddDocumentModal (formulário) → 4. uploadDocument API → 
5. Blob URL creation → 6. Query invalidation → 7. UI update
```

### **✏️ Arquitetura do Sistema de Edição**

```tsx
// Fluxo completo de edição:
1. Botão "Editar" (DocumentCard/DetailPage/Admin) → 2. AddDocumentProvider.openEditModal() → 
3. AddDocumentModal (pré-preenchido) → 4. Validação de permissões → 
5. updateDocument API → 6. Query invalidation → 7. UI update
```

### **📱 UX/UI Implementadas**

- **Drag & Drop**: Área de upload visual com feedback de arrastar
- **Validação em Tempo Real**: Feedback imediato para tipos/tamanhos de arquivo
- **Loading States**: Spinners e desabilitação durante upload
- **Toast Notifications**: Feedback de sucesso/erro com mensagens detalhadas
- **Query Invalidation**: Atualização automática de todas as listas relacionadas
- **Responsive Design**: Modal responsivo com scroll em telas pequenas

### **🔍 Sistema de Preview Inteligente**

- **Detecção de Tipo**: Identifica automaticamente se arquivo pode ser visualizado
- **Fallback Gracioso**: Download automático para arquivos não visualizáveis  
- **Performance**: Blob URLs locais para preview instantâneo
- **UX Consistency**: Botões consistentes em cards e página de detalhes

## 🛠 **Ferramentas e Comandos Úteis**

**Usando BUN (não npm):**

```bash
# Instalar dependências
bun add <package>
bun add -d <dev-package>

# Build e desenvolvimento
bun run dev
bun run build

# Verificar erros
bun run lint
bun run lint:check  # comando customizado criado
```

**Comandos CLI Inteligentes para Migração:**

```bash
# Copiar componentes (já feito)
cp -r educar/components/ui/* educar-new/src/components/ui/

# Buscar imports específicos do Next.js
grep -r "next/" educar/components/
grep -r "use client" educar/components/

# Remover diretivas "use client" em massa
find educar-new/src -name "*.tsx" -exec sed -i '' '/"use client"/d' {} \;

# Verificar dependências faltantes
grep -r "import.*from" educar/components/ | grep -v "node_modules" | sort | uniq
```

## 🎯 **PRÓXIMOS PASSOS (Ordem de Migração)**

1. **Criar estrutura de roteamento**:

   ```tsx
   // App.tsx - configurar React Router
   <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/login" element={<LoginPage />} />
     <Route path="/documentos" element={<DocumentosPage />} />
     <Route path="/admin" element={<AdminPage />} />
   </Routes>
   ```

2. **Migrar página por página**:
   - ✅ Componentes UI (feito)
   - ✅ Página inicial (`educar/app/page.tsx` → `educar-new/src/pages/HomePage.tsx`) ✅ MIGRADO
   - ✅ Login page básica ✅ CRIADO + FUNCIONAL
   - ✅ Sistema de autenticação ✅ IMPLEMENTADO
   - ✅ Documentos page (listagem e busca funcionais) ✅ MIGRADO
   - ✅ Páginas individuais de documentos (/documentos/[id]) ✅ MIGRADO
   - ✅ Layout persistente com Navbar ✅ IMPLEMENTADO
   - ✅ **FILTROS AVANÇADOS IMPLEMENTADOS**: Sistema completo de filtros funcionais
   - ✅ **AdminPage MIGRADA**: Estrutura completa com abas e componentes funcionais
   - ⚠️ **PERFIL**: Não será implementado - dados virão da integração com Google OAuth

3. **Substituir APIs Next.js por TanStack Query**:

   ```tsx
   // Exemplo de conversão:
   // Next.js: await fetch('/api/users')
   // React: useQuery({ queryKey: ['users'], queryFn: fetchUsers })
   ```

4. **Mock das APIs** durante migração

## 🔧 **Configurações Importantes**

**Vite Config atual:**

```ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
```

**Dependencies que NÃO migrar:**

- `next`, `next-auth`, `@auth/*`
- APIs específicas do Next.js
- `next-themes` (usar context customizado)

**Dependencies essenciais já instaladas:**

- React Router DOM, TanStack Query
- Todas as Radix UI necessárias
- Tailwind CSS com config completa

## 📝 **Estratégia de Commits**

**⚠️ IMPORTANTE: O usuário é responsável pelos commits!**

O assistente irá implementar as mudanças e o usuário fará os commits manualmente. Esta é uma colaboração onde:

- ✅ **Assistente**: Implementa código, migra páginas, faz análises
- ✅ **Usuário**: Controla git (add, commit, push), toma decisões sobre próximos passos
- 🤝 **Colaboração**: Usuário orienta qual iteração realizar e tira dúvidas

```bash
# Exemplo de commits graduais (feitos pelo usuário)
git commit -m "feat: migrar HomePage - componente base sem APIs"
git commit -m "feat: adicionar React Router para HomePage"  
git commit -m "feat: migrar LoginPage com mock de autenticação"
```

**Fluxo de trabalho:**

1. Assistente pergunta qual próximo passo realizar, fazendo sugestões
2. Usuário escolhe e orienta a iteração
3. Assistente implementa as mudanças
4. Usuário revisa, faz git add e commit
5. Repetir até conclusão da migração

## ⚠️ **Pontos de Atenção**

- Remover todas as diretivas `"use client"`
- Substituir `next/link` por `react-router-dom`
- Substituir `next/image` por `<img>` ou biblioteca alternativa
- Converter server components para client components
- Substituir `getServerSession` por context/estado local
- **FUNCIONALIDADES INCOMPLETAS**: Sempre desabilitar (disabled) com comentários explicativos para evitar testes errôneos

## 📋 **Regra: Funcionalidades Incompletas**

**Para evitar testes errôneos, toda funcionalidade não migrada deve estar:**

1. **Desabilitada** (`disabled={true}`) ou removida
2. **Comentada** com `// TODO: Migrar [funcionalidade] - remover disabled após implementação`
3. **Documentada** no context.md como "PENDENTE"

## 🚀 **Comando para começar nova sessão**

```bash
cd educar-new
bun run dev  # verificar se ainda funciona
```

**Status atual**: ✅ Base configurada, **HomePage, LoginPage, ThemeProvider, Sistema de Autenticação, Páginas Individuais de Documentos, Filtros Avançados, AdminPage e Sistema de Edição de Documentos 100% funcionais**.

## 🎯 **MIGRAÇÃO COMPLETAMENTE FUNCIONAL + SISTEMA DE UPLOAD, PREVIEW E EDIÇÃO**

### **🏆 MARCOS ALCANÇADOS:**

A migração está **COMPLETA E EXPANDIDA** com funcionalidades avançadas:

- ✅ **Autenticação mock** funcionando perfeitamente
- ✅ **Gestão completa de documentos** (listagem, filtros, detalhes, upload, preview, edição)
- ✅ **Administração** completa (usuários, documentos, estatísticas)
- ✅ **Sistema de Upload** global funcional com validações
- ✅ **Preview de Documentos** inline com blob URLs reais
- ✅ **Sistema de Edição** com controle de permissões e modal unificado
- ✅ **UI/UX** polida com loading states e error handling
- ✅ **Arquitetura sólida** com TanStack Query e React Router

### **🆕 FUNCIONALIDADES AVANÇADAS IMPLEMENTADAS:**

#### **📤 SISTEMA DE UPLOAD DE DOCUMENTOS**

- **AddDocumentModal**: Modal sofisticado com drag & drop
  - Upload por arrastar/soltar ou clique para selecionar
  - **Validação Completa**: PDF, DOC, DOCX, TXT (máx 10MB)
  - **Formulário Avançado**: título (min 5 chars), descrição (min 10 chars), autores, área, tipo, keywords
  - **Sistema de Tags**: Autores e palavras-chave com prevenção de duplicatas
  - **Validação em Tempo Real**: Contadores de caracteres e feedback visual
  - **Mensagens Específicas**: Toasts detalhados para cada tipo de erro
  - **UX Intuitiva**: Instruções claras e contadores em tempo real
  - Loading states durante upload com feedback visual
- **AddDocumentButton**: Botão global na navbar (ícone +)
- **AddDocumentProvider**: Context global para gerenciar modal
- **API uploadDocument**: Mock que cria blob URLs reais para teste
- **Invalidação de Queries**: Atualização automática de todas as listas

**✅ VALIDAÇÃO AVANÇADA DE FORMULÁRIOS IMPLEMENTADA**:

- **Campos Obrigatórios**: Arquivo, título, descrição, tipo, área, pelo menos 1 autor e 1 palavra-chave
- **Validação de Comprimento**: Título mínimo 5 caracteres, descrição mínimo 10 caracteres
- **Prevenção de Duplicatas**: Sistema impede autores e palavras-chave duplicados
- **Feedback Visual**: Contadores de caracteres, indicadores de progresso
- **Mensagens Específicas**: Toasts detalhados para cada tipo de erro
- **UX Intuitiva**: Instruções claras e contadores em tempo real

#### **👁️ SISTEMA DE PREVIEW DE DOCUMENTOS**

- **canPreviewDocument**: Verifica tipos suportados (PDF, TXT, imagens)
- **openDocumentPreview**: Abre em nova aba ou força download
- **DocumentDetailPage**: Botão "Visualizar Online" inteligente
- **DocumentCard**: 3 ações (Download/Preview/Detalhes) com preview funcional
- **Blob URLs**: Documentos enviados geram URLs reais navegáveis

#### **✏️ SISTEMA DE EDIÇÃO DE DOCUMENTOS**

- **Modal Unificado**: AddDocumentModal adaptado para upload e edição
  - **Detecção Automática**: Modal muda automaticamente entre modo upload/edição
  - **Pré-preenchimento**: Formulário carregado com dados existentes do documento
  - **Campo de Arquivo Read-only**: Mostra informações do arquivo atual (não editável)
  - **Validação Adaptada**: Remove validação de arquivo obrigatório no modo edição
  - **UI Contextual**: Título, descrição e botões mudam conforme o modo
- **AddDocumentProvider Estendido**: Context gerencia tanto upload quanto edição
  - **openEditModal()**: Nova função para abrir modal em modo edição
  - **Estado editingDocument**: Documento sendo editado atualmente
- **API updateDocument**: Função mock para atualizar metadados
  - **Preserva arquivo original**: Apenas metadados são atualizados
  - **Timestamp de atualização**: updatedAt é modificado automaticamente
- **Controle de Permissões**: Sistema completo de verificação de acesso
  - **Criador do documento**: Pode editar seus próprios documentos
  - **Administradores**: Podem editar qualquer documento
  - **Verificação dupla**: Frontend + API validam permissões
- **Botões de Edição Estratégicos**:
  - **DocumentCard**: Botão "Editar Documento" aparece condicionalmente
  - **DocumentDetailPage**: Botão "Editar" na seção "Ações" da sidebar
  - **DocumentManagement** (Admin): Botão funcional na lista administrativa
- **Invalidação Inteligente de Queries**: Atualização automática em todas as listas
  - Lista principal de documentos, admin, estatísticas e página individual

### **🔄 PRÓXIMAS MELHORIAS POSSÍVEIS:**

1. ~~**Validação Avançada de Formulários**~~ ✅ **IMPLEMENTADO**
2. ~~**Edição de Documentos**~~ ✅ **IMPLEMENTADO**
3. **Google OAuth** - Substituir sistema mock por autenticação real  
4. **Sistema de Favoritos** - Bookmarks de documentos para usuários
5. **Analytics Avançados** - Relatórios detalhados de uso
6. **Notificações** - Sistema de alertas para admins

## 🔍 **Descobertas da Migração**

### **Problemas Resolvidos:**

1. **Tailwind CSS v4 → v3**: v4 ainda é experimental e incompatível com shadcn/ui
2. **PostCSS Configuration**: `@tailwindcss/postcss` vs `tailwindcss` padrão
3. **Asset Management**: Next.js otimiza imagens automaticamente, precisamos copiar manualmente
4. **CSS Variables**: Shadcn/ui depende de variáveis CSS específicas que precisam estar corretas
5. **Theme Provider**: Next-themes → React Context customizado (mais controle e sem dependências extras)
6. **Autenticação**: NextAuth → Context API com localStorage (mock funcional, facilmente substituível)

### **Diferenças de Arquitetura:**

- **Next.js**: Server-side routing, otimização automática de assets, API routes integradas
- **Vite + React**: Client-side routing, build mais rápido, configuração mais manual

### **Próximas Prioridades:**

1. ✅ **Theme Provider**: Implementar dark mode funcional ~~(atualmente mockado)~~ **COMPLETO**
2. ✅ **Context de Autenticação**: Criar sistema de auth mock para substituir NextAuth **COMPLETO**
3. ✅ **Página de Documentos**: Implementar funcionalidades completas com TanStack Query + mocks de API **COMPLETO**
4. **Componentes de Gerenciamento**: Migrar DocumentList, DocumentFilters, AddDocumentButton, etc.
5. **State Management**: APIs mockadas para CRUD de documentos e usuários
6. **Integração Google OAuth**: Substituir sistema mock quando necessário (perfil virá do Google)

## 📋 **Checklist de Migração por Página**

Para cada página a ser migrada:

### ✅ **Preparação**

- [x] Analisar dependências do Next.js na página original
- [x] Identificar APIs chamadas
- [x] Verificar componentes utilizados

### ✅ **Migração**

- [x] Criar arquivo da página em `src/pages/`
- [x] Remover imports específicos do Next.js
- [x] Converter para React Router (Link, navigate)
- [x] Substituir APIs por TanStack Query + mocks
- [x] Testar compilação
- [x] Testar funcionalidade básica

### ✅ **Finalização**

- [x] Verificar lint
- [x] Adicionar rota no App.tsx
- [x] Commit da migração
- [x] Testar navegação

## 🔗 **APIs a serem Mockadas**

Baseado no projeto original, essas APIs precisarão ser mockadas:

- `/api/auth/*` - Autenticação
- `/api/users/*` - Gerenciamento de usuários
- `/api/documents/*` - Documentos
- `/api/files/*` - Upload de arquivos

## 💡 **Dicas de Migração**

1. **Use CLI sempre que possível** para operações em massa
2. **Migre uma página por vez** com commits pequenos
3. **Teste cada etapa** antes de prosseguir
4. **Mantenha mocks simples** inicialmente
5. **Use TanStack Query** para todas as operações de dados
