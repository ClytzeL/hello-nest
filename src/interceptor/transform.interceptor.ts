// import { Injectable,NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common";
// import { Observable,tap } from "rxjs";

// @Injectable()
// export class TransformInterceptor implements NestInterceptor {
// // 有两个参数 1 上下文，实际上上它也是 来自我们之前说的 ArgumentsHost的扩展；
// // 2. CallHandler 如果你不调用那么这个拦截器就没有什么用哈，CallHandler是一个包装执行流的对象，因此推迟了最终的处理程序执行。
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     console.log('Before...');
//     const now = Date.now();
//     return next  // 这里做的工作就哈中间价有点类似
//       .handle()
//       .pipe(
//         tap(() => console.log(`After... ${Date.now() - now}ms`)),
//       );

//   }
// }
// 使用Interceptors
// // nest提供了一个装饰器 方便了我们的使用 
// @UseInterceptors(LoggingInterceptor)
// export class CatsController {}

// // 也可以全局使用
// app.useGlobalInterceptors(new LoggingInterceptor());

// 全局 拦截器 用来收集日志，给req加点东西
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Logger } from '../utils/log4js';
  
  @Injectable()
  export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.getArgByIndex(1).req;
      return next.handle().pipe(
        map((data) => {
          const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      Request original url: ${req.originalUrl}
      Method: ${req.method}
      IP: ${req.ip}
      User: ${JSON.stringify(req.user)}
      Response data:\n ${JSON.stringify(data.body)}
      <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
          Logger.info(logFormat);
          Logger.access(logFormat);
          return data;
        }),
      );
    }
  }
  
  