import { HttpException,HttpStatus } from "@nestjs/common";
// 定义 其实只是继承 HttpException  就好类
export class ForbiddenException extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
  // 使用
//   @Get()
//   async findAll() {
//     throw new ForbiddenException();
//   }
  