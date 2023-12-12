import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    this.userRepository.save(createUserDto);
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
    // return await this.userRepository.find({ where: { id: 1 } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    const qb = await this.userRepository.createQueryBuilder();
    return await qb.update().set(updateUserDto).where({id}).execute();
  }

  async remove(id: number) {
    const qb = await this.userRepository.createQueryBuilder();
    return await qb.delete().where({ id }).execute();
  }
}
