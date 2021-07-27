
export class CreateUsersDto{
    
   readonly id: number;
   readonly fullName: string;
   readonly phone: string;
   readonly city: string;
   readonly states: any;
   readonly zipCode: string;
   readonly user: string;
   readonly password: string;
   readonly createdAt: Date;
   readonly active: boolean;
}

export class UpdateUsersDto{

  readonly fullName: string;
  readonly phone: string;
  readonly city: string;
  readonly states: string;
  readonly zipCode: string;
}

export class GetAllUsersDto{
  users: CreateUsersDto[];
}
