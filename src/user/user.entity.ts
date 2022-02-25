import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {hash} from 'bcrypt'
import {BlogEntity} from "../blog/blog.entity";

@Entity({name:'users'})
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    email:string

    @Column({select:false})
    password:string

    @BeforeInsert()
    async hashPassword(){
        this.password= await hash(this.password,10)
    }
    @OneToMany(()=>BlogEntity,blog=>blog.author)
    blogs: BlogEntity[]
}