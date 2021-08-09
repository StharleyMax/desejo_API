import { EntityRepository, Repository } from 'typeorm';
import { StateEntity } from '../entities/state.entity';

@EntityRepository(State)
export class State extends Repository<StateEntity> {}
