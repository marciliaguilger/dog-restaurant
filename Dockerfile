FROM node:alpine

# diretório alvo
RUN mkdir -p /usr/src/dog-api
WORKDIR /usr/src/dog-api

# instalação de dependências
RUN apk update && apk upgrade
RUN apk add python3 g++ make

# copiar o projeto e instalar os pacotes com o npm
COPY . /usr/src/dog-api/
RUN npm install

# abrindo a porta 3000
EXPOSE 3000

# inicializando a API
CMD [ "npm","run", "start:dev" ]