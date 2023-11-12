# Use a imagem oficial do Node.js como base
FROM node:18.0.0

# Defina o diretório de trabalho no container
WORKDIR /usr/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Copie todo o código fonte da sua aplicação para o diretório de trabalho
COPY . .

# Instale o Nodemon globalmente
RUN npm install -g nodemon

# Exponha a porta em que sua aplicação Node.js está ouvindo
EXPOSE 3000

# Comando para iniciar a aplicação Node.js
CMD ["sh", "-c", "npm install && nodemon -L index.js"]
