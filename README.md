# ProjetoFinal_Java

* ## 📁 [Projeto_Final]
Projeto feito em JavaScript!

### Passo a passo para acesso ao projeto
Clone o repositório, entre na pasta e execute os comandos abaixo:

Crie o Arquivo .env
```sh
cp .env.example .env
```

Atualize as variáveis de ambiente do arquivo .env
```dosini
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

Suba os containers do projeto
```sh
docker compose up -d
```

Acesse o projeto através da porta local
```sh
localhost:3000
```
Para administrar o banco de dados, acesse o adminer
```sh
localhost:8080
```

