import { Module } from "@nestjs/common";
import { TagService } from "./tag.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "src/entities/tag.entity";
import { TagController } from "./tag.controller";
import { User } from "src/entities/user.entity";
@Module({
    imports:[TypeOrmModule.forFeature([Tag,User])],
    controllers:[TagController],
    providers:[TagService],
})
export class TagModule{}