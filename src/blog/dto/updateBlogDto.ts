import {IsNotEmpty} from "class-validator";


export class UpdateBlogDto{

    @IsNotEmpty()
    readonly message:string;
}