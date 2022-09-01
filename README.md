<h1 align="center">
  Kimoveis API
</h1>

## **Funcionamento**

A url base da API é https://api-kimoveis.herokuapp.com

A API tem um total de 10 endpoints e tem como foco simular o gerenciamento de uma imobiliária. Cerca de 6 endpoints necessitam de token de autenticação e 5 endpoints precisam de acesso de administrador (definido no cadastro). Com esta API, pode-se cadastrar propriedades (imóveis) com categorias e agendar horários para visitar as mesmas. Segue abaixo um exemplo de uma propriedade e seus agendamentos, utilizando a rota GET /schedules/properties/:id
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
		"district": "Sao Paulo",
		"zipCode": "23424445",
		"number": "67",
		"city": "Sao Paulo",
		"state": "SP"
	}
}
```

Neste exemplo podemos visualizar as principais informaçoes que englobam todas as rotas desta API. A propriedade possui uma lista de agendamentos(schedules), com os horários e o usuário que marcou, também podemos ver outras informaçoes sobre a propriedade como endereço, valor, categoria e tamanho.

Veremos, a seguir, como criar e listar usuários, categorias, propriedades e como agendar uma visita a uma propriedade.

## Rotas que não precisam de autenticação

<h2 align ='center'> Criação de usuário </h2>

`POST /register - FORMATO DA REQUISIÇÃO`

```json
{
	"name": "Alexandre",
	"email": "alexandre@mail.com",
	"password": "123456",
	"isAdm": true
}
```

Caso dê tudo certo, a resposta será assim:

`POST /register - FORMATO DA RESPOSTA - STATUS 201`

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

Não é possível criar usuários com o mesmo email. Se este caso ocorrer, a resposta será:

`POST /register - FORMATO DA RESPOSTA - STATUS 400`

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

`POST /login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTY2MjA2OTA2OCwiZXhwIjoxNjYyMDc2MjY4LCJzdWIiOiI0N2YwN2I4OS1jMGQzLTRmYTktYWRmZS1iMWRjOTBjNWViM2UifQ.UQtIj7ZGvr_zY4BxZqj_sH8B1svzWr7Mh9p2Uvd1HYI"
}
```

<!-- /////////////////////////////////////////////////////////////////////////////////// -->

<h2 align ='center'> Listando usuários </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver os devs já cadastrados na plataforma, na API podemos acessar a lista dessa forma:

`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
[
	{
		"email": "kenzinho@mail.com",
		"password": "$2a$10$YQiiz0ANVwIgpOjYXPxc0O9H2XeX3m8OoY1xk7OGgxTnOJnsZU7FO",
		"name": "Kenzinho",
		"age": 38,
		"id": 1
	},
	{
		"email": "ash@mail.com",
		"password": "$2a$10$Q3M60kc5Rs90T5JeplffJ.kLsxILDPyoiNa3mPJQ2MzwIN0ivESwC",
		"name": "Ash",
		"age": 38,
		"id": 2
	}
]
```

Podemos acessar um usuário específico utilizando o endpoint:

`GET /users/:user_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"email": "kenzinho@mail.com",
	"password": "$2a$10$YQiiz0ANVwIgpOjYXPxc0O9H2XeX3m8OoY1xk7OGgxTnOJnsZU7FO",
	"name": "Kenzinho",
	"age": 38,
	"id": 1
}
```

<h2 align ='center'> Criação de usuário </h2>

`POST /register - FORMATO DA REQUISIÇÃO`

```json
{
	"email": "johndoe@email.com",
	"password": "123456",
	"name": "John Doe",
	"age": 22
}
```

Caso dê tudo certo, a resposta será assim:

`POST /register - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIiwiaWF0IjoxNjU2NTI2NTgxLCJleHAiOjE2NTY1MzAxODEsInN1YiI6IjMifQ.EpeJVJ0omi6Q4ld3GAFTcsQ8DB5gMvj-9CURYBfxel0",
	"user": {
		"email": "johndoe@email.com",
		"name": "John Doe",
		"age": 22,
		"id": 3
	}
}
```

<h2 align = "center"> Login </h2>

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
	"email": "johndoe@email.com",
	"password": "123456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAZW1haWwuY29tIiwiaWF0IjoxNjU2NTI2Njg0LCJleHAiOjE2NTY1MzAyODQsInN1YiI6IjMifQ.CAv0-rS-0hKVsa53B3tes6ys9s7k6YKJowXCoG4Vjfs",
	"user": {
		"email": "johndoe@email.com",
		"name": "John Doe",
		"age": 22,
		"id": 3
	}
}
```

## Rotas que necessitam de autorização

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir manipular e acessar as informaçoes das rotas "pokemons" e "pokeballs".

<h2 align ='center'> Adicionar pokemons </h2>

`POST /pokemons - FORMATO DA REQUISIÇÃO`

```json
{
	"name": "Chicorita",
	"type": "nature",
	"userId": 3
}
```

**O campo userId é obrigatório e deve corresponder ao id do usuário logado**

Caso você tente adicionar um pokemon à rota sem userId correspondente ao usuário logado, receberá este erro:

`POST /pokemons - FORMATO DA RESPOSTA - STATUS 403`

```json
"Private resource creation: request body must have a reference to the owner id"
```

<h2 align ='center'> Acessar pokemons específicos pelo nome</h2>

Ao procurar pelo pokemon "Charmander" na rota "pokemons", podemos ter acesso aos usuários que possuem este pokemon.

`GET/pokemons?name=:name - FORMATO DA RESPOSTA`

```json
[
	{
		"name": "Charmander",
		"type": "fire",
		"userId": 2,
		"id": 1
	},
	{
		"name": "Charmander",
		"type": "fire",
		"userId": 1,
		"id": 3
	}
]
```

Todos os usuários podem acessar os pokemons de outros usuários.

A rota "pokeballs" funciona de forma similar a rota "pokemons".

<h2 align ='center'> Adicionar pokeballs </h2>

`POST /pokemons - FORMATO DA REQUISIÇÃO`

```json
{
	"type": "Greater ball",
	"quantity": 2,
	"userId": 3
}
```

**O campo userId é obrigatório e deve corresponder ao id do usuário logado**

Caso você tente adicionar um pokemon à rota sem userId correspondente ao usuário logado, receberá este erro:

`POST /pokemons - FORMATO DA RESPOSTA - STATUS 403`

```json
"Private resource creation: request body must have a reference to the owner id"
```

<h2 align ='center'> Acessar pokeballs específicas pelo tipo</h2>

Ao procurar pelo pokebola "Greater ball" na rota "pokeballs", podemos ter acesso aos usuários que possuem esta pokeball.

`GET/pokemons?type=:type - FORMATO DA RESPOSTA`

```json
[
	{
		"type": "Greater ball",
		"quantity": 2,
		"userId": 3,
		"id": 1
	}
]
```

Todos os usuários podem acessar as pokeballs de outros usuários.

<h2 align ='center'>Pokemons e Pokeballs pertencentes a um usuário específico</h2>

É possíver acessar quais pokemons e quais pokeballs determinado usuário possui ao utilizar o userId na requisiçao GET:

`GET/pokemons?userId=:userId - FORMATO DA RESPOSTA`

```json
[
	{
		"name": "Charmander",
		"type": "fire",
		"userId": 2,
		"id": 1
	},
	{
		"name": "Bulbasaur",
		"type": "water",
		"userId": 2,
		"id": 2
	}
]
```

`GET/pokeballs?userId=:userId - FORMATO DA RESPOSTA`

```json
[
	{
		"type": "Greater ball",
		"quantity": 2,
		"userId": 3,
		"id": 1
	},
	{
		"type": "Pokeball",
		"quantity": 50,
		"userId": 3,
		"id": 2
	}
]
```

Todos os usuários podem acessar as pokeballs e pokemons de outros usuários.
