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
4. **Build funcionando**: Projeto compila sem erros
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
   - UserNav dropdown com opções de perfil e logout
   - ProtectedRoute component para rotas privadas
   - Páginas ProfilePage, DocumentosPage e AdminPage criadas
   - Integração completa: login funciona, rotas protegidas, navbar dinâmico

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
     <Route path="/perfil" element={<PerfilPage />} />
     <Route path="/admin" element={<AdminPage />} />
   </Routes>
   ```

2. **Migrar página por página**:
   - ✅ Componentes UI (feito)
   - ✅ Página inicial (`educar/app/page.tsx` → `educar-new/src/pages/HomePage.tsx`) ✅ MIGRADO
   - ✅ Login page básica ✅ CRIADO + FUNCIONAL
   - ✅ Sistema de autenticação ✅ IMPLEMENTADO
   - 🔄 Documentos page (estrutura básica criada, precisa implementar funcionalidades)
   - 🔄 Perfil page (estrutura básica criada, precisa implementar funcionalidades)
   - 🔄 Admin page (estrutura básica criada, precisa implementar funcionalidades)

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

## 🚀 **Comando para começar nova sessão**
```bash
cd educar-new
bun run dev  # verificar se ainda funciona
```

**Status atual**: ✅ Base configurada, **HomePage, LoginPage, ThemeProvider e Sistema de Autenticação totalmente funcionais**.

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
3. **Página de Documentos**: Implementar funcionalidades completas com TanStack Query + mocks de API
4. **Componentes de Gerenciamento**: Migrar DocumentList, DocumentFilters, AddDocumentButton, etc.
5. **State Management**: APIs mockadas para CRUD de documentos e usuários

## 📋 **Checklist de Migração por Página**

Para cada página a ser migrada:

### ✅ **Preparação**
- [ ] Analisar dependências do Next.js na página original
- [ ] Identificar APIs chamadas
- [ ] Verificar componentes utilizados

### ✅ **Migração**
- [ ] Criar arquivo da página em `src/pages/`
- [ ] Remover imports específicos do Next.js
- [ ] Converter para React Router (Link, navigate)
- [ ] Substituir APIs por TanStack Query + mocks
- [ ] Testar compilação
- [ ] Testar funcionalidade básica

### ✅ **Finalização**
- [ ] Verificar lint
- [ ] Adicionar rota no App.tsx
- [ ] Commit da migração
- [ ] Testar navegação

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
