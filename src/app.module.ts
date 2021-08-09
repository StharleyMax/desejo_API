import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesireModule } from './desire/desire.module';
import { UsersModule } from './users/users.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [
    UsersModule,
    DesireModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: '',
      database: 'desejo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
