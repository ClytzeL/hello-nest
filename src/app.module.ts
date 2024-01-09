import { Module,DynamicModule,MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { mockAppService } from './app.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import APP_globalConfig from './config/configuration';
import DatabaseConfig from './config/database';
import { LoggerMiddleware } from './middleware/logger.middleware';

// 如果你需要把这个模块 暴露到全局使用可以加 一个装饰器 @Global
// 使一切全局化并不是一个好的解决方案。 全局模块可用于减少必要模板文件的数量。 `imports` 数组仍然是使模块 API 透明的最佳方式。
// @Global()
@Module({
  // 可以注入 其他module 或者provider
  imports: [UserModule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule], 
      useFactory:async (configService:ConfigService)=>{
        return {
          type: "mysql",
          host: configService.get('database.host'),//"localhost",
          port: Number(DatabaseConfig().port),
          username: DatabaseConfig().username,
          password: DatabaseConfig().password,
          database: DatabaseConfig().database,// /*youer DatabeseName*/
          // entities: ["dist/**/*.entity{.ts,.js}"],
          entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件  可以看看我的目录结构，当然你可以自己构建自己的 目录结构
          synchronize: true,
        }
      }
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      load:[APP_globalConfig,DatabaseConfig]
    })
  ],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider ，当然 你也可以把 这个module导出其他地方import 一下这样其他模块中的provider 也是可以使用的
  // exports:[], 
  // 把 controller放在这个里面就好了 通过@Module 装饰器将元数据附加到模块类中 Nest 可以轻松反射（reflect）出哪些控制器（controller）必须被安装
  controllers: [AppController],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  providers: [AppService],// 声明provider
  // // 1.上文是简化写法，下面是展开后的写法。在这里，我们明确地将令牌 `AppService`与类 `AppService` 关联起来。简写表示法只是为了简化最常见的用例，其中令牌用于请求同名类的实例。
  // providers: [ 
  //   { provide: AppService, 
  //     useClass: AppService,
  //   }, ]
  // 2.当provider不为class的时候 比如一个string 这种就叫做 非类提供者，
  // providers: [
  //   {
  //     provide: 'APP_SERVICE',
  //     useValue: AppService,
  //     // useFactory  // 详见下文 这个非常常用
  //     // useExisting // 这里不展开讲了用到在说
  //   },
  // ],
  // 3.mock数据
  // providers: [
  //   {
  //     provide: AppService,
  //     useValue: mockCatsService,
  //     // useFactory  // 详见下文 这个非常常用
  //     // useExisting // 这里不展开讲了用到在说
  //   },
  // ],
  // 4.useFactory动态创建provider
  // providers: [
  //   {
  //      provide: 'CONNECTION',
  //     // 工厂函数可以接受(可选)参数。
  //     // useFactory: (optionsProvider: OptionsProvider) => {
  //     //     const options = optionsProvider.get(); 
  //     //     return new DatabaseConnection(options); 
  //     // },
  //      // 它甚至可以说异步的
  //       useFactory: async () => {
  //        const connection = await createConnection(options);
  //        return connection;
  //      },
  //  // inject 属性接受一个提供者数组，在实例化过程中，Nest 将解析该数组并将其作为参数传递给工厂函数。
  // // Nest 将从 inject 列表中以相同的顺序将实例作为参数传递给工厂函数。
  //      inject:[/*其他的提供者*/]
  //   }
  //  ],
  
})
export class AppModule {}

// 使用logger.middleware的时候和其他Provider保持一致
// 使用 Provider 的方法非常简单 这里不详细说明了，之前文章队Provider由详细的说明

// 也可以使用 直接把它丢给 constructor 处理
// @Module({
//   imports: [CatsModule],
// })
// export class AppModule implements NestModule {
// // configure是基于 NestModule的实现的，我们实现它，然后重写了这个方法并且把拦截器丢了进去

//   configure(consumer: MiddlewareConsumer) {
//     consumer
// //      .apply(LoggerMiddleware)
// //      .forRoutes({ path: 'cats', method: RequestMethod.GET }); // 你需要给那个路由那个方啊，应用这个中间件？ 一般的你也可以传递 指定路由的 Controller 进去。
//         .apply(cors(), helmet(), logger) // 我们也可以传递函数作为中间价 只要它next就好了
//         .exclude( { path: 'cats', method: RequestMethod.GET }, { path: 'cats', method: RequestMethod.POST }, 'cats/(.*)', )
//         .forRoutes(CatsController); 
      
//   }
// }