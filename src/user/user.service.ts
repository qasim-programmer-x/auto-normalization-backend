import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userModel.build({
        username: createUserDto.username,
        name: createUserDto.name,
        password: hashedPassword,
      });
      await user.save();
      return 'New user added';
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(username: string) {
    console.log('here');
    const user = await this.userModel.findOne({
      where: { username: username },
    });
    return user;
  }
}
