import { EntityRepository, Repository } from "typeorm";
import { Desire } from "../entities/desire.entity";


@EntityRepository(Desire)
export class DesireRepository extends Repository<Desire>{}