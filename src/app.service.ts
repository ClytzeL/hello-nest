import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
// mock数据：new它或者你自己想办法能够实现这个类结构 也是ok的
// const mockCatsService = new AppService();
export const mockAppService = { 
  getHello: () => {
    return '666';
  },
};
