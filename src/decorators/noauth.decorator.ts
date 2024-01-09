import { SetMetadata } from '@nestjs/common';

// 三种 一种仅 观察jwt，另一种观察 role ，还有一种啥都不需要
export const NotAuth = () => SetMetadata('no-auth', true);


// @SetMetadata('roles', ['admin']) 是nest提供的装饰器可以把这些值 附加到req上，SetMetadata就是一种反射器， 例如
// @Post()
// @SetMetadata('roles', ['admin'])
// async create(@Body() createCatDto: CreateCatDto) {
//   this.catsService.create(createCatDto);
// }
// 但是不推荐，推荐的做法是自定义装饰器
// export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
// 然后去使用
// @Post()
// @Roles(“admin”)
// async create(@Body() createCatDto: CreateCatDto) {
//   this.catsService.create(createCatDto);
// }