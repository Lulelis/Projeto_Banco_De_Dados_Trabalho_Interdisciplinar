# Executar o frontend Nós 3D

O frontend do Lovable fica em `app/` e usa React, TanStack Start e Vite. Para executar localmente, instale o Node.js 24 e o Bun 1.4.5. O Bun usa o arquivo `app/bun.lock` para instalar as versões testadas das dependências.

Na raiz do repositório, execute:

```sh
cd app
bun install --frozen-lockfile
npm run dev
```

Abra o endereço informado pelo Vite no terminal.

## Compilação e testes

Execute os comandos abaixo dentro de `app/`:

```sh
npm run build
npm test
npm run preview
```

A compilação gera os arquivos em `app/.output/`. O comando `npm run preview` serve a versão compilada localmente.

## Dados e imagens

O catálogo usa dados demonstrativos do frontend. Para executar a aplicação, basta instalar as dependências acima. O formulário prepara uma mensagem de orçamento para abrir no WhatsApp.

As imagens originais do catálogo e da página inicial são servidas a partir de `app/public/__l5e/assets-v1/`, nos caminhos referenciados pelos arquivos em `app/src/assets/`.
