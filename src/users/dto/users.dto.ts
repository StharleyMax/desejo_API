
export class CreateUsersDto{
    
   readonly id: number;
   readonly name: string;
   readonly phone: string;
   readonly city: string;
   readonly state: string[];
   readonly zipCode: string;
   readonly user: string;
   readonly password: string;
   readonly createdAt: Date;
   readonly active: boolean;
}

export class UpdateUsersDto{

   name: string;
   phone: string;
   city: string;
   state: string[];
   zipCode: string;
}
