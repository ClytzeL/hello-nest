import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FilesController } from './files.controller';

@Module({
  imports: [
    // 当然了你可以使用 config可以sync的方法去配置它
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        // ??
        storage: diskStorage({
          destination: join(__dirname, '../../../', '/upload'),
          filename: (req, file, cb) => {
            const filename = `${randomUUID()}.${file.mimetype.split('/')[1]}`;
            return cb(null, filename);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FilesController],
})
export class FilesModule {}
// 上面说明了如何存储文件那么如何访问文件呢？
// 我们需要使用 express.static 来达到这个功能
// main.ts
// 配置文件访问  文件夹为静态目录，以达到可直接访问下面文件的目的
// const rootDir = join(__dirname, '..');
// app.use('/static', express.static(join(rootDir, '/upload')));
// app.use('/static', express.static(join(rootDir, '/upload'))); // 允许配置多个

