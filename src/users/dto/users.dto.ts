
export class CreateUsersDto{
    
   readonly id: number;
   readonly name: string;
   readonly phone: string;
   readonly city: string;
   readonly states: string[];
   readonly zipCode: string;
   readonly user: string;
   readonly password: string;
   readonly createdAt: Date;
   readonly active: boolean;
}

export class UpdateUsersDto{

  readonly name: string;
  readonly phone: string;
  readonly city: string;
  readonly states: string[];
  readonly zipCode: string;
}
