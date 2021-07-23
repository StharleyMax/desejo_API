import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @JoinColumn()
    @ManyToOne(()=> UsersEntity, (usersEntity: UsersEntity) => usersEntity.id,{cascade: true} )
    users: UsersEntity;
    
}