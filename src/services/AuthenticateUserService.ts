import User from '../models/User'
import {getRepository} from 'typeorm'
import {compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken'

interface Request {
    email:string;
    password:string
}

interface Response {
    user: User,
    token:string
}

export default class AuthenticateUserService{
    public async execute({email,password}:Request):Promise<Response>{
     const  userRepository = getRepository(User)

     const user = await userRepository.findOne({
         where:{email}
     });
     if(!user){
         throw new Error('Email or Password invalid!')
     }
     const comparePassword = await compare(password, user.password)

     if(!comparePassword){
        throw new Error('Email or Password invalid!')
     }

     const token = sign({}, '0b2b9f06c2707ddcb4e5b64ba07761a5',{
         subject:user.id,
         expiresIn:'1d',

     })
     return {
        user,
        token
        };

    }
}
