import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {BlogModule} from "./blog/blog.module";
import {UserModule} from "./user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import ormconfig from "./ormconfig";
import {authMiddleware} from "./user/middlewares/auth.middleware";

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), BlogModule, UserModule]})

export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(authMiddleware).forRoutes({
      path:'*',
      method:RequestMethod.ALL
    })
  }
}
