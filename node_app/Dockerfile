# Use a imagem oficial do Node.js como base
FROM node:alpine

# Defina o diretório de trabalho no container
WORKDIR /usr/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do Node.js
RUN npm install

# Copie todo o código fonte da sua aplicação para o diretório de trabalho
COPY . .

# Instale o Nodemon globalmente
RUN npm install -g nodemon

# Exponha a porta em que sua aplicação Node.js está ouvindo
EXPOSE 3000

# Comando para iniciar a aplicação Node.js
CMD ["npm", "start"]