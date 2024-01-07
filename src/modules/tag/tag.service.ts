import { Injectable } from "@nestjs/common";
import { Tag } from "src/entities/tag.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class TagService {
  constructor(
  // InjectRepository 这个是不是和我们前面说的 “非类注入器”非常相识 它的底层实现其实就说Inject 
  // 并且注入了指定的参数，对此感兴趣的同学可以去阅读它的源码，我相信你在前面学习了Provider相关知识之后，阅读源码应该不困难
  
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.tagRepository.find({ relations: ['create_by'] });
  }

  async create(tag: Tag) {
    // 依据typeorm 的文档 如果需要保存关系需要使用 ，这样方式来做
    const user = await this.userRepository.findOne(tag.create_by);
    tag.create_by = user;
    return this.tagRepository.save(tag);
  }

  updateById(id, tag: Tag) {
    return this.tagRepository.update(id, tag);
  }

  deleteById(id) {
    return this.tagRepository.delete(id);
  }
}
