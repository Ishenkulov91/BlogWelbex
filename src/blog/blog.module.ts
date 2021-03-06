import {Module} from "@nestjs/common"
import {BlogController} from "./blog.controller";
import {BlogService} from "./blog.service";
import {BlogEntity} from "./blog.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([BlogEntity,UserEntity])],
    controllers:[BlogController],
    providers:[BlogService]
})

export class BlogModule{}