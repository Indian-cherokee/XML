import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'lol132kek',
    database: 'stocks_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Только для разработки! В продакшене использовать миграции
}; 