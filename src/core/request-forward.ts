// 请求转发
// module
// ---省略部分代码（如果你不知道我在写什么，那么你一定么有好好的阅读我前面的文章）---
//     HttpModule.register({
//       timeout: 5000,
//       maxRedirects: 5,
//     }),
    
// httpService是nest内置的一个axios模块 使用前需要去module注入 利用这个我们可以去 “爬”人家的数据了 🐶🐶🐶
//  @Get('httpUser')
//   async getIpAddress() {
//     const value = await this.httpService
//       .get('https://api.gmit.vip/Api/UserInfo?format=json')
//       .toPromise();
//     return { ...value.data };
//   }
