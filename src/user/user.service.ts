import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/createUser.dto";
import {UserEntity} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {sign} from "jsonwebtoken"
import {JWT_SECRET} from "../config";
import {UserResponseInterface} from "./types/userResponse.interface";
import {LoginDto} from "./dto/login.dto";
import {compare} from 'bcrypt'

@Injectable()
export class UserService{
    constructor(@InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>) {}

    async registration(createUserDto:CreateUserDto):Promise<UserEntity>{
        const email = await this.userRepository.findOne({where:{email:createUserDto.email}})
        const username = await this.userRepository.findOne({where:{username:createUserDto.username}})
        if (email || username) {
            throw new HttpException('Пользователь с таким email или username существует', HttpStatus.BAD_REQUEST);
        }
        const newUser= new UserEntity();
        Object.assign(newUser,createUserDto);
        return await this.userRepository.save(newUser)
    }

    generateJwt(user:UserEntity):string{
        return sign({
            id:user.id,
            username:user.username,
            email:user.email
        },JWT_SECRET)
    }
    buildUserResponse(user:UserEntity):UserResponseInterface{
        return{
            user:{
                ...user,
                token:this.generateJwt(user)
            }
        }
    }

    async login(loginUserDto:LoginDto):Promise<UserEntity>{
        const user= await this.userRepository.findOne({email:loginUserDto.email},
            {select: ["id","password","email"]})
        if(!user){
            throw new HttpException('No person with this email',HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const isPassword= await compare(loginUserDto.password,user.password)
        if(!isPassword){
            throw new HttpException('Password is wrong',HttpStatus.UNPROCESSABLE_ENTITY)
        }
        delete user.password;
        return user
    }

    async findByID(id:number):Promise<UserEntity>{
        return await this.userRepository.findOne(id)
    }



}