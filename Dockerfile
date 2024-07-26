FROM node:18

# Instalação do mssql-tools e dependências
RUN apt-get update && \
    apt-get install -y curl apt-transport-https gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql17 mssql-tools unixodbc-dev && \
    echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY db/init-db.sh /usr/src/app/init-db.sh
RUN chmod +x /usr/src/app/init-db.sh

EXPOSE 3000


CMD ["/bin/bash", "-c", "/usr/src/app/init-db.sh && npm run migration:run && npm run start:dev"]