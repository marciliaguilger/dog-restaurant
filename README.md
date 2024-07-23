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
   
### Rodar aplicação no minikube

- ` kubectl apply -f k8s/volumes.yaml -f k8s/mssql.yaml -f k8s/secrets.yaml -f k8s/configmap.yaml -f k8s/dog-restaurant-api.yaml -f k8s/loadbalancer.yaml `

- Expor o tunel para acessar a api:
- ` minikube start --driver=docker`
- ` minikube tunnel --bind-address=192.168.0.108(endereço ip do host) ` 
- Ver os pods via dashboard:
`minikube dashboard`
