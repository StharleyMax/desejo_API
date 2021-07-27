import {GetAllUsersDto, CreateUsersDto} from '../dto/users.dto';
import {UsersEntity} from '../../database/entities/users.entity';

export class AllUsersMap{
    public static toDTO(users: UsersEntity[] ):GetAllUsersDto{
        return{
            users: users.map((user) => UsersMap.toDTO(user))
        }
    }
}
export class UsersMap{
    public static toDTO(users: UsersEntity): CreateUsersDto | undefined {
        if(!users) return undefined;
        return {
            id: users.id,
            fullName: users.fullName,
            phone: users.phone,
            city: users.city,
            states: users.states,
            zipCode: users.zipCode,
            user: users.user,
            password: users.password,
            createdAt: users.createdAt,
            active: users.active,
        }
    }
}