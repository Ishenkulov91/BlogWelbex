import {ConnectionOptions} from "typeorm";
import {UserEntity} from "./user/user.entity";
import {BlogEntity} from "./blog/blog.entity";

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:'postgres',
    password: '123',
    database: 'welbex',
    entities:[UserEntity,BlogEntity],
    synchronize: true,

}
export default config;
