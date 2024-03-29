import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import * as fs from 'fs';
import { join } from 'path';

// 清除日志目录和本地上传的文件oss临时文件

@Injectable()
export class JobService {
  emptyDir = (fileUrl) => {
    const files = fs.readdirSync(fileUrl); //读取该文件夹
    files.forEach(function (file) {
      const stats = fs.statSync(fileUrl + '/' + file);
      if (stats.isDirectory()) {
        this.emptyDir(fileUrl + '/' + file);
      } else {
        fs.unlinkSync(fileUrl + '/' + file);
      }
    });
  };

  // 每天晚上11点执行一次
  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  handleCron() {
    // 删除OSS文件和日志文件
    const OSSRootDir = join(__dirname, '../../../upload-oos');

    // 日志一般是转存 而不是删除哈，注意 这里只是简单的例子而已
    const accesslogDir = join(__dirname, '../../../logs/access');
    const appOutDir = join(__dirname, '../../../logs/app-out');
    const errorsDir = join(__dirname, '../../../logs/errors');

    this.emptyDir(OSSRootDir);

    this.emptyDir(accesslogDir);
    this.emptyDir(appOutDir);
    this.emptyDir(errorsDir);
  }

  // 手动运行
  // @Cron('10 * * * * *', {
  //   name: 'notifications',
  // })
  @Interval('notifications', 5000)
  handleTimeout() {
    // console.log('66666');
  }
}
// 使用：如何运行job
// import { ScheduleModule } from '@nestjs/schedule';
 // 手动运行
//  @Cron('30 * * * * *', {
//     name: 'notifications',
//   })
//   handleTimeout() {
//     console.log('66666');
//   }
  
 // 在某个 controller/service 中进行手动调度测试
//   constructor(
//     private schedulerRegistry: SchedulerRegistry

//   ) {}

// @Get('/job')
// async stopJob(@Param() params: { start: boolean }) {
//     const job = this.schedulerRegistry.getCronJob('notifications');
//     // this.schedulerRegistry 更多详细操作请去看官方文档 https://docs.nestjs.cn/7/techniques?id=%e5%ae%9a%e6%97%b6%e4%bb%bb%e5%8a%a1
//     if (params.start) {
//       job.start();
//       console.log(job.lastDate());
//     } else {
//       job.stop();
//     }
// }