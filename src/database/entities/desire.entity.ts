import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";


@Entity('tb_desire')
export class Desire{


    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column()
    description: string;

    //colocar chave estrangeira.
    
    @JoinTable()
    @ManyToMany(()=> UsersEntity, (usersEntity: UsersEntity) => usersEntity.id,{cascade: true} )
    users: UsersEntity[];
    
}