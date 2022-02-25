import {Injectable, NestMiddleware} from "@nestjs/common";
import {UserService} from "../user.service";
import {JWT_SECRET} from "../../config";
import {verify} from "jsonwebtoken";
import {ExpressRequestInterface} from "../../types/expressRequest.interface";
import {NextFunction} from "express";

@Injectable()
export class authMiddleware implements NestMiddleware{
    constructor(private readonly userService:UserService) {}
    async use(req:ExpressRequestInterface,res:Response,next:NextFunction){
        if(!req.headers.authorization){
            req.user=null
            next()
            return
        }
        const token = req.headers.authorization.split(' ')[1]
        try{
            const decode= verify(token,JWT_SECRET)
            const user= await this.userService.findByID(decode["id"])
            req.user=user
            next()

        }catch (err){
            req.user=null;
            next()
        }

    }
}