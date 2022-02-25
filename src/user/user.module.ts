import {Module} from "@nestjs/common"
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {JwtModule} from "@nestjs/jwt";
import {JWT_SECRET} from "../config";
import {AuthGuard} from "./guards/jwt-auth.guard";


@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserController],
    providers:[UserService,AuthGuard],
    exports:[UserService]
})

export class UserModule{}