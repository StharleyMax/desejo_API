import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from 'src/database/entities/state.entity';
import { UsersEntity } from 'src/database/entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports:[TypeOrmModule.forFeature([UsersEntity, StateEntity])],
  controllers:[UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
