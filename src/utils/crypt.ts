// 这个文件在utils下，主要是对用户的密码进行加而后存储到数据库中
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export function encryptPassword(password: string): string {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(
  password: string,
  oldPassword: string,
): boolean {
  return bcrypt.compareSync(password, oldPassword);
}