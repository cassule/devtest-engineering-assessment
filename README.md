# Job Finder Api

Este projeto é uma API construída com NestJS que inclui autenticação JWT para o Teste técnico da DevTest, utilizando MySQL como banco de dados. Abaixo estão as instruções para configurar e executar o projeto, tanto utilizando Docker quanto localmente.

## Pré-requisitos

- Node.js v16+
- npm v7+
- Docker (opcional)
- Docker Compose (opcional)
- MySQL

## Configuração

### Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário:

```bash
cp .env.example .env
```

## Executando o Projeto

### Com Docker

1. Construa e inicie os contêineres:

    ```bash
    docker-compose up --build
    ```

2. Acesse a aplicação em `http://localhost:3000`.

### Localmente

1. Instale as dependências:

    ```bash
    npm install
    ```

2. Inicie o banco de dados MySQL e configure a conexão no arquivo `.env`.

3. Execute as migrações e seeds:

    ```bash
    npm run start:seed
    ```

4. Inicie o servidor:

    ```bash
    npm run start:dev
    ```

5. Acesse a aplicação em `http://localhost:3000`.

## Seeds

Para rodar os seeds e popular o banco de dados, utilize o seguinte comando:

```bash
npm run start:seed
```

## Endpoints

### Autenticação

- **POST** `/api/auth/login`: Autenticação de usuário.
- **POST** `/api/auth/register`: Registro de novo usuário.
- **GET** `/api/auth/me`: Retorna o perfil do usuário autenticado.

### Usuários

- **GET** `/api/users`: Lista todos os usuários.
- **GET** `/api/users/:id`: Retorna detalhes de um usuário específico.

## Exemplo de Requisição

### Registro de Usuário

```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{
  "username": "exampleuser",
  "password": "strongpassword",
  "email": "user@example.com"
}'
```

### Login de Usuário

```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{
  "email": "user@example.com",
  "password": "strongpassword"
}'
```

### Obter Perfil do Usuário Autenticado

```bash
curl -H "Authorization: Bearer <your-jwt-token>" http://localhost:3000/api/auth/me
```

## Documentação da API

A documentação da API é gerada usando o Swagger e está disponível em:

```
http://localhost:3000/api
```


```