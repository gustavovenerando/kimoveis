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
