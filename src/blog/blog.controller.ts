import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {BlogService} from "./blog.service";
import {BlogEntity} from "./blog.entity";
import {UserEntity} from "../user/user.entity";
import {User} from "../user/decorators/user.decorator";
import {AuthGuard} from "../user/guards/jwt-auth.guard";
import {CreateBlogDto} from "./dto/createBlog.dto";
import {UpdateBlogDto} from "./dto/updateBlogDto";

@Controller('blogs')
export class BlogController{
    constructor(private readonly blogService:BlogService) {}

    @Post('/create') //Зарегестрированный пользователь создает Блог
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async create(@User()currentUser:UserEntity,@Body() createBlogDto:CreateBlogDto
    ):Promise<BlogEntity>{
        return await  this.blogService.createBlog(currentUser,createBlogDto)
    }

    @Put(':id') //Зарегестрированный пользователь моежт менять блог. (тока хозяин блога может сделать это)
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateBlog(
        @Param('id') id:number,
        @User('id')currentUserId:number
        ,@Body()updateBlogDto:UpdateBlogDto
    ):Promise<BlogEntity>{
        return await this.blogService.updateBlog(id,currentUserId,updateBlogDto)
    }

    @Delete(':id') //Зарегестрированный пользователь моежт удалить блог. (тока хозяин блога может сделать это)
    @UseGuards(AuthGuard)
    async deleteActivity(@Param('id') id:number,@User('id')currentUserId:number){
        return await this.blogService.deleteBlog(id,currentUserId)
    }
}