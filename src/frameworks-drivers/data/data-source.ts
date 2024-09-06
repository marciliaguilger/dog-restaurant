import { DataSource } from 'typeorm';
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: 'sa',
  password: process.env.DB_PASSWORD,
  database: 'DogRestaurant',
  entities: [
    __dirname + '/**/entities/*.entity{.ts,.js}',
  ],
  migrations: [
    __dirname + '/migrations/*.ts',
  ],
  synchronize: false, 
  logging: true,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
});

AppDataSource.initialize()
  .then(() => {
    
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;