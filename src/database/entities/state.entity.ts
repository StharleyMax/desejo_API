import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./users.entity";



//tabela com todos os estados.

@Entity('tb_states')
export class StateEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>UsersEntity, (usersEntity: UsersEntity) => usersEntity.states)
    stateEntity: UsersEntity;

}
