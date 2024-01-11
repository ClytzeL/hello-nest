// 统一返回体
// 返回体和Dto冲突了怎么办？认证 冲突了怎么办？

// 细心的小伙伴。已经发现了上面的问题了，那就是，如果我没有验证通过或者我的引应用程序发送了错误🙅‍♂️ 出BUG啦，那么你将会得到下面的返回体
// 我们故意不传递 正常的 验证信息
// {
//     "statusCode": 401,
//     "error": "Unauthorized",
//     "msg": "Client Error"
// } 

// 写一个程序bug
// {
//     "statusCode": 500,
//     "msg": "Service Error: Error: xxx"
// }

// 我们期待的是
// {
//     "data": [],
//     "code": 200,
//     "msg": "",
//     "success": true
// }

// 这里的解决方案是把 制造这种异常的制造者干掉！，当然你也可以把你自己干掉，你就修改成和Nest系统内置的保存一样的接口类型就好了


// 首先是我们要处理所有的异常过滤器让他们变成我们所期待的样子
// 我们把所有的异常过滤器都修改成统一的返回数据结构体 

//AllExceptionsFilter
// response.status(status).json({
//       code: status,
//       message: exception.message,
//       data: null,
//       success: false,
//     });
//   }
  
// HttpExceptionFilter
// response.status(status).json({
//   code: status,
//   message: exception.message,
//   data: null,
//   success: false,
// });

// 同时你还需要在返回的时候进行描述，当然你可以不必，因为过滤器把这件事都处理了，有的同学说，这么这里讲
// 劈叉了呢不是拦截器吗怎么就变成过滤器了？原因很简单，因为全局最上层有Filter 错误处理都在fillter 所以要同时
// 处理Filter 和 Interceptor的关系


//如果你代码中有抛Error的地方加上你的特殊标记
// throw new UnauthorizedException('您账户已经在另一处登陆，请重新登陆');
