<h1 align="center">
  Kimoveis API
</h1>

## **Funcionamento**

A url base da API é https://api-kimoveis.herokuapp.com

A API tem um total de 10 endpoints e tem como foco simular o gerenciamento de uma imobiliária. Cerca de 6 endpoints necessitam de token de autenticação e 5 endpoints precisam de acesso de administrador (definido no cadastro). Com esta API, pode-se cadastrar propriedades (imóveis) com categorias e agendar horários para visitar as mesmas. Segue abaixo um exemplo de um imóvel e seus agendamentos, utilizando a rota GET /schedules/properties/:id
<br/>

```json
{
	"id": "ed1950c3-a095-48cf-8009-770837199c98",
	"value": "100000.00",
	"size": 100,
	"sold": false,
	"createdAt": "2022-09-01T19:19:21.601Z",
	"updatedAt": "2022-09-01T19:19:21.601Z",
	"schedules": [
		{
			"id": "898aabca-a1f9-468a-b760-ca0b0f164028",
			"date": "2022-08-24",
			"hour": "17:37:00",
			"createdAt": "2022-09-01T19:19:48.061Z",
			"updatedAt": "2022-09-01T19:19:48.061Z",
			"user": {
				"id": "47f07b89-c0d3-4fa9-adfe-b1dc90c5eb3e",
				"name": "Alexandre",
				"email": "alexandre@mail.com",
				"isAdm": true,
				"isActive": true,
				"createdAt": "2022-09-01T19:17:47.872Z",
				"updatedAt": "2022-09-01T19:17:47.872Z"
			}
		}
	],
	"category": {
		"id": "4d442bb6-1758-48fc-88cb-46e89f34d473",
		"name": "Apartamento"
	},
	"address": {
		"id": "431eadce-a336-4c82-8875-f5cdf2de02db",
		"district": "Pinheiros",
		"zipCode": "23424445",
		"number": "67",
		"city": "Sao Paulo",
		"state": "SP"
	}
}
```

Neste exemplo podemos visualizar as principais informaçoes que englobam todas as rotas desta API. O imóvel possui uma lista de agendamentos(schedules), com os horários e o usuário que marcou, também podemos ver outras informaçoes sobre como endereço, valor, categoria e tamanho.

Veremos, a seguir, como criar e listar usuários, categorias, imóveis e como agendar uma visita a um imóvel. Primeiro serão listadas as rotas que não precisam de autorização, em seguida as rotas que precisam de autorização e, por último, as rotas que precisam de autorização e acesso de administrador.

## Rotas que não precisam de autorização

<h2 align ='center'> Criação de usuário </h2>

`POST /users - FORMATO DA REQUISIÇÃO`

```json
{
	"name": "Alexandre",
	"email": "alexandre@mail.com",
	"password": "123456",
	"isAdm": true
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"name": "Alexandre",
	"email": "alexandre@mail.com",
	"isAdm": true,
	"id": "47f07b89-c0d3-4fa9-adfe-b1dc90c5eb3e",
	"isActive": true,
	"createdAt": "2022-09-01T19:17:47.872Z",
	"updatedAt": "2022-09-01T19:17:47.872Z"
}
```

Ao criar o usuário, isActive recebe o valor "true" por padrão, evidenciando que a conta está ativa.

Não é possível criar usuários com o mesmo email. Se este caso ocorrer, a resposta será:

`POST /users - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "User already exists."
}
```

<h2 align = "center"> Login </h2>

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
	"email": "alexandre@mail.com",
	"password": "123456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTY2MjA2OTA2OCwiZXhwIjoxNjYyMDc2MjY4LCJzdWIiOiI0N2YwN2I4OS1jMGQzLTRmYTktYWRmZS1iMWRjOTBjNWViM2UifQ.UQtIj7ZGvr_zY4BxZqj_sH8B1svzWr7Mh9p2Uvd1HYI"
}
```

A rota de login verifica se a conta está ativa. Caso contrário, a respostá será:

`POST /login - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "Invalid user"
}
```

<h2 align = "center"> Listar categorias </h2>

Podemos acessar todas as categorias utilizando o endpoint:

`GET /categories - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": "4d442bb6-1758-48fc-88cb-46e89f34d473",
		"name": "Apartamento"
	},
	{
		"id": "d60abcb2-6f7c-4cb6-89df-2d75b9b4074b",
		"name": "Casa"
	}
]
```

<h2 align = "center"> Listar imóveis pertencentes a uma categoria específica </h2>

Com a rota a seguir, ao passar o id de uma categoria, é possível listar todas as imóveis que pertencem a esta categoria:

`GET /categories/:id/properties - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "4d442bb6-1758-48fc-88cb-46e89f34d473",
	"name": "Apartamento",
	"properties": [
		{
			"id": "ed1950c3-a095-48cf-8009-770837199c98",
			"value": "100000.00",
			"size": 100,
			"sold": false,
			"createdAt": "2022-09-01T19:19:21.601Z",
			"updatedAt": "2022-09-01T19:19:21.601Z",
			"category": {
				"id": "4d442bb6-1758-48fc-88cb-46e89f34d473",
				"name": "Apartamento"
			},
			"address": {
				"id": "431eadce-a336-4c82-8875-f5cdf2de02db",
				"district": "Pinheiros",
				"zipCode": "23424445",
				"number": "67",
				"city": "Sao Paulo",
				"state": "SP"
			}
		},
		{
			"id": "b1870ed6-6b7e-4cd9-a555-4b8c24f1099d",
			"value": "500000.00",
			"size": 500,
			"sold": false,
			"createdAt": "2022-09-01T22:37:43.049Z",
			"updatedAt": "2022-09-01T22:37:43.049Z",
			"category": {
				"id": "4d442bb6-1758-48fc-88cb-46e89f34d473",
				"name": "Apartamento"
			},
			"address": {
				"id": "876372b8-8094-4269-a974-ead491835260",
				"district": "Aclimação",
				"zipCode": "23424666",
				"number": "55",
				"city": "Sao Paulo",
				"state": "SP"
			}
		}
	]
}
```

## Rotas que necessitam de autorização

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir realizar um agendamento a um imóvel.

<h2 align ='center'> Agendar horário a um imóvel </h2>

`POST /schedules - FORMATO DA REQUISIÇÃO`

```json
{
	"date": "2022/08/24",
	"hour": "17:37",
	"propertyId": "ed1950c3-a095-48cf-8009-770837199c98"
}
```

-   O campo propertyId é obrigatório e deve corresponder ao id de um imóvel criado.
-   Não é possivel um usuário ter 2 visitas ao mesmo imóvel.
-   Não é possível agendar uma visita com data e hora já reservadas.
-   Só é possível agendar uma visita durante o horário comercial (08:00 às 18:00) e em dias úteis (segunda à sexta).

Caso dê tudo certo, a resposta será:

`POST /schedules - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"message": "Schedule done."
}
```

Dando um exemplo de uma das condiçoes mencionadas, caso você tente adicionar um agendamento a um imóvel com data e hora já reservadas, receberá este erro:

`POST /schedules - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "Property already have shedule for this date and hour."
}
```

## Rotas que necessitam de autorização e acesso de administrador

Nestes tipos de rotas será possível criar imóveis, categorias, gerenciar contas de usuários e listar agendamentos de um imóvel. Para ter acesso de administrador é necessário que a conta de usuário possua:

> isAdm: true

<h2 align ='center'> Listar usuários </h2>

`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"id": "19c90200-d715-4980-b8c4-09387aeb228b",
		"name": "Felipe",
		"email": "felipe@mail.com",
		"isAdm": false,
		"isActive": true,
		"createdAt": "2022-08-29T19:52:03.213Z",
		"updatedAt": "2022-08-29T19:52:03.213Z"
	},
	{
		"id": "47f07b89-c0d3-4fa9-adfe-b1dc90c5eb3e",
		"name": "Alexandre",
		"email": "alexandre@mail.com",
		"isAdm": true,
		"isActive": true,
		"createdAt": "2022-09-01T19:17:47.872Z",
		"updatedAt": "2022-09-01T19:17:47.872Z"
	}
]
```

<h2 align ='center'> Deletar usuários </h2>

Esta rota realiza um soft delete da conta do usuário, alterando isActive para false. Na rota deve ser passado o id do usuário a ser deletado.

`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 204`

Caso tente realizar um soft delete em usuário inativo, a resposta será:

`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "Invalid user"
}
```

<h2 align ='center'> Criar categorias </h2>

`POST /categories - FORMATO DA REQUISIÇÃO`

```json
{
	"name": "Apartamento"
}
```

A resposta será assim:

`POST /categories - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"id": "4d442bb6-1758-48fc-88cb-46e89f34d473",
	"name": "Apartamento"
}
```

<h2 align ='center'> Criar imóveis </h2>

`POST /properties - FORMATO DA REQUISIÇÃO`

```json
{
	"size": 500,
	"value": 500000,
	"address": {
		"district": "Aclimação",
		"zipCode": "23424666",
		"number": "55",
		"city": "Sao Paulo",
		"state": "SP"
	},
	"categoryId": "4d442bb6-1758-48fc-88cb-46e89f34d473"
}
```

-   O campo categoryId é obrigatório e deve corresponder ao id de uma categoria criada.
-   Não podem ser cadastrados dois imóveis com o mesmo zipCode.
-   Não pode ser cadastrado imóveis com o campo state maior que 2 dígitos e zipCode maior que 8 dígitos.

Caso dê tudo certo, a resposta será:

`POST /properties - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"value": 500000,
	"size": 500,
	"category": {
		"id": "4d442bb6-1758-48fc-88cb-46e89f34d473",
		"name": "Apartamento"
	},
	"address": {
		"id": "876372b8-8094-4269-a974-ead491835260",
		"district": "Aclimação",
		"zipCode": "23424666",
		"number": "55",
		"city": "Sao Paulo",
		"state": "SP"
	},
	"id": "b1870ed6-6b7e-4cd9-a555-4b8c24f1099d",
	"sold": false,
	"createdAt": "2022-09-01T22:37:43.049Z",
	"updatedAt": "2022-09-01T22:37:43.049Z"
}
```

Caso tente cadastrar um imóvel com zipCode já cadastrado:

`POST /properties - FORMATO DA RESPOSTA - STATUS 400`

```json
{
	"message": "Address already registered."
}
```

<h2 align ='center'> Listar todos os agendamentos de um imóvel</h2>

Na rota, deve-se passar o id do imóvel na qual se quer listar os agendamentos.

Caso dê tudo certo, a resposta será:

`GET /schedules/properties/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "b1870ed6-6b7e-4cd9-a555-4b8c24f1099d",
	"value": "500000.00",
	"size": 500,
	"sold": false,
	"createdAt": "2022-09-01T22:37:43.049Z",
	"updatedAt": "2022-09-01T22:37:43.049Z",
	"schedules": [
		{
			"id": "22a09a8a-4f79-4146-9f38-32720c6bc96b",
			"date": "2022-08-24",
			"hour": "17:37:00",
			"createdAt": "2022-09-02T17:56:15.933Z",
			"updatedAt": "2022-09-02T17:56:15.933Z",
			"user": {
				"id": "19c90200-d715-4980-b8c4-09387aeb228b",
				"name": "Felipe",
				"email": "felipe@mail.com",
				"isAdm": true,
				"isActive": true,
				"createdAt": "2022-08-29T19:52:03.213Z",
				"updatedAt": "2022-08-29T19:52:03.213Z"
			}
		},
		{
			"id": "bea89ef0-d15f-44e6-875a-ad510534a95b",
			"date": "2022-08-24",
			"hour": "17:39:00",
			"createdAt": "2022-09-02T17:58:00.059Z",
			"updatedAt": "2022-09-02T17:58:00.059Z",
			"user": {
				"id": "a99a3afb-f868-4456-92e3-cc8328a9c7b6",
				"name": "Fabio",
				"email": "fabio@mail.com",
				"isAdm": false,
				"isActive": true,
				"createdAt": "2022-09-02T17:57:28.689Z",
				"updatedAt": "2022-09-02T17:57:28.689Z"
			}
		}
	],
	"category": {
		"id": "4d442bb6-1758-48fc-88cb-46e89f34d473",
		"name": "Apartamento"
	},
	"address": {
		"id": "876372b8-8094-4269-a974-ead491835260",
		"district": "Aclimação",
		"zipCode": "23424666",
		"number": "55",
		"city": "Sao Paulo",
		"state": "SP"
	}
}
```

Autoria: Gustavo Henrique Venerando

<!-- /////////////////////////////////////////////////////////////////////////////////// -->
