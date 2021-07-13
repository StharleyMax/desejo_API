import { Column, JoinTable, ManyToMany,  PrimaryGeneratedColumn } from 'typeorm';
import {Entity} from 'typeorm';
import { StateEntity } from './state.entity';

@Entity('tb_users')
export class UsersEntity{

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   phone: string;

   @Column()
   city: string;

   @JoinTable()
   @ManyToMany(() => StateEntity, (stateEntity:StateEntity) => stateEntity.stateEntity,{cascade: true})
   states: StateEntity[];

   @Column()
   zipCode: string;

   @Column()
   user: string;

   @Column()
   password: string;

   @Column({type:'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
   createdAt: Date;

   @Column({nullable: true})
   updatedAt: Date;

   @Column()
   active: boolean;

}