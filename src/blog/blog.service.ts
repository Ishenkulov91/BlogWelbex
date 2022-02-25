import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BlogEntity} from "./blog.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../user/user.entity";
import { CreateBlogDto} from "./dto/createBlog.dto";
import {UpdateBlogDto} from "./dto/updateBlogDto";

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogEntity)
                private readonly blogRepository: Repository<BlogEntity>,
                @InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>,) {
    }

    async createBlog(currentUser: UserEntity, createBlogDto:CreateBlogDto
    ): Promise<BlogEntity> {
        const blog = new BlogEntity()
       const a= await this.blogRepository.create({...createBlogDto})
        Object.assign(blog, createBlogDto)
        blog.author = currentUser
        return await this.blogRepository.save(blog)

    }

    async updateBlog(id: number,currentUserId:number,updateBlogDto:UpdateBlogDto
    ):Promise<BlogEntity>{
        const blog= await this.blogRepository.findOne(id)
        if(!blog){
            throw new HttpException('Blog does not exist',HttpStatus.NOT_FOUND)
        }
        if (currentUserId!==blog.author.id){
            throw new HttpException('You are not author',HttpStatus.FORBIDDEN)
        }
        Object.assign(blog,updateBlogDto)
        return await this.blogRepository.save(blog)
    }

    async deleteBlog(id: number,currentUserId:number) {
        const blog = await this.blogRepository.findOne(id)
        if (!blog) {
            throw new HttpException('Blog does not exist', HttpStatus.NOT_FOUND)
        }
        if (currentUserId!==blog.author.id){
            throw new HttpException('You are not author',HttpStatus.FORBIDDEN)
        }
         await this.blogRepository.delete({ id })
        return('Blog is deleted')

    }
}
