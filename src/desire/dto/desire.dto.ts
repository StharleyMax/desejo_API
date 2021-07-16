

export class GetAllDesireDto{
   
    id: number
    title: string;
    description: string;
    //Users chave estrangeira id
    users: any;
}

export class AddDesireDto{

    title: string;
    description: string;

}