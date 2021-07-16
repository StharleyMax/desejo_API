import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { DesireService } from "./desire.service";
import { AddDesireDto } from "./dto/desire.dto";

@Controller('desire')
export class DesireController{

    constructor(
        private readonly desireService: DesireService
    ){}

    @Get()
    desireAll(){
        return this.desireService.desireAll();
    }

    //Create Desire
    @Post()
    createDesire(@Body() createDeisereDto: AddDesireDto){
        return this.desireService.createDesire(createDeisereDto);
    }


    //Delete Desire
    @Delete(':id')
    deleteDesire(@Param('id') id: number){
        return this.desireService.deleteDesireById(id);
    }
}