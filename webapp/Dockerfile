FROM node:20-alpine as builder

# Configurando pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copiando arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalando dependências
RUN pnpm install --frozen-lockfile

# Copiando código fonte
COPY . .

# Construindo a aplicação
RUN pnpm build

# Imagem de produção
FROM nginx:alpine

# Copiando a build do React para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiando configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expondo a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"] 