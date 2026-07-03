FROM node:20-alpine

WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala todas as dependências
RUN npm install

# Copia o restante do código da API
COPY . .

# Compila o projeto NestJS
RUN npm run build

# Expõe a porta padrão
EXPOSE 3000

# Comando para iniciar o servidor em produção
CMD ["node", "dist/main.js"]
