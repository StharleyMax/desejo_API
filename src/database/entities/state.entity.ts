import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";



//tabela com todos os estados.

@Entity('tb_states')
export class StateEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=>UsersEntity, (usersEntity: UsersEntity) => usersEntity.states)
    stateEntity: UsersEntity[];

}
