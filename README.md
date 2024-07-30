# Pesquisas de Opinião

## Para que serve o sistema?

É um sistema simples para realizar pesquisas de opinião em geral. Através dele você pode:
  - cadastrar os usuários (Administrador, Agente (Entrevistador) e Entrevistado);
  - cadastrar e registrar as pesquisas;
  - disponibiza um dashboard onde usuários Administradores poderão acompanhar as estatísticas do sistema, detalhando todas as pesquisas, com suas perguntas e respostas.

## Tecnologias Utilizadas no sistema

Esse sistema é uma SPA desenvolvida em vuejs (utilizando o Nuxt 3 e o vuetify), que consome uma api PHP, que utiliza o framework Laravel (repositório apipesquisas)

## Setup

Instale suas dependências:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Inicie a aplicação em ambiente de desenvolvimento no endereço `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

Renomeie o arquivo `.env.example` para `.env`, edite-o e informe o caminho da API, como por exemplo `http://localhost:8000/api/`

## Production

Gerando os arquivos para colocar em produção:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```
