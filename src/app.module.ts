import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProtectedController } from './protected/protected.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'pruebatecnica',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      synchronize: true,
    }),
    TransactionsModule,
    UsersModule,
    AuthModule,
    // ... otros módulos
  ],
  controllers: [ProtectedController],
  // ...
})
export class AppModule { }
