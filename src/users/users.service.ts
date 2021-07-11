import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/database/entities/users.entity';
import { Repository,UpdateResult } from 'typeorm';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';


@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>){}

    usersAll(): Promise<UsersEntity[]> {
    return this.users.find();
    }

    //Buscar usuário por ID
    usersById(id: number): Promise<UsersEntity | undefined>{
      return  this.users.findOne(id);
     }
    
    //Criando usuário
    createUsers(createUsersDto: CreateUsersDto){
     const create = this.users.create(createUsersDto);
     return this.users.save(create);
    }

    //Atualizando usuário
    async updateUsers(id: number, updateUsersDto: UpdateUsersDto){
      const updateUser = await this.users.preload({
        id: +id,
       ...updateUsersDto,
      });
      return this.users.save(updateUser);
    }

    //Deletando usuário
   async  deleteUsersById(id: number){
      const deleteUsers = await this.users.findOne(id);
      if(!deleteUsers){
        throw new NotFoundException('Não foi possível deleter usuário');
      }
      return this.users.remove(deleteUsers);
    }
}
