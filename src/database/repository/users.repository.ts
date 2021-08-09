import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@EntityRepository(Users)
export class Users extends Repository<UsersEntity> {}
