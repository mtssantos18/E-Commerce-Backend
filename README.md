# Aplicação Backend - Contact

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

---

## 2. Diagrama ER

[ Ir para o sumário](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](der.jpg)

---

## 3. Passo a passo para instalação:

### 3.1. Instalando Dependências

Após clonar o repositório, acesse a pasta do projeto Backend, e então execute o comando abaixo:

```bash
yarn
```

### 3.2. Variáveis de Ambiente

Após instalar as dependencias, você deverá criar um arquivo .env e configurá-lo com suas informações:

- Se preferir, você também pode copiar o arquivo .env.example e aterá-lo para .env

```
cp .env.example .env
```

```bash
DB_HOST=
DB_USER=
DB_PASSWORD=
DB=
SECRET_KEY=
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

[ Ir para o sumário](#tabela-de-conteúdos)

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

### 3.4. Rodando a aplicação

Após isso basta executar o comando abaixo para rodar a aplicação:

```bash
yarn dev
```

Prontinho, agora você pode seguir para pasta do Frontend.

---

## 4. Endpoints

## Endpoints Resumo

### 1. /users

O objeto User é definido como:

| Campo       | Tipo        | Descrição                       |
| ----------- | ----------- | ------------------------------- |
| id          | uuid        | Identificador único do usuário. |
| fullName    | string      | Nome completo do usuário.       |
| email       | string      | Email do usuário.               |
| cpf         | string      | Cpf do usuário.                 |
| cellPhone   | string      | Telefone celular do usuário.    |
| birthDate   | string      | Data de nascimento do usuário.  |
| description | string      | Descrição do usuário.           |
| isSeller    | string      | Tipo do usuário.                |
| addressId   | foreign key | Endereço do usuário.            |

O objeto Address é definido como:

| Campo      | Tipo   | Descrição                                   |
| ---------- | ------ | ------------------------------------------- |
| id         | uuid   | Identificador único do endereço do usuário. |
| street     | string | Nome da rua do usuário.                     |
| number     | string | Número da casa do usuário.                  |
| complement | string | Complemento da casa do usuário.             |
| zipCode    | string | CEP do usuário.                             |
| city       | string | Cidade do usuário.                          |
| state      | string | Estado do usuário.                          |

### Endpoints

| Método | Rota                   | Descrição                       | Autorizaçao |
| ------ | ---------------------- | ------------------------------- | ----------- |
| POST   | /users                 | Criação de um usuário.          |             |
| GET    | /users                 | Lista todos os usuários.        |             |
| GET    | /users/:userId         | Lista um usuário específico.    |             |
| PATCH  | /users/:userId         | Atualiza o usuário.             | X           |
| PATCH  | /users/address/:userId | Atualiza o endereço do usuário. | X           |
| DELETE | /users/:userId         | Deleta o usuário.               | X           |

### 1.1. **Criação de Usuário**

### `/users`

### Exemplo de Request:

```
POST /users
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "fullName": "Matheus da Silva Santos",
  "email": "matheus@mail.com",
  "cpf": "111.222.333-51",
  "cellPhone": "12 99103-4002",
  "birthDate": "1995-11-18",
  "description": "Oi eu sou Matheus vendedor",
  "isSeller": true,
  "password": "1234",
  "address": {
    "street": "Rua dale",
    "number": "1214",
    "complement": "casa",
    "zipCode": "12061-000",
    "city": "Taubaté",
    "state": "SP"
  }
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "fullName": "Matheus da Silva Santos",
  "email": "matheus@mail.com",
  "cpf": "111.222.333-51",
  "cellPhone": "12 99103-4002",
  "birthDate": "1995-11-18",
  "description": "Oi eu sou Matheus vendedor",
  "isSeller": true,
  "address": {
    "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
    "street": "Rua dale",
    "number": "1214",
    "complement": "casa",
    "zipCode": "12061-000",
    "city": "Taubaté",
    "state": "SP"
  },
  "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                       |
| --------------- | ----------------------------------------------- |
| 400 Bad Request | State must have 2 letters.                      |
| 400 Bad Request | Full name cannot be bigger than 128 characters. |
| 400 Bad Request | Email cannot be bigger than 128 characters.     |
| 400 Bad Request | This CPF already exist.                         |
| 400 Bad Request | This email already exist.                       |

---

### 1.2. **Listando Usuários**

### `/users`

### Exemplo de Request:

```
GET /users
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
    "fullName": "Matheus Santos",
    "email": "matheus@mail.com",
    "cpf": "111.222.333-51",
    "cellPhone": "12 3445-4002",
    "birthDate": "1995-11-18T02:00:00.000Z",
    "description": "Oi eu sou Teteu vendedor Atualizado",
    "isSeller": true,
    "vehicle": [],
    "address": {
      "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
      "street": "Rua deixe",
      "number": "1214",
      "complement": "casa",
      "zipCode": "12061-000",
      "city": "Taubatexas",
      "state": "SP"
    }
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Usuário por ID**

### `/users/:userId`

### Exemplo de Request:

```
GET /users/:userId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                       |
| --------- | ---- | ------------------------------- |
| userId    | uuid | Identificador único do usuário. |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
  "fullName": "Matheus Santos",
  "email": "matheus@mail.com",
  "cpf": "111.222.333-51",
  "cellPhone": "12 3445-4002",
  "birthDate": "1995-11-18T02:00:00.000Z",
  "description": "Oi eu sou Teteu vendedor Atualizado",
  "isSeller": true,
  "vehicle": [],
  "address": {
    "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
    "street": "Rua deixe",
    "number": "1214",
    "complement": "casa",
    "zipCode": "12061-000",
    "city": "Taubatexas",
    "state": "SP"
  }
}
```

### Possíveis Erros:

| Código do Erro  | Descrição          |
| --------------- | ------------------ |
| 400 Bad Request | Invalid id format. |
| 404 Not Found   | User not found.    |

---

### 1.4. **Atualizando um usuário**

### `/users/:userId`

### Exemplo de Request:

```
PATCH /users/:userId
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                       |
| --------- | ---- | ------------------------------- |
| userId    | uuid | Identificador único do usuário. |

### Corpo da Requisição:

```json
{
  "fullName": "Matheus Santos",
  "cellPhone": "12 3445-4002",
  "description": "Oi eu sou Teteu vendedor Atualizado",
  "isSeller": false
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
  "fullName": "Matheus Santos",
  "email": "matheus@mail.com",
  "cpf": "111.222.333-51",
  "cellPhone": "12 3445-4002",
  "birthDate": "1995-11-18T02:00:00.000Z",
  "description": "Oi eu sou Teteu vendedor Atualizado",
  "isSeller": true,
  "address": {
    "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
    "street": "Rua deixe",
    "number": "1214",
    "complement": "casa",
    "zipCode": "12061-000",
    "city": "Taubatexas",
    "state": "SP"
  }
}
```

---

### Possíveis Erros:

| Código do Erro  | Descrição                           |
| --------------- | ----------------------------------- |
| 400 Bad Request | Invalid id format.                  |
| 404 Not Found   | User not found.                     |
| 400 Bad Request | This CPF already exist.             |
| 400 Bad Request | This email already exist.           |
| 400 Bad Request | You cannot update address property. |
| 400 Bad Request | Enter a different password.         |

---

### 1.5. **Atualizando Endereço de um usuário**

### `/users/address/:userId`

### Exemplo de Request:

```
PATCH /users/:userId
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                       |
| --------- | ---- | ------------------------------- |
| userId    | uuid | Identificador único do usuário. |

### Corpo da Requisição:

```json
{
  "street": "Rua deixe",
  "number": "1214",
  "complement": "casa",
  "zipCode": "12061-000",
  "city": "Taubatexas",
  "state": "SP"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
  "fullName": "Matheus Santos",
  "email": "matheus@mail.com",
  "cpf": "111.222.333-51",
  "cellPhone": "12 3445-4002",
  "birthDate": "1995-11-18T02:00:00.000Z",
  "description": "Oi eu sou Teteu vendedor Atualizado",
  "isSeller": true,
  "address": {
    "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
    "street": "Rua deixe",
    "number": "1214",
    "complement": "casa",
    "zipCode": "12061-000",
    "city": "Taubatexas",
    "state": "SP"
  }
}
```

---

### Possíveis Erros:

| Código do Erro  | Descrição          |
| --------------- | ------------------ |
| 400 Bad Request | Invalid id format. |
| 404 Not Found   | User not found.    |

---

### 1.6. **Deletar usuário por ID**

### `/users/:userId`

### Exemplo de Request:

```
DELETE /users/:userId
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                       |
| --------- | ---- | ------------------------------- |
| userId    | uuid | Identificador único do usuário. |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No Content
```

```json
No body returned for response
```

### Possíveis Erros:

| Código do Erro  | Descrição          |
| --------------- | ------------------ |
| 400 Bad Request | Invalid id format. |
| 404 Not Found   | User not found.    |

---

### 2. /vehicles

O objeto Vehicle é definido como:

| Campo         | Tipo     | Descrição                        |
| ------------- | -------- | -------------------------------- |
| id            | uuid     | Identificador único do veículo.  |
| name          | string   | Nome do veículo.                 |
| description   | string   | Descrição sobre o veículo.       |
| km            | string   | Quilometragem rodada do veículo. |
| year          | string   | Ano de fabricação do veículo.    |
| coverImage    | string   | Imagem de capa do veículo.       |
| price         | string   | Preço do veículo.                |
| type          | string   | Tipo do veículo.                 |
| vehicleImages | string[] | Galeria de fotos do veículo.     |
| createdAt     | Date     | Data de registro do veículo.     |
| updatedAt     | string   | Data de atualização do veículo.  |

### Endpoints

| Método | Rota                 | Descrição                    | Autorizaçao | isSeller | Owner |
| ------ | -------------------- | ---------------------------- | ----------- | -------- | ----- |
| POST   | /vehicles            | Criação de um veículo.       | X           | x        |       |
| GET    | /vehicles            | Lista todos os veículos.     |             |          |       |
| GET    | /vehicles/:vehicleId | Lista um veículo específico. |             |          |       |
| PATCH  | /vehicles/:vehicleId | Atualiza o veículo.          | X           | x        | x     |
| DELETE | /vehicles/:vehicleId | Deleta o veículo.            | X           | x        | x     |

### 2.1. **Criação de Veículo**

### `/vehicles`

### Exemplo de Request:

```
POST /vehicles
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Ferrari 458 itália",
  "description": "carro muito top",
  "km": 3000.5,
  "year": 2015,
  "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ferrari_458_goodwood_festival_of_speed_2010.jpg/1200px-Ferrari_458_goodwood_festival_of_speed_2010.jpg",
  "price": 25000,
  "type": "car",
  "vehiclePhotos": [
    "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg",
    "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg",
    "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg",
    "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg",
    "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
  ]
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "58200e0c-b365-44e3-96c9-fce26c4427ed",
  "name": "Ferrari 458 itália",
  "description": "carro muito top",
  "km": "3000.50",
  "year": 2015,
  "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ferrari_458_goodwood_festival_of_speed_2010.jpg/1200px-Ferrari_458_goodwood_festival_of_speed_2010.jpg",
  "price": "25000.00",
  "createdAt": "2022-12-20T20:24:08.024Z",
  "updatedAt": "2022-12-20T20:24:08.024Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                         |
| --------------- | ------------------------------------------------- |
| 400 Bad Request | You must add at least one image to your vehicle.  |
| 400 Bad Request | You can't add more than 6 images to your vehicle. |

---

### 2.2. **Listando Veículos**

### `/vehicles`

### Exemplo de Request:

```
GET /vehicles
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "b148f5cd-cb06-40ca-aeec-8920f5ec93c9",
    "name": "Ferrari 458 itália",
    "description": "carro muito top",
    "km": "3000.50",
    "year": 2015,
    "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ferrari_458_goodwood_festival_of_speed_2010.jpg/1200px-Ferrari_458_goodwood_festival_of_speed_2010.jpg",
    "price": "25000.00",
    "type": "car",
    "createdAt": "2023-01-04T12:09:41.148Z",
    "updatedAt": "2023-01-04T12:09:41.148Z",
    "user": {
      "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
      "fullName": "Matheus Santos",
      "email": "matheus@mail.com",
      "cpf": "111.222.333-51",
      "cellPhone": "12 3445-4002",
      "birthDate": "1995-11-18T02:00:00.000Z",
      "description": "Oi eu sou Teteu vendedor Atualizado",
      "isSeller": true,
      "password": "$2a$10$6wmgUv5XlOOH5om5n5DVuOe6IZY6zYUF.8OvgH5yxlKvOdD5ANcVG",
      "address": {
        "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
        "street": "Rua deixe",
        "number": "1214",
        "complement": "casa",
        "zipCode": "12061-000",
        "city": "Taubatexas",
        "state": "SP"
      }
    },
    "vehicleImages": [
      {
        "id": "e28c7d70-41e0-4617-a52e-b437f86b2f56",
        "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
      },
      {
        "id": "ded6fafa-455c-4b5c-89dc-e86a9494c581",
        "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
      },
      {
        "id": "da1186cc-bfa1-42bf-8acc-caa66a698785",
        "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
      },
      {
        "id": "dc9f1a05-afb6-4d86-bb42-d51f173f9d8c",
        "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
      },
      {
        "id": "d717b782-d33a-42f1-b0db-e6aaa9709fa0",
        "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
      }
    ]
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.3. **Listar Veículo por ID**

### `/vehicles/:vehicleId`

### Exemplo de Request:

```
GET /vehicles/:vehicleId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                       |
| --------- | ---- | ------------------------------- |
| vehicleId | uuid | Identificador único do veículo. |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "b2386146-175a-4ae2-86a9-51272b4c1af0",
  "name": "Ferrari 458 itália",
  "description": "carro muito top, que abre as portas pra cima!",
  "km": "12500.40",
  "year": 2021,
  "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ferrari_458_goodwood_festival_of_speed_2010.jpg/1200px-Ferrari_458_goodwood_festival_of_speed_2010.jpg",
  "price": "524000.00",
  "type": "car",
  "createdAt": "2023-01-04T12:11:39.560Z",
  "updatedAt": "2023-01-04T12:11:41.478Z",
  "user": {
    "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
    "fullName": "Matheus Santos",
    "email": "matheus@mail.com",
    "cpf": "111.222.333-51",
    "cellPhone": "12 3445-4002",
    "birthDate": "1995-11-18T02:00:00.000Z",
    "description": "Oi eu sou Teteu vendedor Atualizado",
    "isSeller": true,
    "password": "$2a$10$6wmgUv5XlOOH5om5n5DVuOe6IZY6zYUF.8OvgH5yxlKvOdD5ANcVG",
    "address": {
      "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
      "street": "Rua deixe",
      "number": "1214",
      "complement": "casa",
      "zipCode": "12061-000",
      "city": "Taubatexas",
      "state": "SP"
    }
  },
  "vehicleImages": [
    {
      "id": "5e53e269-87f9-4e05-8d95-e5a46bc18f6d",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    },
    {
      "id": "8b8b5b01-6e11-4719-a76d-b1b923c4b84e",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    },
    {
      "id": "dc22be8e-0aba-4a72-8b1b-ed02e655f73d",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    },
    {
      "id": "d6fd9c69-8010-458c-862d-644ea5004078",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    },
    {
      "id": "8aa6d0c5-c16b-4887-9de4-dbcfc4681785",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro  | Descrição          |
| --------------- | ------------------ |
| 400 Bad Request | Invalid id format. |
| 404 Not Found   | Vehicle not found. |

---

---

### 2.4. **Atualizando um carro**

### `/vehicles/:vehicleId`

### Exemplo de Request:

```
PATCH /vehicles/:vehicleId
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                       |
| --------- | ---- | ------------------------------- |
| vehicleId | uuid | Identificador único do veículo. |

### Corpo da Requisição:

```json
{
  "description": "carro muito top, que abre as portas pra cima!",
  "km": 12500.4,
  "year": 2021,
  "price": 524000
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "b2386146-175a-4ae2-86a9-51272b4c1af0",
  "name": "Ferrari 458 itália",
  "description": "carro muito top, que abre as portas pra cima!",
  "km": "12500.40",
  "year": 2021,
  "coverImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ferrari_458_goodwood_festival_of_speed_2010.jpg/1200px-Ferrari_458_goodwood_festival_of_speed_2010.jpg",
  "price": "524000.00",
  "type": "car",
  "createdAt": "2023-01-04T12:11:39.560Z",
  "updatedAt": "2023-01-04T12:11:41.478Z",
  "vehicleImages": [
    {
      "id": "5e53e269-87f9-4e05-8d95-e5a46bc18f6d",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    },
    {
      "id": "8b8b5b01-6e11-4719-a76d-b1b923c4b84e",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    },
    {
      "id": "dc22be8e-0aba-4a72-8b1b-ed02e655f73d",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    },
    {
      "id": "d6fd9c69-8010-458c-862d-644ea5004078",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    },
    {
      "id": "8aa6d0c5-c16b-4887-9de4-dbcfc4681785",
      "url": "https://autolivraria.com.br/bc/wp-content/uploads/2014/10/Ferrari-458-Italia-2009-02.jpg"
    }
  ]
}
```

---

### Possíveis Erros:

| Código do Erro  | Descrição                                         |
| --------------- | ------------------------------------------------- |
| 400 Bad Request | Invalid id format.                                |
| 404 Not Found   | Vehicle not found.                                |
| 400 Bad Request | You must add at least one image to your vehicle.  |
| 400 Bad Request | You can't add more than 6 images to your vehicle. |

---

### 2.5. **Deletar veículo por ID**

### `/vehicles/:vehicleId`

### Exemplo de Request:

```
DELETE /vehicles/:vehicleId
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                       |
| --------- | ---- | ------------------------------- |
| vehicleId | uuid | Identificador único do veículo. |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No Content
```

```json
No body returned for response
```

### Possíveis Erros:

| Código do Erro  | Descrição          |
| --------------- | ------------------ |
| 400 Bad Request | Invalid id format. |
| 404 Not Found   | Car not found.     |

---

### 3. /login

Rota destinada para fazer a autenticação de um usuário.

### Endpoints

| Método | Rota   | Descrição                   |
| ------ | ------ | --------------------------- |
| POST   | /login | Autenticação de um usuário. |

### 3.1. **Login de Usuário**

### `/login`

### Exemplo de Request:

```
POST /login
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "matheus@mail.com",
  "password": "1234"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "userId": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
  "isSeller": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6Ik1hdGhldXMgU2FudG9zIiwiZW1haWwiOiJtYXRoZXVzQG1haWwuY29tIiwiY3BmIjoiMTExLjIyMi4zMzMtNTEiLCJpc1NlbGxlciI6dHJ1ZSwiaWF0IjoxNjcyOTM5MDE1LCJleHAiOjE2NzI5NTcwMTUsInN1YiI6IjFjZmVlZGU5LWMxOGQtNDVhOS1hN2MyLTNhNTA5NWZkZDc4NCJ9.VO0gVFVaSbscdf5IrcNrV97ZusYU56bk1dDSz4Hnl6w"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                  |
| -------------- | -------------------------- |
| 403 Forbidden  | Invalid email or password. |

---

### 4. /comments

O objeto Comment é definido como:

| Campo     | Tipo        | Descrição                          |
| --------- | ----------- | ---------------------------------- |
| id        | uuid        | Identificador único do comentário. |
| text      | string      | Comentário do usuário.             |
| userId    | foreign key | Usuário dono do comentário.        |
| vehicleId | foreign key | Veículo comentado pelo usuário.    |
| createdAt | Date        | Data de registro do comentário.    |
| updatedAt | string      | Data de atualização do comentário. |

### Endpoints

| Método | Rota                 | Descrição                       | Autorizaçao | Owner |
| ------ | -------------------- | ------------------------------- | ----------- | ----- |
| POST   | /comments            | Criação de um comentário.       | X           |       |
| GET    | /comments            | Lista todos os comentários.     |             |       |
| GET    | /comments/:commentId | Lista um comentário específico. |             |       |
| PATCH  | /comments/:commentId | Atualiza o comentário.          | X           | x     |
| DELETE | /comments/:commentId | Deleta o comentário.            | X           | x     |

### 4.1. **Criação de Comentário**

### `/comments`

### Exemplo de Request:

```
POST /comments
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "text": "Que carro bonito, e aparentemente está bem conservado!",
  "vehicleId": "247db553-ccd4-448d-889d-d8b794c32b48"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "text": "Que carro bonito, e aparentemente está bem conservado!",
  "user": {
    "id": "d353e5eb-fb93-4d27-90ce-5cc8df1f6bf5",
    "fullName": "Rafael Santos",
    "email": "rafael@mail.com",
    "cpf": "121.234.323-60",
    "cellPhone": "15 99120-1020",
    "birthDate": "1998-08-24T03:00:00.000Z",
    "description": "Comprador alegre",
    "isSeller": false,
    "address": {
      "id": "d3d80bd0-79b2-4c24-a6a9-0b4f382fcb4d",
      "street": "Rua Dois",
      "number": "2",
      "complement": "casa",
      "zipCode": "12061000",
      "city": "Taubaté",
      "state": "SP"
    }
  },
  "vehicle": {
    "id": "247db553-ccd4-448d-889d-d8b794c32b48",
    "name": "Honda Civic 2020",
    "description": "Carro 4p Flex 1.8",
    "km": "38250.00",
    "year": 2020,
    "coverImage": "https://autoentusiastas.com.br/ae/wp-content/uploads/2019/08/Civic-EXL-2020-15-abre-1140x720.jpg",
    "price": "120000.00",
    "type": "car",
    "createdAt": "2023-01-06T15:19:11.822Z",
    "updatedAt": "2023-01-06T15:23:09.833Z",
    "vehicleImages": [
      {
        "id": "09c42332-566e-4417-9afa-d09912282b1f",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "c4ba8682-1037-4d6b-82a6-5886c3630279",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "5fdcdf01-c77d-4fb3-a144-36c72ae7ec6e",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "36452ebd-2806-4825-b157-eb4893480b4d",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "6047c55a-6b69-4c96-b136-038a7b5dbd2c",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      }
    ]
  },
  "id": "004a69bf-a799-4920-86f6-c549cacc7958",
  "createdAt": "2023-01-06T18:28:42.664Z",
  "updatedAt": "2023-01-06T18:28:42.664Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                  |
| --------------- | -------------------------- |
| 400 Bad Request | You must create a text.    |
| 400 Bad Request | You must send vehicleId.   |
| 400 Bad Request | Vehicle invalid id format. |
| 404 Not Found   | User not found.            |
| 404 Not Found   | Vehicle not found.         |

---

### 4.2. **Listando Comentários**

### `/comments`

### Exemplo de Request:

```
GET /comments
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "c15ceb28-6f3a-468a-9890-67b5ef36553e",
    "text": "Que carro bonito, e aparentemente está bem conservado!",
    "createdAt": "2023-01-06T19:52:40.781Z",
    "updatedAt": "2023-01-06T19:52:40.781Z",
    "vehicle": {
      "id": "247db553-ccd4-448d-889d-d8b794c32b48",
      "name": "Honda Civic 2020",
      "description": "Carro 4p Flex 1.8",
      "km": "38250.00",
      "year": 2020,
      "coverImage": "https://autoentusiastas.com.br/ae/wp-content/uploads/2019/08/Civic-EXL-2020-15-abre-1140x720.jpg",
      "price": "120000.00",
      "type": "car",
      "createdAt": "2023-01-06T15:19:11.822Z",
      "updatedAt": "2023-01-06T15:23:09.833Z",
      "user": {
        "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
        "fullName": "Matheus Santos",
        "email": "matheus@mail.com",
        "cpf": "111.222.333-51",
        "cellPhone": "12 3445-4002",
        "birthDate": "1995-11-18T02:00:00.000Z",
        "description": "Oi eu sou Teteu vendedor Atualizado 2",
        "isSeller": true,
        "address": {
          "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
          "street": "Rua deixe",
          "number": "1214",
          "complement": "casa",
          "zipCode": "12061-000",
          "city": "Taubatexas",
          "state": "SP"
        }
      },
      "vehicleImages": [
        {
          "id": "6047c55a-6b69-4c96-b136-038a7b5dbd2c",
          "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
        },
        {
          "id": "36452ebd-2806-4825-b157-eb4893480b4d",
          "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
        },
        {
          "id": "5fdcdf01-c77d-4fb3-a144-36c72ae7ec6e",
          "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
        },
        {
          "id": "c4ba8682-1037-4d6b-82a6-5886c3630279",
          "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
        },
        {
          "id": "09c42332-566e-4417-9afa-d09912282b1f",
          "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
        }
      ]
    },
    "user": {
      "id": "d353e5eb-fb93-4d27-90ce-5cc8df1f6bf5",
      "fullName": "Rafael Santos",
      "email": "rafael@mail.com",
      "cpf": "121.234.323-60",
      "cellPhone": "15 99120-1020",
      "birthDate": "1998-08-24T03:00:00.000Z",
      "description": "Comprador alegere",
      "isSeller": false,
      "address": {
        "id": "d3d80bd0-79b2-4c24-a6a9-0b4f382fcb4d",
        "street": "Rua Dois",
        "number": "2",
        "complement": "casa",
        "zipCode": "12061000",
        "city": "Taubaté",
        "state": "SP"
      }
    }
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 4.3. **Listar Comentário por ID**

### `/comments/:commentId`

### Exemplo de Request:

```
GET /comments/:commentId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                          |
| --------- | ---- | ---------------------------------- |
| commentId | uuid | Identificador único do comentário. |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "c15ceb28-6f3a-468a-9890-67b5ef36553e",
  "text": "Que carro bonito, e aparentemente está bem conservado!",
  "createdAt": "2023-01-06T19:52:40.781Z",
  "updatedAt": "2023-01-06T19:52:40.781Z",
  "vehicle": {
    "id": "247db553-ccd4-448d-889d-d8b794c32b48",
    "name": "Honda Civic 2020",
    "description": "Carro 4p Flex 1.8",
    "km": "38250.00",
    "year": 2020,
    "coverImage": "https://autoentusiastas.com.br/ae/wp-content/uploads/2019/08/Civic-EXL-2020-15-abre-1140x720.jpg",
    "price": "120000.00",
    "type": "car",
    "createdAt": "2023-01-06T15:19:11.822Z",
    "updatedAt": "2023-01-06T15:23:09.833Z",
    "user": {
      "id": "1cfeede9-c18d-45a9-a7c2-3a5095fdd784",
      "fullName": "Matheus Santos",
      "email": "matheus@mail.com",
      "cpf": "111.222.333-51",
      "cellPhone": "12 3445-4002",
      "birthDate": "1995-11-18T02:00:00.000Z",
      "description": "Oi eu sou Teteu vendedor Atualizado 2",
      "isSeller": true,
      "address": {
        "id": "fe715ee2-12af-4823-b9a9-397c024d141a",
        "street": "Rua deixe",
        "number": "1214",
        "complement": "casa",
        "zipCode": "12061-000",
        "city": "Taubatexas",
        "state": "SP"
      }
    },
    "vehicleImages": [
      {
        "id": "09c42332-566e-4417-9afa-d09912282b1f",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "c4ba8682-1037-4d6b-82a6-5886c3630279",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "5fdcdf01-c77d-4fb3-a144-36c72ae7ec6e",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "36452ebd-2806-4825-b157-eb4893480b4d",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "6047c55a-6b69-4c96-b136-038a7b5dbd2c",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      }
    ]
  },
  "user": {
    "id": "d353e5eb-fb93-4d27-90ce-5cc8df1f6bf5",
    "fullName": "Rafael Santos",
    "email": "rafael@mail.com",
    "cpf": "121.234.323-60",
    "cellPhone": "15 99120-1020",
    "birthDate": "1998-08-24T03:00:00.000Z",
    "description": "Comprador alegere",
    "isSeller": false,
    "address": {
      "id": "d3d80bd0-79b2-4c24-a6a9-0b4f382fcb4d",
      "street": "Rua Dois",
      "number": "2",
      "complement": "casa",
      "zipCode": "12061000",
      "city": "Taubaté",
      "state": "SP"
    }
  }
}
```

### Possíveis Erros:

| Código do Erro  | Descrição          |
| --------------- | ------------------ |
| 400 Bad Request | Invalid id format. |
| 404 Not Found   | Comment not found. |

---

---

### 4.4. **Atualizando um comentário**

### `/comments/:commentId`

### Exemplo de Request:

```
PATCH /comments/:commentId
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                          |
| --------- | ---- | ---------------------------------- |
| commentId | uuid | Identificador único do comentário. |

### Corpo da Requisição:

```json
{
  "text": "Que carro bonito, comentário atualizado de novo."
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "c15ceb28-6f3a-468a-9890-67b5ef36553e",
  "text": "Que carro bonito, comentário atualizado de novo.",
  "createdAt": "2023-01-06T19:52:40.781Z",
  "updatedAt": "2023-01-06T19:58:17.756Z",
  "user": {
    "id": "d353e5eb-fb93-4d27-90ce-5cc8df1f6bf5",
    "fullName": "Rafael Santos",
    "email": "rafael@mail.com",
    "cpf": "121.234.323-60",
    "cellPhone": "15 99120-1020",
    "birthDate": "1998-08-24T03:00:00.000Z",
    "description": "Comprador alegere",
    "isSeller": false,
    "address": {
      "id": "d3d80bd0-79b2-4c24-a6a9-0b4f382fcb4d",
      "street": "Rua Dois",
      "number": "2",
      "complement": "casa",
      "zipCode": "12061000",
      "city": "Taubaté",
      "state": "SP"
    }
  },
  "vehicle": {
    "id": "247db553-ccd4-448d-889d-d8b794c32b48",
    "name": "Honda Civic 2020",
    "description": "Carro 4p Flex 1.8",
    "km": "38250.00",
    "year": 2020,
    "coverImage": "https://autoentusiastas.com.br/ae/wp-content/uploads/2019/08/Civic-EXL-2020-15-abre-1140x720.jpg",
    "price": "120000.00",
    "type": "car",
    "createdAt": "2023-01-06T15:19:11.822Z",
    "updatedAt": "2023-01-06T15:23:09.833Z",
    "vehicleImages": [
      {
        "id": "09c42332-566e-4417-9afa-d09912282b1f",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "c4ba8682-1037-4d6b-82a6-5886c3630279",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "5fdcdf01-c77d-4fb3-a144-36c72ae7ec6e",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "36452ebd-2806-4825-b157-eb4893480b4d",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      },
      {
        "id": "6047c55a-6b69-4c96-b136-038a7b5dbd2c",
        "url": "https://www.automaistv.com.br/wp-content/uploads/2019/08/4-2.jpg"
      }
    ]
  }
}
```

---

### Possíveis Erros:

| Código do Erro   | Descrição                                        |
| ---------------- | ------------------------------------------------ |
| 400 Bad Request  | Invalid id format.                               |
| 400 Bad Request  | You cannot update property vehicle from comment. |
| 404 Not Found    | Comment not found.                               |
| 401 Unauthorized | You must be comment owner to access this.        |

---

### 4.5. **Deletar comentário por ID**

### `/comments/:commentId`

### Exemplo de Request:

```
DELETE /comments/:commentId
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                          |
| --------- | ---- | ---------------------------------- |
| commentId | uuid | Identificador único do comentário. |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No Content
```

```json
No body returned for response
```

### Possíveis Erros:

| Código do Erro   | Descrição                                 |
| ---------------- | ----------------------------------------- |
| 400 Bad Request  | Invalid id format.                        |
| 404 Not Found    | Comment not found.                        |
| 401 Unauthorized | You must be comment owner to access this. |
