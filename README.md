# 🎓 Academiny

O Academiny tem como missão transformar o cenário educacional, criando uma ponte entre o conhecimento gerado na universidade e as necessidades práticas do mundo real, por meio dos projetos de extensão.

Este repositório contém o código-fonte da plataforma, estruturado como um Monorepo gerenciado por [pnpm](https://pnpm.io/) e seguindo uma arquitetura desacoplada.

## Arquitetura e Stack Tecnológica

Aderimos estritamente a uma arquitetura desacoplada para garantir escalabilidade, manutenibilidade e separação de responsabilidades.

### Frontend (Client-Side SPA)

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Framework/UI:** [React](https://react.dev/) 
* **Build Tool:** [Vite](https://vitejs.dev/) 
* **Bibliotecas de UI:** [shadcn/ui](https://ui.shadcn.com/) e [Origin UI](https://origin-ui.com/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Roteamento:** [React Router DOM](https://reactrouter.com/en/main)

### Backend (Server-Side API)

* **Linguagem:** [C#](https://learn.microsoft.com/pt-br/dotnet/csharp/)
* **Framework:** [.NET](https://dotnet.microsoft.com/pt-br/)

### Banco de Dados (Data Layer)

* **SGBD:** [PostgreSQL](https://www.postgresql.org/)

## Como Começar

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### Pré-requisitos

1.  **Node.js**: Versão LTS (ex: 20.x).
2.  **pnpm**: Gerenciador de pacotes principal.
    * Instale com: `npm install -g pnpm`
3.  **(Futuro) .NET SDK**: Necessário para rodar o backend (ex: .NET 8).
4.  **(Futuro) PostgreSQL**: Um servidor de banco de dados rodando (localmente ou via Docker).

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/cesarkoprowski/academiny.git
    cd academiny
    ```

2.  Instale todas as dependências do workspace (a partir da raiz):
    ```bash
    pnpm install
    ```

### Executando o Ambiente de Desenvolvimento

#### 1. Frontend (Client)

Para iniciar o servidor de desenvolvimento do Vite (Frontend):

```bash
# Executa o script 'dev' do app 'client'
pnpm --filter client dev