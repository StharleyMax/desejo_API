import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      port:3306,
      host:'localhost',
      username: 'root',
      password:'123456',
      database: 'desejo',
      autoLoadEntities: true,
      synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
