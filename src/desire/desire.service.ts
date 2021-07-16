import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Desire } from '../database/entities/desire.entity';
import { AddDesireDto } from './dto/desire.dto';


@Injectable()
export class DesireService{

    constructor(

        @InjectRepository(Desire)
        private readonly desire: Repository<Desire>
    ){}

        //Mostrar todos os desejos cradastrados
        desireAll(): Promise<Desire[]>{
            return this.desire.find();
        }


       //Create Desire
    async createDesire(createDesireDto: AddDesireDto){
        const createDesire = this.desire.create({
            ...createDesireDto
        });
        return this.desire.save(createDesire);
    }


    //Delete Desire
    async deleteDesireById(id: number){
        const deleteDesire = await this.desire.findOne(id);

        if(!deleteDesire) {
            throw new NotFoundException('Não foi possível deletar desejo');
        }
        return this.desire.remove(deleteDesire);
    }


}