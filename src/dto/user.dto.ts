
// class-validator是一个Dto的库，提供了一些便捷的装饰器 来完成Dto的一些功能 比如@IsNotEmpty
import { IsNotEmpty, IsNumber } from 'class-validator';

// dto (Data Transfer Object) 数据传输对象
export class UserInfoDTO {
  @IsNotEmpty({ message: '用户名不允许为空' })
  username: string;


  @IsNotEmpty({ message: '密码不允许为空' })
  password: string;


  @IsNotEmpty({ message: '更新创建时间必选' })
  @IsNumber()
  update_time: number;


  @IsNotEmpty({ message: '创建时间必选' })
  create_time: number;


  @IsNotEmpty({ message: '状态必填' })
  state: number;
}
