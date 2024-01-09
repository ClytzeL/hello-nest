import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import APP_globalConfig from './config/configuration';
import { logger } from './middleware/logger.middleware';
import { AllExceptionsFilter } from './filter/any-exception.filter';

async function bootstrap() {
  // 选择 NestExpress
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter()); // 全局统一异常返回体
  app.useGlobalInterceptors(new TransformInterceptor()); // 使用全局拦截器 收集日志
  // 要想在全局使用 你可以在main中直接use
  //日志相关
  app.use(logger); // 所有请求都打印日志  logger ？
  await app.listen(APP_globalConfig().port);
}
bootstrap();
