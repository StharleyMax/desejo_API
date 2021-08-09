import { Controller, Get } from '@nestjs/common';

@Controller('state')
export class StateController {
  //constructor(private readonly usersService: UsersService) {}

  @Get()
  list() {
    return 'list State';
  }
}
