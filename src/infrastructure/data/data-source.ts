import { DataSource } from 'typeorm';
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    __dirname + '/**/entities/*.entity{.ts,.js}',
  ],
  migrations: [
    __dirname + '/migrations/*.ts',
  ],
  synchronize: false, 
  logging: true,
  extra: {
    ssl: true
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