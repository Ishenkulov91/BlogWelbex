import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/createUser.dto";
import {UserResponseInterface} from "./types/userResponse.interface";
import {LoginDto} from "./dto/login.dto";

@Controller()
export class UserController{
    constructor(private readonly userService:UserService) {}

    @Post('users/registration') //Регистрация
    @UsePipes(new ValidationPipe())
    async registration(@Body()createUserDto:CreateUserDto):
        Promise<UserResponseInterface>{
        const user=await this.userService.registration(createUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('users/login') //авторизация
    @UsePipes(new ValidationPipe())
    async login(@Body() loginUserDto:LoginDto
    ):Promise<UserResponseInterface>{
        const user= await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

}