// 如何绑定，如何做角色验证Role
// 首先我们定义一个 路由首位
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;  // 目前它永远都是被放行的
  }
}

// 使用它
// @Controller('cats')
// @UseGuards(RolesGuard)
// export class CatsController {}

// 全局使用
// app.useGlobalGuards(new RolesGuard());
// 注意：对于混合应用程序，useGlobalGuards()方法不会为网关和微服务设置守卫。对于“标准”（非混合）微服务应用程序，useGlobalGuards()在全局安装守卫。


// 含有反射器的角色守卫
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     return matchRoles(roles, user.roles);
//   }
// }