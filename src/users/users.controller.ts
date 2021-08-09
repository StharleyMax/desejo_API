import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersEntity } from 'src/database/entities/users.entity';
import { Users } from 'src/database/repository/users.repository';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.usersAll();
  }

  @Get('search')
  async search(@Query('type') type: string, @Query('data') data: string) {
    return this.usersService.search(type, data);
  }

  /*
    async usersAll(){
    return this.usersService.usersAll();
    }
    */

  //Buscar usuário por ID
  @Get(':id')
  usersById(@Param('id') id: number) {
    return this.usersService.usersById(id);
  }

  //Criando usuário
  @Post()
  createUsers(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.createUsers(createUsersDto);
  }

  //Atualizando por ID
  /*@Put(':id')
  updateUsers(@Param('id') id: number, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.updateUsers(id, updateUsersDto);
  }
*/
  //Deletando por ID
  @Delete(':id')
  deleteUsersById(@Param('id') id: number) {
    return this.usersService.deleteUsersById(id);
  }
}
