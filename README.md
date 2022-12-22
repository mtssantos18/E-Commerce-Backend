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

### 1. /cars

O objeto User é definido como:

| Campo       | Tipo     | Descrição                      |
| ----------- | -------- | ------------------------------ |
| id          | uuid     | Identificador único do carro.  |
| name        | string   | Nome do carro.                 |
| description | string   | Descrição sobre o carro.       |
| km          | string   | Quilometragem rodada do carro. |
| year        | string   | Ano de fabricação do carro.    |
| coverImage  | string   | Imagem de capa do carro.       |
| price       | string   | Preço do carro.                |
| carImages   | string[] | Galeria de fotos do carro.     |
| createdAt   | Date     | Data de registro do carro.     |
| updatedAt   | string   | Data de atualização do carro.  |

### Endpoints

| Método | Rota         | Descrição                  |
| ------ | ------------ | -------------------------- |
| POST   | /cars        | Criação de um carro.       |
| GET    | /cars        | Lista todos os carros.     |
| GET    | /cars/:carId | Lista um carro específico. |
| PATCH  | /cars/:carId | Atualiza o carro.          |
| DELETE | /cars/:carId | Deleta o carro.            |

### 1.1. **Criação de Carro**

### `/cars`

### Exemplo de Request:

```
POST /cars
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
  "carPhotos": [
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

| Código do Erro  | Descrição                                     |
| --------------- | --------------------------------------------- |
| 400 Bad Request | You must add at least one image to your car.  |
| 400 Bad Request | You can't add more than 6 images to your car. |

---

### 1.2. **Listando Carros**

### `/cars`

### Exemplo de Request:

```
GET /cars
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
    "id": "777e060f-0398-42e8-a57e-c2a16bfc1599",
    "name": "bmw i8",
    "description": "carro muito top, que abre as portas pra cima!",
    "km": "12500.40",
    "year": 2021,
    "coverImage": "https://image.webmotors.com.br/_fotos/AnuncioUsados/gigante/2022/202211/20221125/BMW-I8-1.5-12V-HYBRID-EDRIVE-AUTOMATICO-wmimagem15411192321.jpg",
    "price": "524000.00",
    "createdAt": "2022-12-15T17:46:32.339Z",
    "updatedAt": "2022-12-15T18:53:07.508Z",
    "carImages": [
      {
        "id": "324aad37-7139-4c02-8533-cc4c628bcef8",
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsuNF04Y9WYJ-oVwNCUtnWE2v3tLcXqYBQheHbRfRFmw&s"
      },
      {
        "id": "3b776aed-09d2-446c-a8f7-9cd5701adfbf",
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPK59Sb-B8d28e5Zj97NJ-aJraIxKN1qjyqwSnJFR1EQ&s"
      }
    ]
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Carro por ID**

### `/cars/:carId`

### Exemplo de Request:

```
GET /cars/:carId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                     |
| --------- | ---- | ----------------------------- |
| carId     | uuid | Identificador único do carro. |

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
  "id": "777e060f-0398-42e8-a57e-c2a16bfc1599",
  "name": "bmw i8",
  "description": "carro muito top, que abre as portas pra cima!",
  "km": "12500.40",
  "year": 2021,
  "coverImage": "https://image.webmotors.com.br/_fotos/AnuncioUsados/gigante/2022/202211/20221125/BMW-I8-1.5-12V-HYBRID-EDRIVE-AUTOMATICO-wmimagem15411192321.jpg",
  "price": "524000.00",
  "createdAt": "2022-12-15T17:46:32.339Z",
  "updatedAt": "2022-12-15T18:53:07.508Z",
  "carImages": [
    {
      "id": "324aad37-7139-4c02-8533-cc4c628bcef8",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsuNF04Y9WYJ-oVwNCUtnWE2v3tLcXqYBQheHbRfRFmw&s"
    },
    {
      "id": "3b776aed-09d2-446c-a8f7-9cd5701adfbf",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPK59Sb-B8d28e5Zj97NJ-aJraIxKN1qjyqwSnJFR1EQ&s"
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro  | Descrição          |
| --------------- | ------------------ |
| 400 Bad Request | Invalid id format. |
| 404 Not Found   | Car not found.     |

---

---

### 1.4. **Atualizando um carro**

### `/cars/:carId`

### Exemplo de Request:

```
PATCH /cars/:carId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                     |
| --------- | ---- | ----------------------------- |
| carId     | uuid | Identificador único do carro. |

### Corpo da Requisição:

```json
{
  "description": "carro muito top, que abre as portas pra cima!",
  "km": 12500.4,
  "year": 2021,
  "price": 524000,
  "carPhotos": [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsuNF04Y9WYJ-oVwNCUtnWE2v3tLcXqYBQheHbRfRFmw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPK59Sb-B8d28e5Zj97NJ-aJraIxKN1qjyqwSnJFR1EQ&s"
  ]
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "777e060f-0398-42e8-a57e-c2a16bfc1599",
  "name": "bmw i8",
  "description": "carro muito top, que abre as portas pra cima!",
  "km": "12500.40",
  "year": 2021,
  "coverImage": "https://image.webmotors.com.br/_fotos/AnuncioUsados/gigante/2022/202211/20221125/BMW-I8-1.5-12V-HYBRID-EDRIVE-AUTOMATICO-wmimagem15411192321.jpg",
  "price": "524000.00",
  "createdAt": "2022-12-15T17:46:32.339Z",
  "updatedAt": "2022-12-15T18:53:07.508Z",
  "carImages": []
}
```

---

### Possíveis Erros:

| Código do Erro  | Descrição                                     |
| --------------- | --------------------------------------------- |
| 400 Bad Request | Invalid id format.                            |
| 404 Not Found   | Car not found.                                |
| 400 Bad Request | You must add at least one image to your car.  |
| 400 Bad Request | You can't add more than 6 images to your car. |

---

### 1.5. **Deletar carro por ID**

### `/cars/:carId`

### Exemplo de Request:

```
DELETE /cars/:carId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo | Descrição                     |
| --------- | ---- | ----------------------------- |
| carId     | uuid | Identificador único do carro. |

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

------------------------ AAQQUUII --------------------------------------------------------

### 2. /motorcycles

O objeto User é definido como:

| Campo            | Tipo     | Descrição                     |
| ---------------- | -------- | ----------------------------- |
| id               | uuid     | Identificador único da moto.  |
| name             | string   | Nome da moto.                 |
| description      | string   | Descrição sobre a moto.       |
| km               | string   | Quilometragem rodada da moto. |
| year             | string   | Ano de fabricação da moto.    |
| coverImage       | string   | Imagem de capa da moto.       |
| price            | string   | Preço da moto.                |
| motorcycleImages | string[] | Galeria de fotos da moto.     |
| createdAt        | Date     | Data de registro da moto.     |
| updatedAt        | string   | Data de atualização da moto.  |

### Endpoints

| Método | Rota                       | Descrição                  |
| ------ | -------------------------- | -------------------------- |
| POST   | /motorcycles               | Criação de uma moto.       |
| GET    | /motorcycles               | Lista todos as motos.      |
| GET    | /motorcycles/:motorcycleId | Lista uma moto específica. |
| PATCH  | /motorcycles/:motorcycleId | Atualiza a moto.           |
| DELETE | /motorcycles/:motorcycleId | Deleta a moto.             |

### 1.1. **Criação de Moto**

### `/motorcycles`

### Exemplo de Request:

```
POST /motorcycles
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "fazer 300",
  "description": "a braba",
  "km": 15000.5,
  "year": 2016,
  "coverImage": "https://storage.googleapis.com/images-homolog-moto.usadosbr.com/img/2017/11/10/img123467-1510347023-v653x354.jpg",
  "price": 22000,
  "motorcyclePhotos": [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBiWz8oTMvICQcvP6mROzHD9w4tF7giOzbuicvPQB9jjonQf-U3GC5LPWANeCE7qT0yA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBiWz8oTMvICQcvP6mROzHD9w4tF7giOzbuicvPQB9jjonQf-U3GC5LPWANeCE7qT0yA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBiWz8oTMvICQcvP6mROzHD9w4tF7giOzbuicvPQB9jjonQf-U3GC5LPWANeCE7qT0yA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBiWz8oTMvICQcvP6mROzHD9w4tF7giOzbuicvPQB9jjonQf-U3GC5LPWANeCE7qT0yA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBiWz8oTMvICQcvP6mROzHD9w4tF7giOzbuicvPQB9jjonQf-U3GC5LPWANeCE7qT0yA&usqp=CAU"
  ]
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "name": "fazer 300",
  "description": "a braba",
  "km": 15000.5,
  "year": 2016,
  "coverImage": "https://storage.googleapis.com/images-homolog-moto.usadosbr.com/img/2017/11/10/img123467-1510347023-v653x354.jpg",
  "price": 22000,
  "id": "913a7574-00b6-43e8-a4b2-165b69e68a90",
  "createdAt": "2022-12-20T20:28:16.225Z",
  "updatedAt": "2022-12-20T20:28:16.225Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                            |
| --------------- | ---------------------------------------------------- |
| 400 Bad Request | You must add at least one image to your motorcycle.  |
| 400 Bad Request | You can't add more than 6 images to your motorcycle. |

---

### 1.2. **Listando Motos**

### `/motorcycles`

### Exemplo de Request:

```
GET /motorcycles
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
    "id": "e8fe7f56-e775-4e92-96ba-bceb1879ef70",
    "name": "Kawazaki Ninja Z750",
    "description": "é muto linda verde, braba!",
    "km": "304.40",
    "year": 2023,
    "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqeEwr352Xh4Vowq-aZd1OfLrrBqiCfbnGyXFFg2i3Sg&s",
    "price": "124000.00",
    "createdAt": "2022-12-15T19:44:13.474Z",
    "updatedAt": "2022-12-15T20:14:21.632Z",
    "motorcycleImages": [
      {
        "id": "8742cfcd-fa25-4fb7-aff4-2d8a70c61ad2",
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQg4KhJrcx_un2_TEnzarVxJVddEkEv8Z589EJrgNW&s"
      }
    ]
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Moto por ID**

### `/motorcycles/:motorcycleId`

### Exemplo de Request:

```
GET /motorcycles/:motorcycleId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro    | Tipo | Descrição                    |
| ------------ | ---- | ---------------------------- |
| motorcycleId | uuid | Identificador único da moto. |

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
  "id": "e8fe7f56-e775-4e92-96ba-bceb1879ef70",
  "name": "Kawazaki Ninja Z750",
  "description": "é muto linda verde, braba!",
  "km": "304.40",
  "year": 2023,
  "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqeEwr352Xh4Vowq-aZd1OfLrrBqiCfbnGyXFFg2i3Sg&s",
  "price": "124000.00",
  "createdAt": "2022-12-15T19:44:13.474Z",
  "updatedAt": "2022-12-15T20:14:21.632Z",
  "motorcycleImages": [
    {
      "id": "8742cfcd-fa25-4fb7-aff4-2d8a70c61ad2",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQg4KhJrcx_un2_TEnzarVxJVddEkEv8Z589EJrgNW&s"
    }
  ]
}
```

### Possíveis Erros:

| Código do Erro  | Descrição             |
| --------------- | --------------------- |
| 400 Bad Request | Invalid id format.    |
| 404 Not Found   | Motorcycle not found. |

---

---

### 1.4. **Atualizando uma moto**

### `/motorcycles/:motorcycleId`

### Exemplo de Request:

```
PATCH /motorcycle/:motorcycleId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro    | Tipo | Descrição                    |
| ------------ | ---- | ---------------------------- |
| motorcycleId | uuid | Identificador único da moto. |

### Corpo da Requisição:

```json
{
  "description": "é muto linda verde, braba!",
  "km": 304.4,
  "year": 2023,
  "price": 124000
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "id": "e8fe7f56-e775-4e92-96ba-bceb1879ef70",
  "name": "Kawazaki Ninja Z750",
  "description": "é muto linda verde, braba!",
  "km": "304.40",
  "year": 2023,
  "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqeEwr352Xh4Vowq-aZd1OfLrrBqiCfbnGyXFFg2i3Sg&s",
  "price": "124000.00",
  "createdAt": "2022-12-15T19:44:13.474Z",
  "updatedAt": "2022-12-15T20:14:21.632Z",
  "motorcycleImages": [
    {
      "id": "8742cfcd-fa25-4fb7-aff4-2d8a70c61ad2",
      "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQg4KhJrcx_un2_TEnzarVxJVddEkEv8Z589EJrgNW&s"
    }
  ]
}
```

---

### Possíveis Erros:

| Código do Erro  | Descrição                                            |
| --------------- | ---------------------------------------------------- |
| 400 Bad Request | Invalid id format.                                   |
| 404 Not Found   | Car not found.                                       |
| 400 Bad Request | You must add at least one image to your motorcycle.  |
| 400 Bad Request | You can't add more than 6 images to your motorcycle. |

---

### 1.5. **Deletar moto por ID**

### `/motorcycles/:motorcycleId`

### Exemplo de Request:

```
DELETE /motorcycles/:motorcycleId
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro    | Tipo | Descrição                    |
| ------------ | ---- | ---------------------------- |
| motorcycleId | uuid | Identificador único da moto. |

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

| Código do Erro  | Descrição             |
| --------------- | --------------------- |
| 400 Bad Request | Invalid id format.    |
| 404 Not Found   | Motorcycle not found. |

---
