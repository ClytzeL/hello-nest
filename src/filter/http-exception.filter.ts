
// 很多时候我们 需要把异常过滤掉 返回 客户端 友好的 message
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

//@Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
// HttpException 而不是其他的。在实践中，@Catch() 可以传递多个参数，所以你可以通过逗号分
// 隔来为多个类型的异常设置过滤器。
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
// 实现了这个接口 ExceptionFilter 就要重写 这个方法
  catch(exception: HttpException, host: ArgumentsHost) {
  // ArgumentsHost叫做参数主机，它是一个实用的工具 这里我们使用 它的一个方法来获取上下文ctx
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

// 一般来说 像上面的这个过滤器全局处理异常的，都应该作为全局使用 main
// app.useGlobalFilters(new AllExceptionsFilter());
