import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from 'src/database/entities/state.entity';
import { UsersEntity } from 'src/database/entities/users.entity';
import { Repository,UpdateResult } from 'typeorm';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,

    @InjectRepository(StateEntity)
    private readonly statesUF: Repository<StateEntity>

    ){}

    //Mostrar todos os usuários
    usersAll(): Promise<UsersEntity[]> {
    return this.users.find({
      relations:['states']
    });
    }

    //Buscar usuário por ID
    usersById(id: number): Promise<UsersEntity | undefined>{
      return  this.users.findOne(id,{
        relations:['states']
      });
     }
    
    //Criando usuário
   async createUsers(createUsersDto: CreateUsersDto){
      const states = await Promise.all(
        createUsersDto.states.map((name) => this.preLoadStatByName(name)),
     );
     const create = this.users.create({
       ...createUsersDto,
       states
     });
     return this.users.save(create);
    }

    //Atualizando usuário
    async updateUsers(id: number, updateUsersDto: UpdateUsersDto){
      const states = updateUsersDto.states &&
           ( await Promise.all(
          updateUsersDto.states.map((name) => this.preLoadStatByName(name)),
      ));

      const updateUser = await this.users.preload({
       id: +id,
       ...updateUsersDto,
       states,
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

    private async preLoadStatByName(name: string): Promise<StateEntity>{
      const states = await this.statesUF.findOne({name});

      if(states){
        return states;
      }
      return this.statesUF.create({name});
    }

}
