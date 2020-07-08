import User from '../models/User'
import {getRepository} from 'typeorm'
import {hash } from 'bcryptjs';
interface Request {
    name:string;
    email:string;
    password:string;
}


export default class CreateUserService{
    public async execute({name,email,password}:Request): Promise<User> {
        const userRepository = getRepository(User);
        const checkSameEmail = await userRepository.findOne({
            where:{email}
        });
        if(checkSameEmail){
            throw new Error('User email already used.')
        };
        const hashedPassword = await hash(password, 8)
        const user = userRepository.create({
            email,
            name,
            password:hashedPassword
        })
       await  userRepository.save(user);
        delete user.password;
       return user;
    }
}
