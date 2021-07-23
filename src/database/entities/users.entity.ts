import { Column, JoinColumn, JoinTable, ManyToMany,   ManyToOne,   OneToMany,  PrimaryGeneratedColumn } from 'typeorm';
import {Entity} from 'typeorm';
import { Desire } from './desire.entity';
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

   @JoinColumn()
   @ManyToOne(() => StateEntity, (stateEntity:StateEntity) => stateEntity.stateEntity,{cascade: true})
   states: StateEntity[];
   
   @OneToMany(()=> Desire, ( desire: Desire) => desire.users)
   users: Desire[];

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