import {BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity({name:'blogs'})
export class BlogEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({ nullable: false })
    message: string

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date

    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    updateAt:Date

    @BeforeUpdate()
    updateTimeStamp(){
        this.updateAt = new Date()
    }

    @ManyToOne(()=>UserEntity,user=> user.blogs,{eager:true})
    author:UserEntity

}