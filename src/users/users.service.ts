import {
  HttpException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from 'src/database/entities/state.entity';
import { UsersEntity } from 'src/database/entities/users.entity';
import { Repository, UpdateResult, Like } from 'typeorm';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';

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
  usersByName(byName: string): Promise<UsersEntity | undefined> {
    const usersName = this.users.findOne(byName, {
      where: { name: 'MarcioCarolino' },
    });
    return usersName;
  }

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
  }

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
