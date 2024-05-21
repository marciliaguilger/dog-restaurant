import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'localhost',
        port: 1433,
        username: 'sa',
        password: 'SqlServer2019!',
        database: 'DogRestaurant',
        entities: [
            __dirname + '/**/entities/*.entity{.ts,.js}',
        ],
        synchronize: false,
        logging: true,
        logger: 'advanced-console',
        options: {
          encrypt: true,
          trustServerCertificate: true,
        }
      });
      return dataSource.initialize();
    },
  },
];