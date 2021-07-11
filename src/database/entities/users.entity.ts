import { Column, PrimaryGeneratedColumn } from 'typeorm';
import {Entity} from 'typeorm';

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

   @Column('json',{nullable: true})
   state: string[];

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