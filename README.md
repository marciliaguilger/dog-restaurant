# dog-restaurant

Sistema operacional de uma lanchonete.
Fornece serviços de gestão de clientes, produtos e pedidos.

### Rodar containers da aplicação com docker

- `docker-compose up -d --build`: Sobe os containers da aplicação (api, banco de dados e migrations)

### Acesso ao swagger

- `http://localhost:3000/api`: Rota da interface

### Rodar aplicação localmente

- `npm install`: Instala as dependências do projeto
- `npm run start:dev`: Inicia o projeto em localhost

tendo rodado esses comandos, a console deve exibir "Service is running".

## Rodar os testes

To run unit tests, run `npm test`.
   