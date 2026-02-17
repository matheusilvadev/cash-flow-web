# Cash Flow Web

Uma aplicação web moderna para gerenciamento de fluxo de caixa pessoal e empresarial, desenvolvida com as tecnologias mais atualizadas do ecossistema React e Next.js.

## 🌟 Características

- **Autenticação Segura**: Integração com Keycloak para autenticação OAuth 2.0
- **Gerenciamento de Atividades**: Registre receitas e despesas com facilidade
- **Dashboard Intuitivo**: Interface responsiva e amigável com dark mode
- **Relatórios em Tempo Real**: Visualize resumos de suas transações
- **Soft Delete**: Marque atividades como deletadas sem perder histórico
- **Server Actions**: Operações otimizadas com Next.js Server Actions
- **TypeScript**: Tipagem estrita para maior segurança e produtividade

## 🚀 Tecnologias

### Frontend
- **Next.js 16.1.6** - Framework React full-stack
- **React 19** - Biblioteca UI moderna
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Estilização utilitária
- **shadcn/ui** - Componentes acessíveis reutilizáveis
- **Lucide React** - Ícones vetoriais
- **Radix UI** - Primitivos de UI sem estilos

### Ferramentas de Desenvolvimento
- **Turbopack** - Bundler ultra-rápido (incluído no Next.js 16)
- **ESLint 9** - Linting de código
- **PostCSS 4** - Transformação de CSS

## 📋 Pré-requisitos

- Node.js 18.0.0 ou superior
- npm, yarn, pnpm ou bun
- Backend API rodando em `http://localhost:8080` (configurável)
- Keycloak ou servidor OAuth 2.0 para autenticação

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd cash-flow-web
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
pnpm install
bun install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL base da API backend
API_BASE_URL=http://localhost:8080

# Configuração Keycloak
NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080/auth
NEXT_PUBLIC_KEYCLOAK_REALM=seu-realm
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=seu-client-id
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
pnpm dev
bun dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
cash-flow-web/
├── app/                          # App Router (Next.js 13+)
│   ├── activities/              # Módulo de atividades
│   │   ├── page.tsx             # Server Component principal
│   │   ├── page-client.tsx      # Client Component
│   │   └── actions.ts           # Server Actions
│   ├── auth/                    # Páginas de autenticação
│   │   ├── callback/
│   │   └── login/
│   ├── api/                     # API Routes (endpoints)
│   ├── globals.css              # Estilos globais
│   └── layout.tsx               # Layout root
├── components/                   # Componentes React reutilizáveis
│   ├── activities/              # Componentes específicos de atividades
│   │   ├── activity-list.tsx
│   │   ├── activity-form-dialog.tsx
│   │   └── summary-cards.tsx
│   └── ui/                      # Componentes base (shadcn/ui)
├── lib/                         # Utilitários e funções compartilhadas
│   ├── api.server.ts            # Cliente API (Server-side)
│   ├── api.client.ts            # Cliente API (Client-side)
│   ├── activities.ts            # Lógica de negócio - atividades
│   ├── auth/
│   │   └── keycloak.ts          # Configuração Keycloak
│   └── utils.ts                 # Funções utilitárias
├── public/                      # Arquivos estáticos
├── tsconfig.json                # Configuração TypeScript
├── next.config.ts               # Configuração Next.js
├── tailwind.config.js           # Configuração Tailwind CSS
├── postcss.config.mjs           # Configuração PostCSS
├── components.json              # Configuração shadcn/ui
└── package.json                 # Dependências e scripts
```

## 🎯 Uso

### Autenticação

1. Acesse `http://localhost:3000`
2. Você será redirecionado para `/login`
3. Faça login com suas credenciais do Keycloak
4. Um token será armazenado e reutilizado automaticamente

### Gerenciar Atividades

#### Criar Atividade
- Clique no botão "+" na seção de atividades
- Preencha o formulário com:
  - Descrição
  - Valor
  - Tipo (Receita ou Despesa)
- Clique em "Salvar"

#### Editar Atividade
- Clique na atividade que deseja editar
- Modifique os campos desejados
- As alterações são salvas automaticamente

#### Deletar Atividade
- Clique no ícone de lixo na atividade
- A atividade será marcada como deletada (soft delete)

#### Visualizar Deletadas
- Use a aba "Deletadas" para ver atividades removidas
- Dados históricos são preservados

## 📊 API

### Endpoints principais

```
GET    /api/v1/activities              # Listar atividades
POST   /api/v1/activities              # Criar atividade
PATCH  /api/v1/activities/:id/description  # Atualizar descrição
PATCH  /api/v1/activities/:id/value        # Atualizar valor
DELETE /api/v1/activities/:id              # Deletar atividade
```

Todos os endpoints requerem autenticação via token Bearer.

## 🔐 Segurança

- **Autenticação OAuth 2.0**: Integrada com Keycloak
- **Server-side Authentication**: Tokens são validados no servidor
- **CORS**: Configurado para aceitar requisições do frontend
- **Type Safety**: TypeScript previne erros em tempo de compilação
- **Content Security**: Headers HTTP ajudam a proteger contra ataques comuns

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Compila para produção |
| `npm start` | Inicia servidor de produção |
| `npm run lint` | Executa análise de código |

## 🎨 Customização

### Temas
A aplicação suporta light mode e dark mode. O tema é controlado por CSS custom variables em `app/globals.css`.

### Cores
Customize as cores primárias em `:root` do `app/globals.css`:
```css
:root {
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  /* ... mais variáveis */
}
```

### Componentes
Componentes podem ser adicionados ou customizados via:
```bash
shadcn-ui add [component-name]
```

## 🚨 Troubleshooting

### "Module has no exported member"
Verifique se as importações estão corretas. Funções Server-only devem estar em arquivos separados com `"use server"`.

### "Can't use Server Component in Client Component"
Use Server Actions em arquivos dedicados (`actions.ts`) e importe-os no Client Component.

### Erro de CORS
Verifique se `API_BASE_URL` está correto e se o backend permite requisições de `http://localhost:3000`.

### Token não persiste
Certifique-se de que os cookies estão habilitados e que `next/headers` está sendo usado apenas em Server Components.

## 📚 Documentação Adicional

- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Keycloak](https://www.keycloak.org/documentation.html)

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👤 Autor

Matheus Oliveira
Desenvolvido como parte do portfólio de projetos.


**Versão**: 0.1.0  
**Última atualização**: Fevereiro de 2026  
**Status**: Em desenvolvimento
