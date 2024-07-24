import { DataSource } from 'typeorm';

const connectWithRetry = async (dataSourceOptions, maxRetries = 5, retryDelay = 5000) => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const dataSource = new DataSource(dataSourceOptions);
      await dataSource.initialize();
      console.log('Database connection established');
      return dataSource;
    } catch (err) {
      retries++;
      console.log(`Database connection failed, retry ${retries}/${maxRetries}...`);
      await new Promise(res => setTimeout(res, retryDelay));
    }
  }

  throw new Error('Failed to connect to the database after retries');
};

export const databaseProviders = [
  {   
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return connectWithRetry({
        type: 'mssql',
        host: process.env.DB_HOST,
        port: 1433,
        username: 'sa',
        password: process.env.DB_PASSWORD,
        database: 'DogRestaurant',
        entities: [
          __dirname + '/**/entities/*.entity{.ts,.js}',
        ],
        synchronize: false,
        logging: false,
        //logger: 'advanced-console',
        options: {
          encrypt: true,
          trustServerCertificate: true,
        }
      });
    },
  },
];