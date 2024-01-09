import { Controller, Get, Post, Body, Patch, Param, Delete,Headers,UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { ForbiddenException } from '../filter/forbidden.exception';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Headers() headers) {
    console.log(headers);
    // return this.userService.create(createUserDto);
    return {
      code:200,
      result:'请求成功'
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // 我们可以把 这些过滤器 绑定在指定的请求体上比如下面的用法
  @Post()
  // @UseFilters(new HttpExceptionFilter()) // 建议不用new 对内存有影响
  @UseFilters(HttpExceptionFilter()) // nest会为我们自动实例化它
  async create2(@Body() createUserDto: CreateUserDto) {
    throw new ForbiddenException();
  }
}
