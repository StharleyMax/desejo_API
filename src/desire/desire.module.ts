import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desire } from 'src/database/entities/desire.entity';
import { UsersEntity } from 'src/database/entities/users.entity';
import { DesireController } from './desire.controller';
import { DesireService } from './desire.service';

@Module({
  imports:[TypeOrmModule.forFeature([Desire,UsersEntity])],
  controllers:[DesireController],
  providers: [DesireService],
  exports:[DesireService]
})
export class DesireModule {}
