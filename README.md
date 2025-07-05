# 📚 Projeto Educar UENF

Sistema de gestão e compartilhamento de documentos acadêmicos da Universidade Estadual do Norte Fluminense Darcy Ribeiro.

**✅ SISTEMA COMPLETO E OPERACIONAL - Frontend integrado com backend real**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Visão Geral

O Projeto Educar é uma plataforma moderna para centralizar, organizar e compartilhar documentos acadêmicos da UENF. Desenvolvido com as tecnologias mais recentes, oferece uma experiência rápida, intuitiva e segura para toda a comunidade universitária.

**STATUS ATUAL**: Frontend totalmente migrado e integrado com backend real. Autenticação Google OAuth funcionando, dados reais sendo consumidos, sistema cross-origin configurado.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação real** via Google OAuth (@uenf.br e @pq.uenf.br) ✅
- 📄 **Gestão completa de documentos** com dados reais do backend ✅
- 🔍 **Busca inteligente** com filtros funcionando no backend ✅
- 👥 **Painel administrativo** preparado para dados reais ✅
- 🌓 **Tema claro/escuro** com detecção automática ✅
- 📱 **100% responsivo** para todos os dispositivos ✅

## 🛠️ Tecnologias

### Frontend

- **React 18** - Biblioteca UI moderna
- **TypeScript** - Type safety e melhor DX
- **Vite** - Build tool ultra-rápida
- **React Router v6** - Roteamento SPA
- **TanStack Query** - Gerenciamento de estado servidor
- **Tailwind CSS v3** - Estilização utility-first
- **Radix UI** - Componentes acessíveis
- **React Toastify** - Sistema de notificações

### Ferramentas

- **Bun** - Runtime JavaScript all-in-one
- **ESLint** - Linting e formatação
- **shadcn/ui** - Sistema de design

## 📦 Instalação

### Pré-requisitos

- [Bun](https://bun.sh) instalado (recomendado) ou Node.js 18+
- Git

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/uenf/projeto-educar.git
cd educar-new
```

2. Instale as dependências:

```bash
bun install
# ou npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
bun run dev
# ou npm run dev
```

5. Acesse http://localhost:5173

## 🚀 Scripts Disponíveis

```bash
bun run dev          # Inicia servidor de desenvolvimento
bun run build        # Compila para produção
bun run preview      # Preview da build de produção
bun run lint         # Verifica código com ESLint
bun run type-check   # Verifica tipos TypeScript
```

## 📁 Estrutura do Projeto

```
educar-new/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   │   ├── ui/        # Componentes base (shadcn/ui)
│   │   └── features/  # Componentes de funcionalidades
│   ├── pages/         # Páginas da aplicação
│   ├── queries/       # React Query hooks para busca
│   ├── mutations/     # React Query hooks para modificação
│   ├── lib/           # Utilitários e helpers
│   ├── hooks/         # Custom React hooks
│   ├── providers/     # Context providers
│   ├── services/      # Serviços e APIs
│   └── types/         # TypeScript types
├── public/            # Assets estáticos
└── docs/             # Documentação
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
# API Backend
VITE_API_URL=https://api.educar.uenf.br

# Google OAuth
VITE_GOOGLE_CLIENT_ID=seu-client-id

# Feature Flags
VITE_ENABLE_PREVIEW=true
VITE_MAX_UPLOAD_SIZE=10485760  # 10MB
```

### Configuração do VS Code

Recomendamos as seguintes extensões:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](CONTRIBUTING.md) antes de submeter PRs.

### Fluxo de Desenvolvimento

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Seguimos [Conventional Commits](https://www.conventionalcommits.org/)
- Use TypeScript strict mode
- Componentes devem ter testes
- Mantenha a cobertura de testes acima de 80%

## 📝 Documentação

- [Changelog](./docs/changelog.md) - Histórico de mudanças
- [Funcionalidades](./docs/functionalities.md) - Documentação completa
- [API Reference](./docs/api.md) - Referência das APIs
- [Context](./docs/context.md) - Contexto do projeto

## 🧪 Testes

```bash
bun test             # Roda todos os testes
bun test:watch       # Modo watch
bun test:coverage    # Relatório de cobertura
```

## 🚀 Deploy

O projeto está configurado para deploy automático:

- **Production**: Branch `main` → https://educar.uenf.br
- **Staging**: Branch `develop` → https://staging.educar.uenf.br

### Build para Produção

```bash
bun run build
bun run preview  # Testar localmente
```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Time

Desenvolvido com ❤️ pela equipe de TI da UENF:

- **Coordenação**: Prof. Dr. [Nome]
- **Desenvolvimento**: [Equipe de Desenvolvimento]
- **Design**: [Equipe de Design]

## 📞 Suporte

- **Email**: suporte.educar@uenf.br
- **Issues**: [GitHub Issues](https://github.com/uenf/projeto-educar/issues)
- **Documentação**: [Wiki do Projeto](https://github.com/uenf/projeto-educar/wiki)

---

<p align="center">
  <img src="./public/logo-preta.webp" alt="UENF Logo" width="200">
</p>

<p align="center">
  Universidade Estadual do Norte Fluminense Darcy Ribeiro<br>
  Campos dos Goytacazes - RJ
</p>
