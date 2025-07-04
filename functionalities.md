# Funcionalidades do Sistema - Projeto Educar UENF

## 🏗️ Arquitetura de Dados

### Sistema de Requisições Organizado

- **Mutations** (`src/mutations/`):
  - `useCreateDocument()` - Upload de novos documentos
  - `useUpdateDocument()` - Atualização de metadados
  - `useDeleteDocument()` - Remoção de documentos
  - `useUpdateUser()` - Gestão de permissões de usuários
  - Mutations com callbacks personalizados para reutilização
  - Invalidação automática de queries relacionadas

- **Queries** (`src/queries/`):
  - `useDocuments()` - Listagem com filtros e paginação
  - `useDocument(id)` - Busca individual de documento
  - `useAdminDocuments()` - Listagem para administração
  - `useUsers()` - Gestão de usuários
  - `useAdminStats()` - Dashboard de estatísticas
  - `useFilterStats()` - Contadores para filtros

### Separação de Responsabilidades

- **API Layer** (`src/api.ts`): Funções puras de requisição HTTP
- **Query Layer** (`src/queries/`): Hooks de busca com cache e estados
- **Mutation Layer** (`src/mutations/`): Hooks de modificação com invalidação
- **Component Layer**: Apenas importa e usa hooks organizados

## 🔐 Autenticação e Autorização

### Login via Google OAuth

- Autenticação segura via conta Google institucional (@uenf.br)
- Single Sign-On (SSO) para todos os serviços UENF
- Sessão persistente com refresh token automático
- Logout com invalidação de tokens

### Níveis de Acesso

- **Visitante**: Acesso apenas à página inicial
- **Usuário**: Visualização e download de documentos
- **Administrador**: Gestão completa do sistema

## 📄 Gestão de Documentos

### Visualização e Busca

- **Listagem paginada** com 20 documentos por página
- **Busca em tempo real** por título com debounce
- **Filtros avançados**:
  - Por tipo de documento (Relatório, Artigo, Tese, etc.)
  - Por área de conhecimento
  - Por autor(es)
  - Combinação de múltiplos filtros
- **Ordenação**: Por data, relevância ou downloads

### Upload de Documentos

- **Formatos suportados**: PDF, DOC, DOCX, TXT
- **Tamanho máximo**: 10MB por arquivo
- **Metadados obrigatórios**:
  - Título (mínimo 5 caracteres)
  - Descrição (mínimo 10 caracteres)
  - Tipo de documento
  - Área de conhecimento
  - Autor(es) - múltiplos
  - Palavras-chave - múltiplas
- **Processamento automático**:
  - Extração de texto para busca
  - Geração de thumbnail
  - Verificação de vírus
  - Compressão otimizada

### Visualização de Documentos

- **Preview inline** para PDFs e imagens
- **Visualizador integrado** com zoom e navegação
- **Download direto** com nome original preservado
- **Compartilhamento** via link direto
- **Estatísticas**: Contador de visualizações e downloads

### Edição de Documentos

- **Permissões**: Criador ou administrador
- **Campos editáveis**: Todos os metadados exceto arquivo
- **Histórico de versões**: Rastreamento de alterações
- **Validações**: Mesmas regras do upload

## 👥 Gestão de Usuários

### Perfil do Usuário

- **Dados sincronizados** com conta Google:
  - Nome completo
  - Email institucional
  - Foto de perfil
  - Departamento/curso
- **Preferências pessoais**:
  - Tema (claro/escuro/sistema)
  - Idioma da interface
  - Notificações por email

### Administração de Usuários

- **Dashboard com métricas**:
  - Total de usuários ativos
  - Novos cadastros por período
  - Usuários por departamento
- **Gestão de permissões**:
  - Promover/remover administradores
  - Suspender/reativar contas
  - Logs de atividades
- **Busca e filtros**:
  - Por nome, email ou departamento
  - Por nível de acesso
  - Por status (ativo/inativo)

## 📊 Painel Administrativo

### Dashboard Principal

- **Estatísticas em tempo real**:
  - Total de documentos
  - Downloads do mês
  - Usuários ativos
  - Espaço utilizado
- **Gráficos interativos**:
  - Downloads por período
  - Tipos de documento mais acessados
  - Atividade por departamento

### Gestão de Documentos

- **Ações em lote**:
  - Aprovar/rejeitar pendentes
  - Mover entre categorias
  - Exportar metadados
- **Moderação**:
  - Fila de aprovação
  - Relatórios de conteúdo
  - Remoção com justificativa

### Relatórios e Analytics

- **Relatórios automáticos**:
  - Uso mensal do sistema
  - Documentos mais acessados
  - Usuários mais ativos
- **Exportação de dados**:
  - CSV, Excel ou PDF
  - Filtros personalizados
  - Agendamento de relatórios

## 🔔 Sistema de Notificações

### Notificações em Tempo Real

- **Toast notifications** para ações imediatas
- **Badge** no ícone de notificações
- **Central de notificações** com histórico

### Tipos de Notificação

- Novo documento em área de interesse
- Aprovação/rejeição de upload
- Comentários em documentos
- Atualizações do sistema

### Preferências de Notificação

- Ativar/desativar por tipo
- Escolher método (sistema/email)
- Horário de não perturbar

## 🔍 Funcionalidades Avançadas

### Busca Inteligente

- **Busca full-text** no conteúdo dos documentos
- **Sugestões automáticas** baseadas em histórico
- **Correção ortográfica** ("Você quis dizer...")
- **Busca por similaridade** de documentos

### Integração com Sistemas UENF

- **LDAP**: Autenticação unificada
- **Sistema acadêmico**: Import de dados
- **Biblioteca digital**: Sincronização de acervo
- **Moodle**: Compartilhamento direto

### Acessibilidade

- **Navegação por teclado** completa
- **Leitor de tela** compatível
- **Alto contraste** disponível
- **Tamanho de fonte** ajustável

### Performance e Confiabilidade

- **CDN** para arquivos estáticos
- **Cache inteligente** de documentos
- **Backup automático** diário
- **Recuperação de desastres** testada

## 🛡️ Segurança

### Proteção de Dados

- **Criptografia** em trânsito (HTTPS)
- **Criptografia** em repouso (AES-256)
- **Tokenização** de dados sensíveis
- **Conformidade LGPD**

### Controle de Acesso

- **Rate limiting** por IP/usuário
- **Detecção de anomalias**
- **Logs de auditoria** completos
- **2FA opcional** para admins

### Proteção de Conteúdo

- **Marca d'água** em PDFs sensíveis
- **Prevenção de download** em massa
- **Expiração de links** compartilhados
- **Verificação de malware** automática
