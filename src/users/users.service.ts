import { Query } from '@nestjs-query/core';
import {
  HttpException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from 'src/database/entities/state.entity';
import { UsersEntity } from 'src/database/entities/users.entity';
import { Users } from 'src/database/repository/users.repository';
import { Repository, UpdateResult, Like } from 'typeorm';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';

interface ISearch{
  type: string;
  data: string;
  order?: string;
  limit?: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,

    @InjectRepository(StateEntity)
    private readonly states: Repository<StateEntity>,
  ) {}

  //Mostrar todos os usuários
  async usersAll(): Promise<UsersEntity[]> {
    return await this.users.find();
  }

  async search(type: string, data: string): Promise<UsersEntity[]> {
    if (type === 'fullName') {
      return await this.users.find({
        where: {
          fullName: Like(`%${data}%`),
        },
        relations: ['states'],
      });
    }
    if (type === 'city') {
      return await this.users.find({
        where: {
          city: Like(`%${data}%`),
        },
        relations: ['states'],
      });
    }
  }

  //Buscar usuário por ID
  usersById(id: number): Promise<UsersEntity | undefined> {
    return this.users.findOne(id, {
      relations: ['states'],
    });
  }

  //Buscar usuário por Nome
  /*searchEncode({type, data}: ISearch){

    /*const q: Query<query> = {
      filter: {
        where: {
          fullName: {like: `%${name}%`},
        }
     },
    };*
      const query = {
        "url": `{"where": {"${type}": {"like": "%${data}%"}}}`
      }
      const uri = encodeURI(query.url);

      return {"url": `localhost:3000/user/${uri}`}
  }
*/
  searchEncode({type, data, order}: ISearch){

    if(order){
      const query = {
        "url": `{"where": {"${type}": {"like": "%${data}%"}}, "order": ["${order}"]}`
      }

      console.log(query.url)
      const uri = encodeURI(query.url);
      return {"url": `localhost:3000/user/${uri}`}
    }

    const query = {
      "url": `{"where": {"${type}": {"like": "%${data}%"}}}`
    }

    console.log(query.url)
    const uri = encodeURI(query.url);
    return {"url": `localhost:3000/user/${uri}`}

  }
/*
  searchEncode({type, data, order, limit}: ISearch){

  }
*/
  //Criando usuário
  async createUsers(
    createUsersDto: CreateUsersDto,
  ): Promise<UsersEntity | undefined> {
    const create = this.users.create({
      fullName: createUsersDto.fullName,
      phone: createUsersDto.phone,
      city: createUsersDto.city,
      states: createUsersDto.states,
      zipCode: createUsersDto.zipCode,
      user: createUsersDto.user,
      password: createUsersDto.password,
      createdAt: new Date(),
      active: true,
    });
    return this.users.save(create);
  };

  //Atualizando usuário
  //async updateUsers(id: number, updateUsersDto: UpdateUsersDto) {}

  //Deletando usuário
  async deleteUsersById(id: number) {

    const deleteUsers = await this.users.findOne(id);
    if (!deleteUsers) {
      throw new NotFoundException('Não foi possível deleter usuário');
    }
    return this.users.remove(deleteUsers);
  }

  private async preLoadStatByName(name: string): Promise<StateEntity> {
    const states = await this.states.findOne({ name });

    if (states) {
      return states;
    }
    return this.states.create({ name });
  }
}
