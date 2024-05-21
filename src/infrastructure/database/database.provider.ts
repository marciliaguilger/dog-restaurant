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
          __dirname + '/customer/entities/*.entity{.ts,.js}',
          __dirname + '/product/entities/*.entity{.ts,.js}',
      ],
        synchronize: false,
        logging: true,
        logger: 'advanced-console',
        options: {
          encrypt: true,
          trustServerCertificate: true,
        }
      });

      console.log(dataSource);
      return dataSource.initialize();
    },
  },
];