import { ArgumentsHost, Catch, ExceptionFilter,HttpException } from '@nestjs/common';
import { Request,Response } from 'express';
// HttpException是Nest内置的一个基础过滤器，使用它我们可以到一些 美观的内容返回
// @Get()
// async findAll() {
// // 构造函数有两个必要的参数来决定响应: 一是返回体，二是Http状态吗
//   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
// }


// // 它将会返回如下内容
// {
//   "statusCode": 403,
//   "message": "Forbidden"
// }

// // ----------------------------------------------------------------------------------------
// // 这样也是可以的error会被返回
// @Get()
// async findAll() {
//   throw new HttpException({
//     status: HttpStatus.FORBIDDEN,
//     error: 'This is a custom message',
//   }, HttpStatus.FORBIDDEN);
// }

// // 它会放回如下内容
// {
//   "status": 403,
//   "error": "This is a custom message"
// }

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
