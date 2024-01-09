// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//   // ExecutionContext 也是从 ArgumentsHost 扩展来的
//     const request = context.switchToHttp().getRequest();// 这个能获取到req
//     return validateRequest(request);// 如果返回 false Nest会忽略但前处理，true就放行
//     // 注意 false的时候实际上会触发这个代码
//     throw new UnauthorizedException();
//     // 也就是说你将会得到下面的res
//     {
//       "statusCode": 403,
//       "message": "Forbidden resource"
//     }
//   }
// }



// export interface ExecutionContext extends ArgumentsHost {
//   getClass<T = any>(): Type<T>; // 这个可以获取指定controller 的类型
//   getHandler(): Function; // 这个是获取具体的但前程序 执行方法的引用，换句话说假设你现在 目标是
//   // catController上的crate方法，那么 getHandler 就能获取到 这个方法
// }

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class MyAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //    在这里取metadata中的no-auth，得到的会是一个bool
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());

    const guard = MyAuthGuard.getAuthGuard(noAuth);
    if (noAuth) {
      return true;
    } else {
      return guard.canActivate(context); //    执行所选策略Guard的canActivate方法
    }
  }

  //    根据NoAuth的t/f选择合适的策略Guard
  private static getAuthGuard(noAuth: boolean): IAuthGuard {
    return new (AuthGuard('jwt'))();
  }
}