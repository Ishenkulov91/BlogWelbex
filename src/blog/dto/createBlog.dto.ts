import {IsNotEmpty} from "class-validator";


export class CreateBlogDto{

    @IsNotEmpty()
    readonly message:string;
}